import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import "./Game.css"
import ReactStars from "react-rating-stars-component"
export default function Game({ token }) {
  const [game, setGame] = useState(null);
  const [input, setInput] = useState('')
  const [rating, setRating] = useState(0)
  const {id} = useParams();
  useEffect(async () => {
    if(token){
      const result = await axios.get(`http://localhost:5000/game/${id}`,{
        headers: { authorization: "Bearer " + token },
      });
    setGame(result.data);
    }
  }, []);
  const changeComment=(e)=>{
    setInput(e.target.value)
  }
  const addComment=async()=>{
      try {
        const result = await axios.post(
            `http://localhost:5000/comment/${id}`,
            {
                comment:input
            },
            { headers: { authorization: "Bearer " + token } }
          );
          setGame({...game , comment: result.data.comment})
      } catch (err) {
          console.log(err);
      }
  }
const deletecomment =async (comment)=>{
    try {
        const result = await axios.put(`http://localhost:5000/comment/${id}`,
    {comment:comment},
    {headers: { authorization: "Bearer " + token }})
    console.log(result.data);
    setGame({...game , comment: result.data.comment})
    } catch (err) {
        console.log(err.res.data,"error");
    }
}
const ratingChanged = (rate) => {
  setRating(rate)
};
  return (
    <div className="Gamediv">
        {game? <div>     
          <ReactStars 
                count={5}
                onChange={ratingChanged} ratingValue={rating}
                size={24}
                activeColor="#ffd700" />   
                  <p>{game.name}</p>
          <p>{game.description}</p>
            <img className='imgGame' src={game.img} alr="no img"  alt=""/>
            <iframe src={game.video} className="video1" frameborder="0"></iframe>
            <br />
            <input className="inputComment" onChange={(e)=>{changeComment(e)}} type="text" />
            <br />
            <button className="buttonComment" onClick={()=>{addComment()}}>add comment</button>
            <div>
            <h1>{game.comment.map((elm,i)=>{
                return <div key={i}>
                    <p> {elm.userName}</p>
                    <p>{elm.comment}</p>
                    <button onClick={()=>{deletecomment(elm.comment)}}>delet </button>
              </div> 
            })}</h1>
            </div>
            </div>
            :""}

            </div>
            
    
  );
}
