import React from "react";
import "../App.css";
import { useContext } from "react";
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
    console.log(score)
    history.push('/Desc')
  }
  return (
    <div className="EndScreen">
      <h1>Go to Subjective Questions</h1>
     
      <button onClick={handleClick}>Sub</button>
    </div>
  );
};

export default EndScreen;
