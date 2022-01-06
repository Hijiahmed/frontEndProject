import React,{useState,useEffect} from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import {AiFillHeart} from "react-icons/ai";
import "./Games.css";
//
export default function Games({token,admin}){
    const [game, setGame] = useState([]);
    const [like, setLike] = useState([]);
    const [user, setUser] = useState([])
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
      const result = await axios.get("http://localhost:5000/user",
    {headers: { authorization: "Bearer " + token }})
    try {
      setUser(result.data)
    } catch (error) {
      console.log(error);
    }
    }, []);
    //
    const gotGame=(id)=>{
        history.push(`/Game/${id}`)
    }
//
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
    //
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
//
    return (
        <div className="Gamediv">
 {/* {admin == true ?(
   <div className="Gamediv">
   {game.map((elm,i)=>{
              for(let index = 0; index < like.length ; index++) {
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
):(
  <div className="Gamediv">
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
 

    </div>        
  )
}

)}
</div>
)} */}

{/*  */}
  <div className="Gamediv">
    {/* {user._id} */}
   {game.map((elm,i)=>{
              for(let index = 0; index < like.length ; index++) {
                if(like[index]._id === elm._id){
                  return (
                    <div>
                     <div  className='divOnclick' onClick={() => { gotGame(elm._id);}} key={i}>
                       <p>{elm.name}</p>
                       <img src={elm.img} className='imgGame' alr="no img" />   
                      </div>
                   <br />
                   <AiFillHeart style={{color:"red"}} onClick={()=>{deleteLike(elm._id)}} />
                   {user.admin==true?(
                <button onClick={()=>{deleteGame(elm._id,i)}}>remove game</button> ):("")
               }
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
               {user.admin==true?(
                <button onClick={()=>{deleteGame(elm._id,i)}}>remove game</button> ):("")
               }
                </div>        
               )
})}
</div>
        
        </div>
    )
}
