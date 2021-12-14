import React, { useState,useEffect } from "react";
import LogIn from "./Components/LogIn";
import SignUp from "./Components/SignUp";
import NavBar from "./Components/NavBar";
import Games from "./Components/Games";
import Game from "./Components/Game"
import { Route } from "react-router-dom";
import "./App.css"
//////
export default function App() {
  const [token, setToken] = useState("")
  //   const [token, setToken] = useState(() => {
  //   const saved = localStorage.getItem("token");
  //   const initialValue = JSON.parse(saved);
  //   return initialValue  });
  // useEffect(() => {
  //   localStorage.setItem("token", JSON.stringify(token));
  // }, [token]);
  return (
    <div>
      <NavBar token={token} setToken={setToken} />
      <Route
        exact
        path="/Games"
        render={() => {
          return <Games  token={token}/>;
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
    </div>
  );
}
