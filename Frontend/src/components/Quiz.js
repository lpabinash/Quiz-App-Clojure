import "../App.css";
// import { Questions } from "../helpers/Questions";
import { useState,useEffect } from "react";
import Axios from "axios";


import { useContext } from "react";
import { GameStateContext } from "../helpers/Contexts";

var requiredData=" ";
window.onload=function main() {

  Axios.get('http://localhost:3000/quizapp/questions ')
  .then((response) => {
     //console.log(response.data[0]);
    requiredData=response.data[0]
  }); 
} 

// main();


function Quiz() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [optionChosen, setOptionChosen] = useState("");

  const { score, setScore, gameState, setGameState } = useContext(
    GameStateContext
  );
 


  const chooseOption = (option) => {
    setOptionChosen(option);
    // console.log(option)
   
  };

  const nextQuestion = () => {
    if (requiredData[currentQuestion].answer == optionChosen) {
      setScore(score + 1);
    }
    setCurrentQuestion(currentQuestion + 1);
    setOptionChosen("");
    
  };

  const finishQuiz = () => {
    if (requiredData[currentQuestion].answer == optionChosen) {
      setScore(score + 1);
    }
   
      console.log('requiredData:', requiredData);
   console.log(score)
    setGameState("finished");
  };

  return (
    <div className="Quiz">
      <h1>{requiredData[currentQuestion].prompt}</h1>
      <div className="questions">
        <button style={{backgroundColor:optionChosen == "optionA"?"cyan":"white"}}
          onClick={() => {

            chooseOption("optionA");
          }}
        >
          {requiredData[currentQuestion].optionA}
        </button>
        <button style={{backgroundColor:optionChosen=="optionB"?"cyan":"white"}}
          onClick={() => {
            chooseOption("optionB");
          }}
        >
          {requiredData[currentQuestion].optionB}
        </button>
        <button style={{backgroundColor:optionChosen=="optionC"?"cyan":"white"}}
          onClick={() => {
            chooseOption("optionC");
          }}
        >
          {requiredData[currentQuestion].optionC}
        </button>
        <button style={{backgroundColor:optionChosen=="optionD"?"cyan":"white"}}
          onClick={() => {
            chooseOption("optionD");
          }}
        >
          {requiredData[currentQuestion].optionD}
        </button>
      </div>

      {currentQuestion == requiredData.length - 1 ? (
        <button onClick={finishQuiz} id="nextQuestion">
          Finish Quiz
        </button>
      ) : (
        <button onClick={nextQuestion} id="nextQuestion">
          Next Question
        </button>
      )}
    </div>
  );
}

export default Quiz;
