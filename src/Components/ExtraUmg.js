import React, { useState, useEffect } from "react";
import axios from "axios";
export default function ExtraUmg({token,admin}) {
    const [game, setGame] = useState([]);
    const [extraImg, setExtraImg] = useState('');
    //
    const changeExtraImg=(e)=>{
        setExtraImg(e.target.value)
      }
    const addExtraImg=async(id)=>{
        const result = await axios.post(`http://localhost:5000/img/${id}`,{extraImg},{
          headers: { authorization: "Bearer " + token },
        })
        const copyArr=[...game]
        copyArr.push(result.data)
        setGame(copyArr)
      }
      //
    return (
        <div>
 <input type="text" className='input' placeholder='extraImg' onChange={(e)=>{changeExtraImg(e)}}/>
<br />
<button onClick={()=>{addExtraImg()}} className='add'> Add ExtraImg</button>
           <img src={game.extraImg} alt="" />
        </div>
    )
}
