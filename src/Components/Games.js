import React,{useState,useEffect} from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import {AiFillHeart} from "react-icons/ai";
import "./Games.css";
export default function Games({token}){
    const [game, setGame] = useState([]);
    const [name, setname] = useState("");
    const [img, setimg] = useState("");
    const [img1, setimg1] = useState("");
    const [img2, setimg2] = useState("");
    const [img3, setimg3] = useState("");
    const [video, setVideo] = useState('');
    const [like, setLike] = useState([]);
    const [description, setDescription] = useState('');
    const history = useHistory();
    //////////////////////////////////////////////////////
    useEffect(async () => {
      const res = await axios.get("http://localhost:5000/games", {
        headers: { authorization: "Bearer " + token },
      });
      console.log(res.data);
      setGame(res.data);
       if(token){
        const result = await axios.get("http://localhost:5000/Like", {
          headers: { authorization: "Bearer " + token },
        });
        console.log(result.data);
        setLike (result.data);
      }
    }, []);
    //
    const gotGame=(id)=>{
        history.push(`/Game/${id}`)
    }
    const changeName=(e)=>{
      setname(e.target.value)
    }
    const changeImg=(e)=>{
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
    const changeVideo=(e)=>{
      setVideo(e.target.value)
    }
    const changeDescription=(e)=>{
      setDescription(e.target.value)
    }
    //
    const addGame=async()=>{
      const result = await axios.post("http://localhost:5000/games",{name, description, img,img1,img2,img3, video},{
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
//
const addLike= async(id)=>{
 try {
  const result = await axios.post(`http://localhost:5000/Like/${id}`,{},{
    headers: { authorization: "Bearer " + token },
  })
   console.log(result.data);
  setLike(result.data)
 } catch (error) {
   console.log(error);
 }
}
//
const deleteLike=async(id)=>{
 try {
  const result = await axios.delete(`http://localhost:5000/Like/${id}`,{
    headers: { authorization: "Bearer " + token },
  })
  console.log(result.data);
  setLike(result.data)
 } catch (error) {
   console.log(error);
 }
}
    return (
        <div className="Gamediv">
          <input type="text" className='input' placeholder='Name' onChange={(e)=>{changeName(e)}}/>
          <br/>
          <input type="text" className='input' placeholder='Img' onChange={(e)=>{changeImg(e)}}/>
          <br/>
          <input type="text" className='input' placeholder='Img1' onChange={(e)=>{changeImg1(e)}}/>
          <br/>
          <input type="text" className='input' placeholder='Img2' onChange={(e)=>{changeImg2(e)}}/>
          <br/>
          <input type="text" className='input' placeholder='Img3' onChange={(e)=>{changeImg3(e)}}/>
          <br/>
          <input type="text" className='input' placeholder='Description' onChange={(e)=>{changeDescription(e)}}/>
          <br/>
          <input type="text" className='input' placeholder='Video' onChange={(e)=>{changeVideo(e)}}/>
          <br/>
          <button onClick={()=>{addGame()}} className='add'>add game</button>
          <br/>
    
         {game.map((elm,i)=>{
              for(let index = 0; index < like.length ; index++) {
                // console.log(like[index],"liked");
                if(like[index]._id === elm._id){
                  return (
                    <div>
                     <div  className='divOnclick' onClick={() => { gotGame(elm._id);}} key={i}>
                       <p>{elm.name}</p>
                       <img src={elm.img} className='imgGame' alr="no img" />   
                      </div>
                   <br />
                   <AiFillHeart style={{color:"red"}} onClick={()=>{deleteLike(elm._id)}} />
                    <button onClick={()=>{deleteGame(elm._id,i)}}>remove game</button> 
                    </div>        
                  )
                }
               }
               return (
                <div>
                 <div  className='divOnclick' onClick={() => {gotGame(elm._id); }} key={i}>
                   <p>{elm.name}</p>
                   <img src={elm.img} className='imgGame' alr="no img" />   
                  </div>
               <br />
               <AiFillHeart style={{color:"gray"}} onClick={()=>{addLike(elm._id)}} />
               <button onClick={()=>{deleteGame(elm._id,i)}}>remove game</button> 
                </div>        
              )
})}
        </div>
    )
}
