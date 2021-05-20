import React, { Component } from 'react';
import "../App.css";
import Axios from "axios";
// var fs = require('browserify-fs');
// var receiveddata = require('./fakeData.json');

var data=" ";
function main() {

  Axios.get('http://localhost:3000/quizapp/questions')
  .then((response) => {
    // console.log(response.data[0]);
    data=response.data[1]
  });
}

main();

export class Desc extends Component {
  state={
    currentQuestion:0,
    answers:data[0].answer
  
  }

  nextQuestion = (e) => {
   
    this.setState({currentQuestion:this.state.currentQuestion+1})
    // console.log(data[1].answer)
    this.setState({answers:data[this.state.currentQuestion+1].answer})
    
  };

  finishQuiz = (e) => {
 
    console.log(data)
    let text = data;
    // Axios({
    //   method: 'post',
    //   // headers: "access-control-allow-origin:*",
    //   url: 'http://localhost:3010/filename',
    //   data: localStorage.getItem("email")
    // });
    Axios({
      method: 'post',
      // headers: "access-control-allow-origin:*",
      url: 'http://localhost:3000/quizapp/upload_answer',
      data: {
        "email": localStorage.getItem("email"),
        "file": JSON.stringify(data) 
      }
    });

  };
  handleChange=(e)=>{
    
    data[this.state.currentQuestion].answer=e.target.value
    // console.log(data[this.state.currentQuestion].answer)
this.setState({answers:data[this.state.currentQuestion].answer})
   
    
  }
  prevQues=()=>{
    
    this.setState({currentQuestion:this.state.currentQuestion-1})
    this.setState({answers:data[this.state.currentQuestion-1].answer})
  }
  render() {
    return (
      <div className="Quiz">
        {/* <div style={{height:"100px"}}> */}
      <h1 style={{fontSize:"5.2vmin"}}>{data[this.state.currentQuestion].prompt}</h1>
      {/* </div> */}
      <div className="questions" >
        <textarea type="text"  onChange={this.handleChange} value={this.state.answers} style={{height:"300px",width:"90vw"}}></textarea>
       {/* <textarea></textarea> */}
      </div >
      <div style={{display:"flex"}}>
      {this.state.currentQuestion > 0 ? (
        <button onClick={this.prevQues} id="nextQuestion">
          Previous Question
        </button>
      ) : (
        null
      )}
      {this.state.currentQuestion == data.length - 1 ? (
        <button onClick={this.finishQuiz} id="nextQuestion">
          Finish Quiz
        </button>
      ) : (
        <button onClick={this.nextQuestion} id="nextQuestion">
          Next Question
        </button>
      )}
      </div>
    </div>
    )
  }
}

export default Desc

