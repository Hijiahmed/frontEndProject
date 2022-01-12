import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import "./Game.css";
import ReactStars from "react-rating-stars-component";
export default function Game({ token,admin }) {
  const [game, setGame] = useState(null);
  const [user, setUser] = useState([]);
  const [input, setInput] = useState("");
  const [name, setname] = useState("");
  const [img, setimg] = useState("");
  const [video, setVideo] = useState("");
  const [description, setDescription] = useState("");
  const [rating, setRating] = useState(0);
  const [extraImg, setExtraImg] = useState('');
  const { id } = useParams();
  useEffect(async () => {
    if (token) {
      const result = await axios.get(`http://localhost:5000/game/${id}`, {
        headers: { authorization: "Bearer " + token },
      });
      setGame(result.data);
    }
    const result = await axios.get("http://localhost:5000/user", {
      headers: { authorization: "Bearer " + token },
    });
    try {
      console.log(result.data,"user hereeee");
      setUser(result.data);
    } catch (error) {
      console.log(error);
    }
  }, []);
  const changeComment = (e) => {
    setInput(e.target.value);
  };
  const addComment = async () => {
    try {
      const result = await axios.post(
        `http://localhost:5000/comment/${id}`,
        {
          comment: input,
          rating:rating
        },
        { headers: { authorization: "Bearer " + token } }
      );
      setGame({ ...game, comment: result.data.comment });
    } catch (err) {
      console.log(err);
    }
  };
  const deletecomment = async (comment) => {
    try {
      const result = await axios.put(
        `http://localhost:5000/comment/${id}`,
        { comment: comment,
          rating:rating
        },
        { headers: { authorization: "Bearer " + token } }
      );
      console.log(result.data);
      setGame({ ...game, comment: result.data.comment });
    } catch (err) {
      console.log(err.res.data, "error");
    }
  };
  const ratingChanged = (e) => {
    setRating(e.target.value);
  };

  const updateName = (e) => {
    setname(e.target.value);
  };
  const updateInputImg = (e) => {
    setimg(e.target.value);
  };
  const updatedec = (e) => {
    setDescription(e.target.value);
  };
  const updateInputvideo = (e) => {
    setVideo(e.target.value);
  };


  const updateGame = async (id) => {
    const result = await axios.put(
      `http://localhost:5000/game/${id}`,
      {
        name,
        description,
        img,
        video,
      },
      { headers: { authorization: "Bearer " + token } }
    );
    setGame(result.data);
  };
//
const changeExtraImg=(e)=>{
  setExtraImg(e.target.value)
}
//
const addExtraImg = async () => {
  try {
    console.log(extraImg,id,"hiji");
    const result = await axios.post(`http://localhost:5000/img/${id}`,{img :extraImg},{
      headers: { authorization: "Bearer " + token },
    })
    setGame({ ...game, img: result.data.extraImg });
    console.log(result.data);
  } catch (error) {
    console.log(error);
  }
};
//
  return (
    <div className="Gamediv">
      {game ? (
        <div>
         
          <p>{game.name}</p>
          <p>{game.description}</p>
          <img className="imgGame" src={game.img} alr="no img" alt="" />
          {game.extraImg.map((element)=>{
  return(
    // console.log(element);
<div>

  <img className="imgGame" src={element} alt="" /> 
</div>

  )

})}
          
          <iframe src={game.video} className="video1" frameborder="0"></iframe>
          {/* https://www.youtube.com/embed/SYsi5QuOJNE */}
          <br />
          <input
            className="inputComment"
            onChange={(e) => {
              changeComment(e);
            }}
            type="text"
          />
          <br />
          <select id="cars" name="cars" onChange={(e)=>{ratingChanged(e)}}>
    <option value="0">Rate:</option>
    <option>1</option>
    <option>2</option>
    <option>3</option>
    <option>4</option>
    <option>5</option>
  </select> <br />
          <button
            className="buttonComment"
            onClick={() => {
              addComment();
            }}
          >
            add comment
          </button>

          <div>
          { user.admin==true? <div><input
 className="inputProfile"
 type="text"
 placeholder="new name"
onChange={(e) => {
  updateName(e);
}}
/>
<br />
<input
className="inputProfile"
type="text"
placeholder="new img "
onChange={(e) => {
  updateInputImg(e);
}}
/>
<br />
<input
className="inputProfile"
type="text"
placeholder="new dec"
onChange={(e) => {
  updatedec(e);
}}
/>
<br />
<input
className="inputProfile"
type="text"
placeholder="new video "
onChange={(e) => {
  updateInputvideo(e);
}}
/>
<br />
<button
className="buttonUpdate"
onClick={() => {
  updateGame(game._id);
}}
>
Update
</button>
<br />



<div>
 <input type="text" className='input' placeholder='extraImg' onChange={(e)=>{changeExtraImg(e)}}/>
<br />
<button onClick={()=>{addExtraImg()}} className='add'> Add ExtraImg</button>
           {/* <img src={game.extraImg} alt="" /> */}
        </div>

</div> 


:""}
            <br />
            <h1>
              {game.comment.map((elm, i) => {
                return (
                  <div key={i}>
                    <p> {elm.userName}</p>
                    <p>{elm.comment}</p>
                    <ReactStars
            count={5}
            onChange={ratingChanged}
            ratingValue={rating}
            size={24}
            value={elm.rating}
            activeColor="#ffd700"
          />
                    {elm.userId == user._id ? ( <button   onClick={() => {  deletecomment(elm.comment); }
                    }
                      >
                        deletee
                      </button>
                    ) : (
                      ""
                    )}
                  </div>
                );
              })}
            </h1>
          </div>
        </div>
      ) : (
        ""
      )}
    </div>
  );
}



