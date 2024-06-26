import About from "./Components/About";
import Home from "./Components/Home";
import Navbar from "./Components/Navbar";
import Login from "./Components/Login";
import Signup from "./Components/Signup";
import NoteState from './Context/NoteState';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <>
    <NoteState>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route exact path="/h" element={<Home />}></Route>
          <Route exact path="/about" element={<About />}></Route>
          <Route exact path="/login" element={<Login />}></Route>
          <Route exact path="/signup" element={<Signup />}></Route>
        </Routes>
      </BrowserRouter>
      </NoteState>
      <Toaster position="top-center"/> 
    </>
  );
}

export default App;
