// import React,{useState} from 'react'

// export default function UploadForm() {
// const [file, setfile] = useState(null)
// const [err, setErr] = useState(null)

// const types =['image/png','image/jpeg']

//     const changeHand=(e)=>{
// // console.log("changed");
// let selected= e.target.files[0];
// // console.log(selected);
// if (selected && types.includes(selected.type)) {
//     setfile(selected)
// }else{
//     setfile(null)
//     setErr('please selected img file (png or jpeg)')
// }
//     }

//     return (
//         <div>
//             <input type="file" onChange={(e)=>changeHand(e)}/>
//         </div>
//     )
// }
