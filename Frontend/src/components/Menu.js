import "../App.css";
import { useContext } from "react";
import Axios from "axios";
import { GameStateContext } from "../helpers/Contexts";

function Menu() {
  const { gameState, setGameState, userName, setUserName, quizData, setQuizData } = useContext(
    GameStateContext
  );
  return (
    <div className="Menu">
      <ul style={{padding:0}}>
    General information:
<li>1. The examination will comprise of both Multiple Choice Questions (MCQs) and Descriptive Questions</li>
<li>2. Each carries One mark. </li>
<li>3. There will be NO NEGATIVE MARKING for the wrong answers.</li>
</ul>
<ul>
Information & Instructions:
<li>1. Every user will take the examination on a Laptop/Desktop/Smart Phone</li>
<li>2. Each user will get questions and answers in different order selected randomly 
from a fixed Question Databank.</li>
<li>3. For Multiple Choice Questions, each question has four options, and the candidate has to click the appropriate 
option.</li>
<li> <h2>WARNING</h2> Please check twice and confirm your selected option in case of MCQs , as you won't be getting<br/> second chance after moving onto the next question.</li>
</ul>
      <button
        onClick={() => {
          setGameState("playing");
          
        }}
      >
        Start Quiz
      </button>
    </div>
  );
}

export default Menu;
