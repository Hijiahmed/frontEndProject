import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import "./Game.css"
import ReactStars from "react-rating-stars-component"
export default function Game({ token }) {
  const [game, setGame] = useState(null);
  const [input, setInput] = useState('')
  const [name, setname] = useState("")
  const [img, setimg] = useState('')
  const [img1, setimg1] = useState("");
  const [img2, setimg2] = useState("");
  const [img3, setimg3] = useState("");
  const [video, setVideo] = useState('');
  const [description, setDescription] = useState('');
  const [rating, setRating] = useState(0)
  const {id} = useParams();
  useEffect(async () => {
    if(token){
      const result = await axios.get(`http://localhost:5000/game/${id}`,{
        headers: { authorization: "Bearer " + token },
      });
    setGame(result.data);
    }
  }, [game]);
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

const updateName = (e)=>{
  setname(e.target.value)
}
const updateInputImg = (e)=>{
setimg(e.target.value)
}
const changeImg1=(e)=>{
  setimg1(e.target.value)
}
const changeImg2=(e)=>{
  setimg2(e.target.value)
}
const changeImg3=(e)=>{
  setimg3(e.target.value)
}
const updatedec = (e)=>{
  setDescription(e.target.value)
}
const updateInputvideo = (e)=>{
  setVideo(e.target.value)
}
const updateGame=async(id)=>{
const result = await axios.put(`http://localhost:5000/game/${id}`, 
  {
    name, description, img,img1,img2,img3, video
  },
  {headers: { authorization: "Bearer " + token },
  }
  )
  setGame(result.data)
}
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
            <img className='imgGame' src={game.img1} alr="no img"  alt=""/>
            <img className='imgGame' src={game.img2} alr="no img"  alt=""/>
            <img className='imgGame' src={game.img3} alr="no img"  alt=""/>
            <iframe src={game.video} className="video1" frameborder="0"></iframe>
            {/* https://www.youtube.com/embed/SYsi5QuOJNE */}
            <br />
            <input className="inputComment" onChange={(e)=>{changeComment(e)}} type="text" />
            <br />
            <button className="buttonComment" onClick={()=>{addComment()}}>add comment</button>
            <div>
            <input className='inputProfile' type="text" placeholder='new name'  onChange={(e)=>{updateName(e)}}/>
              <br />
              <input className='inputProfile' type="text" placeholder='new img '  onChange={(e)=>{updateInputImg(e)}}/>
              <br />
              <input type="text" className='inputProfile' placeholder='Img1' onChange={(e)=>{changeImg1(e)}}/>
          <br/>
          <input type="text" className='inputProfile' placeholder='Img2' onChange={(e)=>{changeImg2(e)}}/>
          <br/>
          <input type="text" className='inputProfile' placeholder='Img3' onChange={(e)=>{changeImg3(e)}}/>
          <br />
              <input className='inputProfile' type="text" placeholder='new dec'  onChange={(e)=>{updatedec(e)}}/>
              <br />
              <input className='inputProfile' type="text" placeholder='new video '  onChange={(e)=>{updateInputvideo(e)}}/>
              <br />
              <button className='buttonUpdate' onClick={()=>{
                updateGame(game._id);
                }}>Update</button> 
                <br />
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




