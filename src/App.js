import Login from "./scenes/login";
import Register from "./scenes/register";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './App.css';
import Homepage from "./scenes/homepage";
import React, { useState } from "react";

function App() {

  const [userInfo, setUserInfo] = useState(null);
  const authUser = async (info) => {
    console.log(info);
    setUserInfo({
      uid: info.id,
      first_name: info.first_name,
      last_name: info.last_name,
      email: info.email,
    });
    sessionStorage.setItem("isAuth", true);
    sessionStorage.setItem("userId", info.id);
  }
  let isAuth = sessionStorage.getItem("isAuth");
  console.log(isAuth);
  return (
    <>
    {/* <Homepage /> */}
    <Router>
      <Routes>
        <Route path="/" element={isAuth ? <Homepage userInfo={userInfo}/> : <Login authUser={authUser}/>} />
        <Route path="/register" element={<Register />} />
        <Route path="/home" element={isAuth ? <Homepage userInfo={userInfo}/> : <Login authUser={authUser}/>} />
      </Routes>
    </Router>

    </>
  );
}

export default App;
