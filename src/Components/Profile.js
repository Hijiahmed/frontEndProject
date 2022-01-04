import React,{useState,useEffect} from 'react'
import axios from 'axios'
import "./Profile.css"
import { useHistory } from 'react-router-dom'
import { storage } from "../firebase/Config";
export default function Profile({token,setToken}) {
const [user, setUser] = useState('')
const [name, setName] = useState("")
const [img, setImg] = useState(null)
const [url, setUrl] = useState("");
const [progress, setProgress] = useState(0);
const [updateVes, setupdateVes] = useState(false)
const history = useHistory();
////////////////////////////////////////
    useEffect( async() => {
      const result = await axios.get("http://localhost:5000/user",
      {headers: { authorization: "Bearer " + token }})
      try {
        setUser(result.data)
      } catch (error) {
        console.log(error);
      }
    }, [user,url,progress,img])
    const updateName = (e)=>{
      setName(e.target.value)
  }
  //
  const on = () => {
        
    setupdateVes(!updateVes)
}
//
    const updateUserName = () =>{
      const result = axios.put("http://localhost:5000/userName" , 
      {
      name:name ,
      },
      {headers: { authorization: "Bearer " + token },
      }
      )
      setName(result.data)
      }
     const updateImage=()=>{
      const result = axios.put("http://localhost:5000/userImg" , 
      {
      img:img ,
      },
      {headers: { authorization: "Bearer " + token },
      }
      )
      setImg(result.data)
     }
     const removeUser= async(id)=>{
       const result =await axios.delete(`http://localhost:5000/user/${id}`,{headers: { authorization: "Bearer " + token }})
       console.log(result);
      if(result.status===user){
        setUser(result.data)
      }
      if(result.status===200){
        setToken("");
        history.push("/SignUp")
      }
     }
//
     const updateImg = (e)=>{
      if (e.target.files[0]) {
        setImg(e.target.files[0]);
  }
  }
//
const handleUpload = () => {
  const uploadTask = storage.ref(`images/${img.name}`).put(img);
  uploadTask.on(
    "state_changed",
    snapshot => {
      const progress = Math.round(
        (snapshot.bytesTransferred / snapshot.totalBytes) * 100
      );
      setProgress(progress);
    },
    error => {
      console.log(error);
    },
    () => {
      storage
        .ref("images")
        .child(img.name)
        .getDownloadURL()
        .then(url => {
          setUrl(url);
        });
    }
  );
};
//
const Result =  <>
<div className='userup'>
<label htmlFor="">Name</label>
<input type="text" value={name} onChange={(e)=>{updateName(e)}}/>
<label htmlFor="" >image</label>
<input type="file"   onChange={(e)=>{updateImg(e)}}/>
<button onClick={()=>{handleUpload()}}>Upload</button>
<div className="output">
</div>
<button className='buttonUpdate' onClick={()=>{
                updateUserName();
                setupdateVes(false);
                updateImage()
                }}>update</button> 
</div>
  </>
//
    return (
        <div className='mainDivUser'>
          <p>{user.name}</p>
          <img className='imgUser' src={user.img} alt="no img" />
          <button onClick={()=>{handleUpload()}}>Upload</button>
          <br />
          <button onClick={()=>{removeUser(user._id)}}>delete user</button>
              <input className='inputProfile' type="text" placeholder='new name'  onChange={(e)=>{updateName(e)}}/>
              <br />
              <input type="file"   onChange={(e)=>{updateImg(e)}}/>
              <br />
              
                 <button className='buttonUpdate' onClick={on}>Update </button>

                 { updateVes ? Result : "" }
        </div>
    )
}

//
// import React,{useState,useEffect} from 'react'
// import axios from 'axios'
// import "./Profile.css"
// import { useHistory } from 'react-router-dom'
// export default function Profile({token,setToken}) {
// const [user, setUser] = useState('')
// const [name, setName] = useState("")
// const [img, setImg] = useState('')
// const history = useHistory();
// ////////////////////////////////////////
//     useEffect( async() => {
//       const result = await axios.get("http://localhost:5000/user",
//       {headers: { authorization: "Bearer " + token }})
//       try {
//         setUser(result.data)
//       } catch (error) {
//         console.log(error);
//       }
//     }, [user])
//     const updateName = (e)=>{
//       setName(e.target.value)
//   }
//   const updateInputImg = (e)=>{
//     setImg(e.target.value)
// }
//     const updateUserName = () =>{
//       const result = axios.put("http://localhost:5000/userName" , 
//       {
//       name:name ,
//       },
//       {headers: { authorization: "Bearer " + token },
//       }
//       )
//       setName(result.data)
//       }
//      const updateImage=()=>{
//       const result = axios.put("http://localhost:5000/userImg" , 
//       {
//       img:img ,
//       },
//       {headers: { authorization: "Bearer " + token },
//       }
//       )
//       setImg(result.data)
//      }
//      const removeUser= async(id)=>{
//        const result =await axios.delete(`http://localhost:5000/user/${id}`,{headers: { authorization: "Bearer " + token }})
//        console.log(result);
//       if(result.status===user){
//         setUser(result.data)
//       }
//       if(result.status===200){
//         setToken("");
//         history.push("/SignUp")
//       }
//      }
//     return (
//         <div className='mainDivUser'>
//           <p>{user.name}</p>
//           <img className='imgUser' src={user.img} alt="no img" />
//           <br />
//           <button onClick={()=>{removeUser(user._id)}}>delete user</button>
//               <input className='inputProfile' type="text" placeholder='new name'  onChange={(e)=>{updateName(e)}}/>
//               <br />
//               <input className='inputProfile' type="text" placeholder='new img '  onChange={(e)=>{updateInputImg(e)}}/>
//               <br />
//                <button className='buttonUpdate' onClick={()=>{
//                 updateUserName();
//                 updateImage();
//                 }}>update</button> 
//         </div>
//     )
// }