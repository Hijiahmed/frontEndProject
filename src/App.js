import React, { useState } from "react";
import LogIn from "./Components/LogIn";
import SinUp from "./Components/SinUp";
import NavBar from "./Components/NavBar";
import { Route } from "react-router-dom";

//////
export default function App() {
  const [token, setToken] = useState("");

  return (
    <div>
      <NavBar token={token} setToken={setToken} />
      <Route
        exact
        path="/LogIn"
        render={() => {
          return <LogIn setToken={setToken} />;
        }}
      />
      <Route exact path="/SinUp" component={SinUp} />
    </div>
  );
}
