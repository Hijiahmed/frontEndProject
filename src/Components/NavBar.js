import React from "react";
import { Link } from "react-router-dom";
//////////////
export default function NavBar({ token, setToken }) {
  return (
    <div>
      {token ? (
        <ul>
          <li>
            <Link
              onClick={() => {
                setToken("");
              }}
              to="/logIn"
            >
              log out
            </Link>
          </li>
        </ul>
      ) : (
        <ul>
          <li>
            <Link to="/logIn">logIn</Link>
          </li>
          <li>
            <Link to="/SinUp">SinUp</Link>
          </li>
        </ul>
      )}
    </div>
  );
}
