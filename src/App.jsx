import { Route, Routes } from "react-router-dom";

import HomePage from "./pages/index";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import Navbar from "./layout/Navbar";

function App() {
  return (
    <>
    <Navbar/>
    <Routes>
      <Route path="/" element={<HomePage/>}/>
      <Route path="/login" element={<Login/>}/>
      <Route path="/signup" element={<SignUp/>}/>
    </Routes>
    </>
  );
}

export default App;
