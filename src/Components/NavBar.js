import React,{useState,useEffect} from "react";
import { Link } from "react-router-dom";
import axios from 'axios'

import "./NavBar.css"
//////////////
export default function NavBar({ token, setToken }) {
  const [user, setUser] = useState("")
//
  useEffect( async() => {
    const result = await axios.get("http://localhost:5000/user",
    {headers: { authorization: "Bearer " + token }})
    try {
      setUser(result.data)
    } catch (error) {
      console.log(error);
    }
  }, [])
  return (
    <div className="divNavBar">
      {token ? (
        <ul>
          <li>
            <Link to="/">Games</Link>
          </li>
          <li>
            <Link to="/Favorite">Favorite</Link>
          </li>
          <li>
            <Link onClick={() => { setToken("");}}to="/logIn" >   log out </Link>
          </li>
          <li id="profile-img">
            <Link to="/Profile"><img className="imgNavBar" src={user.img}/></Link>
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
