import React,{useState,useEffect} from 'react'
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import "./Games.css"
export default function Games({token}) {
    const [game, setGame] = useState([])
    const [name, setname] = useState("");
    const [img, setimg] = useState("");
    const [video, setVideo] = useState('')
    const [description, setDescription] = useState('')
    const history = useHistory();
    useEffect(async () => {
      const res = await axios.get("http://localhost:5000/games", {
        headers: { authorization: "Bearer " + token },
      });
      console.log(token);
      setGame(res.data);
    }, []);
    const gotGame=(id)=>{
        history.push(`/Game/${id}`)
    }
    const changeName=(e)=>{
      setname(e.target.value)
    }
    const changeImg=(e)=>{
      setimg(e.target.value)
    }
    const changeVideo=(e)=>{
      setVideo(e.target.value)
    }
    const changeDescription=(e)=>{
      setDescription(e.target.value)
    }
    const addGame=async()=>{
      const result = await axios.post("http://localhost:5000/games",{name,img,video,description},{
        headers: { authorization: "Bearer " + token },
      })
      const copyArray=[...game]
      copyArray.push(result.data)
      setGame(copyArray)
    }
  const deleteGame=async(id,i)=>{
const result = await axios.delete(`http://localhost:5000/games/${id}`,{
  headers: { authorization: "Bearer " + token },
})
const copyArray=[...game]
copyArray.splice(i,1)
setGame(copyArray)
    }
    return (
        <div className="Gamediv">
          <input type="text" className='input' placeholder='name' onChange={(e)=>{changeName(e)}}/>
          <br />
          <input type="text" className='input' placeholder='img' onChange={(e)=>{changeImg(e)}}/>
          <br />
          <input type="text" className='input' placeholder='Description' onChange={(e)=>{changeDescription(e)}}/>
          <br />
          <input type="text" className='input' placeholder='Video' onChange={(e)=>{changeVideo(e)}}/>
          <br />
          <button onClick={()=>{addGame()}} className='add'>add game</button>
         {game.map((elm,i)=>{
             return (
               <div>
                <div  className='divOnclick' onClick={() => {
                  gotGame(elm._id);
                }} key={i}>
                  <p>{elm.name}</p>
                  <img src={elm.img} className='imgGame' alr="no img" />   
              </div>
               <button onClick={()=>{deleteGame(elm._id,i)}}>remove game</button> 
               </div>        
             )
         })}
        </div>
    )
}
