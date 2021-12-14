import React,{useState,useEffect} from 'react'
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import "./Games.css"
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
    const gotGame=(id)=>{
        history.push(`/Game/${id}`)
    }
    return (
        <div className="Gamediv">
         {game.map((elm,i)=>{
             return (
                <div  className='divOnclick' onClick={() => {
                  gotGame(elm._id);
                }} key={i}>
                
                  <p>{elm.name}</p>
                  <img src={elm.img} className='imgGame' alr="no img" />              
              </div>
             )
         })}
        </div>
    )
}
