const express = require('express');
const User = require('../models/User');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const fetchuser = require('../middleware/fetchuser');
const JWT_SECRET = 'Gautamisagoodb$oy'; // Use a more secure secret key in production

// ROUTE 1: Create a User using: POST "/api/auth/createuser". No login required
router.post('/createuser', [
  body('name', 'Enter a valid name').isLength({ min: 3 }),
  body('email', 'Enter a valid email').isEmail(),
  body('password', 'Password must be at least 5 characters').isLength({ min: 5 }),
], async (req, res) => {
  let success = false;
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success,errors: errors.array() });
    }

    let user = await User.findOne({ email: req.body.email });
    if (user) {
      return res.status(400).json({ success,error: 'A user with this email already exists' });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    user = await User.create({
      name: req.body.name,
      password: hashedPassword,
      email: req.body.email,
    });

    const payload = {
      user: {
        id: user.id,
      },
    };

    const authtoken = jwt.sign(payload, JWT_SECRET);
    success = true;
    res.json({ success,authtoken });
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Internal Server Error');
  }
});

// ROUTE 2: Authenticate a User using: POST "/api/auth/login". No login required
router.post('/login', [
  body('email', 'Enter a valid email').isEmail(),
  body('password', 'Password cannot be blank').exists(),
], async (req, res) => {
  let success = false;
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success,errors: errors.array() });
    }

    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(400).json({ success,error: 'Invalid credentials' });
    }

    const payload = {
      user: {
        id: user.id,
      },
    };

    const authtoken = jwt.sign(payload, JWT_SECRET);
    success = true;
    res.json({ success,authtoken });
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Internal Server Error');
  }
});

// ROUTE 3: Get logged-in User Details using: POST "/api/auth/getuser". Login required
router.post('/getuser', fetchuser, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    res.json(user);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Internal Server Error');
  }
});

module.exports = router;
