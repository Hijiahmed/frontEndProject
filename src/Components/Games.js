import React,{useState,useEffect} from 'react'
import axios from 'axios';
import { useHistory } from 'react-router-dom';
export default function Games({token}) {
    const [game, setGame] = useState([])
    const [name, setname] = useState("");
    const [img, setimg] = useState("");
    const history = useHistory();
    useEffect(async () => {
      const res = await axios.get("http://localhost:5000/games", {
        headers: { authorization: "Bearer " + token },
      });
      console.log(token);
      setGame(res.data);
    }, [token]);
    const gotGame=()=>{
        history.push("/game")
    }
    return (
        <div>
         {game.map((elm,i)=>{
             return (
                <div className="stordiv" key={i}>
                <div
                  onClick={() => {
                    gotGame(elm._id);
                  }}
                >
                  <p>{elm.name}</p>
                  {/* <p>{elm.description}</p> */}
                  <img src={elm.img} alr="no img" />
                  {/* <iframe src={elm.video} frameborder="0"></iframe> */}
                </div>
              
              </div>
             )
         })}
        </div>
    )
}
