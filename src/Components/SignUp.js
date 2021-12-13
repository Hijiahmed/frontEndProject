import React, { useState } from "react";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import axios from "axios";

//
export default function SignUp() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPass] = useState("");
  const history = useHistory();
  const changeName = (e) => {
    setName(e.target.value);
  };
  const changeEmail = (e) => {
    setEmail(e.target.value);
  };
  const changePass = (e) => {
    setPass(e.target.value);
  };
  const addUser = async () => {
    const res = await axios.post("http://localhost:5000/signUp", {
      name,
      email,
      password,
    });
    if (res.status === 201) {
      history.push("/logIn");
    }
  };
  return (
    <div className="loginbox">
      <input
        onChange={(e) => {
          changeName(e);
        }}
        type="text"
        placeholder="name"
      />
      <br />
      <br />

      <input
        onChange={(e) => {
          changeEmail(e);
        }}
        type="text"
        placeholder="email"
      />
      <br />
      <br />

      <input
        onChange={(e) => {
          changePass(e);
        }}
        type="password"
        placeholder="password"
      />
      <br />
      <br />

      <button
        onClick={() => {
          addUser();
        }}
      >
        SignUp
      </button>
    </div>
  );
}
