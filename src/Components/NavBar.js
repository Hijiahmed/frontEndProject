import React from "react";
import { Link } from "react-router-dom";
//////////////
export default function NavBar({ token, setToken }) {
  return (
    <div>
      {token ? (
        <ul>
          <li>
            <Link to="/Games">Games</Link>
          </li>
          <li>
            <Link to="/Favorite">Favorite</Link>
          </li>
          <li>
            <Link onClick={() => { setToken("");}}to="/logIn" >   log out </Link>
          </li>
        </ul>
      ) : (
        <ul>
          <li>
            <Link to="/logIn">logIn</Link>
          </li>
          <li>
            <Link to="/SignUp">SignUp</Link>
          </li>
        </ul>
      )}
    </div>
  );
}
