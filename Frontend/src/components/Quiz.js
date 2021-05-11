import "../App.css";
// import { Questions } from "../helpers/Questions";
import { useState } from "react";


import { useContext } from "react";
import { GameStateContext } from "../helpers/Contexts";
var data = require('./fakeData.json');

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
    if (data[currentQuestion].asnwer == optionChosen) {
      setScore(score + 1);
    }
    setCurrentQuestion(currentQuestion + 1);
    setOptionChosen("");
    
  };

  const finishQuiz = () => {
    if (data[currentQuestion].asnwer == optionChosen) {
      setScore(score + 1);
    }
   
      console.log('data:', data);
   
    setGameState("finished");
  };

  return (
    <div className="Quiz">
      <h1>{data[currentQuestion].prompt}</h1>
      <div className="questions">
        <button style={{backgroundColor:optionChosen=="optionA"?"cyan":"white"}}
          onClick={() => {

            chooseOption("optionA");
          }}
        >
          {data[currentQuestion].optionA}
        </button>
        <button style={{backgroundColor:optionChosen=="optionB"?"cyan":"white"}}
          onClick={() => {
            chooseOption("optionB");
          }}
        >
          {data[currentQuestion].optionB}
        </button>
        <button style={{backgroundColor:optionChosen=="optionC"?"cyan":"white"}}
          onClick={() => {
            chooseOption("optionC");
          }}
        >
          {data[currentQuestion].optionC}
        </button>
        <button style={{backgroundColor:optionChosen=="optionD"?"cyan":"white"}}
          onClick={() => {
            chooseOption("optionD");
          }}
        >
          {data[currentQuestion].optionD}
        </button>
      </div>

      {currentQuestion == data.length - 1 ? (
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
