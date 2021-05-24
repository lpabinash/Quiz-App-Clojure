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
      <h1>You have finished the MCQ part, Now you can move to subjective questions</h1>
     
      {/* <button onClick={handleClick}>Sub</button> */}
     <button onClick={handleClick}><Link to="/Desc" >
                        Subjective Questions
                    </Link></button>
    </div>
  );
};

export default EndScreen;
