import React, { useState, useEffect } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import { AiFillHeart } from "react-icons/ai";
import "./Games.css";
//
export default function Games({ token, admin }) {
  const [game, setGame] = useState([]);
  const [like, setLike] = useState([]);
  const [user, setUser] = useState([]);
  const [searchArr, setSearchArr] = useState("");
  const history = useHistory();
  //////////////////////////////////////////////////////
  useEffect(async () => {
    const res = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/games`);
    console.log(res.data);
    setGame(res.data);
    if (token) {
      const result = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/Like`, {
        headers: { authorization: "Bearer " + token },
      });
      console.log(result.data);
      setLike(result.data);
    }
    const result = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/user`, {
      headers: { authorization: "Bearer " + token },
    });
    try {
      setUser(result.data);
    } catch (error) {
      console.log(error);
    }
  }, []);
  //
  const searchInput = (e) => {
    setSearchArr(e.target.value);
  };
  const searchfunction = () => {
    const search1 = game.filter((elm) => {
      if (elm.name.toLowerCase().includes(searchArr.toLocaleLowerCase())) {
        return elm;
      }
    });
    setGame(search1);
  };
  //
  const gotGame = (id) => {
    history.push(`/Game/${id}`);
  };
  //
  const deleteGame = async (id, i) => {
    const result = await axios.delete(`${process.env.REACT_APP_BACKEND_URL}/games/${id}`, {
      headers: { authorization: "Bearer " + token },
    });
    const copyArray = [...game];
    copyArray.splice(i, 1);
    setGame(copyArray);
  };
  //
  const addLike = async (id) => {
    try {
      const result = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/Like/${id}`,
        {},
        {
          //
          headers: { authorization: "Bearer " + token },
        }
      );
      console.log(result.data);
      setLike(result.data);
    } catch (error) {
      console.log(error);
    }
  };
  //
  const deleteLike = async (id) => {
    try {
      const result = await axios.delete(`${process.env.REACT_APP_BACKEND_URL}/Like/${id}`, {
        headers: { authorization: "Bearer " + token },
      });
      console.log(result.data);
      setLike(result.data);
    } catch (error) {
      console.log(error);
    }
  };
  //
  return (
    <>
      <input
        type="text"
        placeholder="search"
        className="inputSearch"
        onChange={(e) => {
          searchInput(e);
        }}
      />
      <button
        className="buttonSearch"
        onClick={() => {
          searchfunction();
        }}
      >
        
????
      </button>
      <div className="Gamediv">
        <div className="Gamediv">
          {game.map((elm, i) => {
            for (let index = 0; index < like.length; index++) {
              if (like[index]._id === elm._id) {
                return (
                  <div className="gameDivCheldren"> 
                  
                      <p>{elm.name}</p>
                      <img src={elm.img} className="imgGamess"    onClick={() => {
                        gotGame(elm._id);
                      }} alr="no img" />
                      <AiFillHeart  className="likeIcon"
                        style={{ color: "red" }}
                        onClick={() => {
                          deleteLike(elm._id);
                        }}
                      />
                      {user.admin == true ? (
                        <button
                          onClick={() => {
                            deleteGame(elm._id, i);
                          }}
                        >
                          remove game
                        </button>
                      ) : (
                        ""
                      )}
                  </div>
                );
              }
            }
            return (
              <div className="gameDivCheldren"> 
                  
                      <p>{elm.name}</p>
                      <img src={elm.img} className="imgGamess"    onClick={() => {
                        gotGame(elm._id);
                      }} alr="no img" />
                      <AiFillHeart className="likeIcon"
                        style={{ color: "gray" }}
                        onClick={() => {
                          addLike(elm._id);
                        }}
                      />
                      {user.admin == true ? (
                        <button
                          onClick={() => {
                            deleteGame(elm._id, i);
                          }}
                        >
                          remove game
                        </button>
                      ) : (
                        ""
                      )}
                  </div>
            );
          })}
        </div>
      </div>
    </>
  );
}
