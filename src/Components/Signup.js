import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { GoogleLogin } from 'react-google-login';
import { gapi } from 'gapi-script';
import toast from 'react-hot-toast';

const Signup = () => {
    const [credentials, setCredentials] = useState({ name: "", email: "", password: "", cpassword: "" });
    const [isVerified, setVerified] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const navigate = useNavigate();
    const googleClientId = process.env.REACT_APP_GOOGLE_CLIENT_ID || "140083932391-4846kjcp9bhv4ctbfto324cr4d8tnv53.apps.googleusercontent.com";
    console.log(googleClientId);
    useEffect(() => {
        const start = async () => {
            try {
                await gapi.client.init({
                    clientId: googleClientId,
                    scope: 'email',
                });
            } catch (error) {
                console.error('Error initializing Google API:', error);
                toast.error("Error initializing Google API");
            }
        };
        gapi.load('client:auth2', start);
    }, [googleClientId]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const { name, email, password } = credentials;
        try {
            const response = await fetch("https://notehub-8fnl.onrender.com/api/auth/createuser", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ name, email, password })
            });
            const json = await response.json();
            if (json.success) {
                localStorage.setItem('token', json.authtoken);
                navigate("https://notehub-8fnl.onrender.com");
                toast.success("Signup successful");
            } else {
                toast.error("Invalid credentials or an error occurred.");
            }
        } catch (error) {
            console.error("Error during signup:", error);
            toast.error("Invalid credentials or an error occurred.");
        }
    };

    const VerifySuccess = (response) => {
        const profile = response.profileObj;
        if (profile) {
            setCredentials(prevCredentials => ({
                ...prevCredentials,
                email: profile.email
            }));
            setVerified(true);
            toast.success("Google authentication successful");
        } else {
            toast.error("Failed to get profile information from Google");
        }
    };

    const onChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value });
    };

    const toggleShowPassword = () => {
        setShowPassword(prevState => !prevState);
    };

    const toggleShowConfirmPassword = () => {
        setShowConfirmPassword(prevState => !prevState);
    };

    const googleFailure = (error) => {
        console.error('Google authentication error:', error);
        toast.error("Google authentication error: " + error.details);
    };

    return (
        <div className='container my-3'>
            <h2 className="my-3 text-light">Create an account to use NoteHub</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="name" className="form-label text-light">Name</label>
                    <input type="text" className="form-control" id="name" name="name" onChange={onChange} aria-describedby="emailHelp" />
                </div>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label text-light">Get your email from google</label>
                    <input type="email" className="form-control" id="email" name="email" value={credentials.email} readOnly aria-describedby="emailHelp" />
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label text-light">Password</label>
                    <div className="input-group">
                        <input type={showPassword ? "text" : "password"} className="form-control" id="password" name="password" onChange={onChange} minLength={5} required />
                        <button className="btn btn-outline-light" type="button" onClick={toggleShowPassword}>
                            {showPassword ? "Hide" : "Show"}
                        </button>
                    </div>
                </div>
                <div className="mb-3">
                    <label htmlFor="cpassword" className="form-label text-light">Confirm Password</label>
                    <div className="input-group">
                        <input type={showConfirmPassword ? "text" : "password"} className="form-control" id="cpassword" name="cpassword" onChange={onChange} minLength={5} required />
                        <button className="btn btn-outline-light" type="button" onClick={toggleShowConfirmPassword}>
                            {showConfirmPassword ? "Hide" : "Show"}
                        </button>
                    </div>
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
            <div className="mt-3">
                <GoogleLogin
                    clientId={googleClientId}
                    onSuccess={VerifySuccess}
                    onFailure={googleFailure}
                    cookiePolicy={'single_host_origin'}
                    render={(renderProps) => (
                        <button
                            onClick={renderProps.onClick}
                            disabled={renderProps.disabled}
                            className="btn btn-primary"
                        >
                            Fetch Email with Google
                        </button>
                    )}
                />
            </div>
        </div>
    );
};

export default Signup;
