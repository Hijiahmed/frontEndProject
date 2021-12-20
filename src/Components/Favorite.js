import React,{useState,useEffect} from 'react'
import axios from 'axios';
import { useParams } from 'react-router-dom';

export default function Favorite({token}) {
    const [like, setLike] = useState([]);
    const {id}=useParams();
    useEffect(async () => {
    if(token){
        const res = await axios.get(`http://localhost:5000/Like/${id}`, {
          headers: { authorization: "Bearer " + token },
        });
        console.log(res.data);
        setLike (res.data);
      }
      }, []);
      const deleteLike = async(id,i)=>{
        const res = await axios.delete(`http://localhost:5000/Like/${id}`, {
            headers: { authorization: "Bearer " + token },
        });
        const coppyDelete=[...like]
        coppyDelete.splice(i,1)
        setLike(coppyDelete)
      }
    return (
        <div>
             {like.map((elm,i)=>{
             return (
               <div>
                <div   key={i}>
                  <p>{elm.name}</p>
                  <img src={elm.img} alr="no img" />   
              </div>
              <br />
               <button onClick={()=>{deleteLike(elm._id,i)}}>remove like</button> 
               </div>        
             )
         })}
        </div>
    )
}
