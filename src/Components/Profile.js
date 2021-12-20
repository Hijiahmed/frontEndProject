import React,{useState,useEffect} from 'react'
import axios from 'axios'
export default function Profile({token,setToken}) {
const [user, setUser] = useState('')
    useEffect( async() => {
      const result = await axios.get("http://localhost:5000/user",
      {headers: { authorization: "Bearer " + token }})
      try {
        setUser(result.data)
      } catch (error) {
        console.log(error);
      }
    }, [])
    return (
        <div>
            
        </div>
    )
}
