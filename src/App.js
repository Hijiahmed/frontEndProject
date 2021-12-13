import React, { useState } from "react";
import LogIn from "./Components/LogIn";
import SignUp from "./Components/SignUp";
import NavBar from "./Components/NavBar";
import Games from "./Components/Games";
import { Route } from "react-router-dom";
//////
export default function App() {
  const [token, setToken] = useState("");
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
        path="/LogIn"
        render={() => {
          return <LogIn setToken={setToken} />;
        }}
      />
      <Route exact path="/SignUp" component={SignUp} />
    </div>
  );
}
