import React from "react";
import "../App.css";
import { useContext } from "react";
import Axios from "axios"
import { GameStateContext } from "../helpers/Contexts";
import { Link } from "react-router-dom";
import history from './../history';
// import { Questions } from "../helpers/Questions";

const EndScreen = () => {
  const { score, setScore, setGameState, userName } = useContext(
    GameStateContext
  );

  // const restartQuiz = () => {
  //   setScore(0);
  //   setGameState("menu");
  // };
 const handleClick=()=>{
  const article = {
    
    "email": localStorage.getItem("email"),
    "mcqmark": score,
    "descmark": 0,
    "status": true
  };
Axios.post('http://localhost:3000/quizapp/add-user', article)
    .then(console.log("done"));
    history.push('/Desc')
  }
  return (
    <div className="EndScreen">
      <h1>Go to Subjective Questions</h1>
     
      {/* <button onClick={handleClick}>Sub</button> */}
     <button onClick={handleClick}><Link to="/Desc" >
                        Sub
                    </Link></button>
    </div>
  );
};

export default EndScreen;
