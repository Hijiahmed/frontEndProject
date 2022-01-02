import React, { useState,useEffect } from "react";
import LogIn from "./Components/LogIn";
import SignUp from "./Components/SignUp";
import NavBar from "./Components/NavBar";
import Games from "./Components/Games";
import Game from "./Components/Game"
import Profile from "./Components/Profile";
import Favorite from "./Components/Favorite"
import { Route } from "react-router-dom";
// import UploadForm from "./firebase/UploadForm";
//////
export default function App() {
  const [token, setToken] = useState(() => {
    const saved = localStorage.getItem("token");
    const defultValue = JSON.parse(saved);
    return defultValue ;
  });
  useEffect(() => {
    localStorage.setItem("token", JSON.stringify(token));
  }, []);
///////////////////////////////
  return (
    <div>
      <NavBar  token={token} setToken={setToken} />
      <Route
        exact
        path="/"
        render={() => {
          return <Games  token={token}/>;
        }}
      />
       <Route
        exact
        path="/Favorite"
        render={() => {
          return <Favorite  token={token}/>;
        }}
      />
        <Route
        exact
        path="/Profile"
        render={() => {
          return <Profile  token={token} setToken={setToken}/>;
        }}
      />
         <Route
        exact
        path="/Game/:id"
        render={() => {
          return <Game  token={token}/>;
        }}
      />
      <Route
        exact
        path="/LogIn"
        render={() => {
          return <LogIn setToken={setToken} />;
        }}
      />
      <Route exact path="/SignUp" component={SignUp} />
      {/* <UploadForm/> */}
    </div>
  );
}
