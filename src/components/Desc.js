import React, { Component } from 'react';
import "../App.css";
import Axios from "axios";
var fs = require('browserify-fs');
var data = require('./fakeDataDesc.json');
const editJsonFile = require("edit-json-file");
// const writeJsonFile = require('write-json-file');

let file = editJsonFile(`${__dirname}/foo.json`);

export class Desc extends Component {
  state={
    currentQuestion:0,
    answers:data[0].answer
  
  }

//   componentDidMount() {
   
//     data.map(i=>{i["answer"]=""})

//     console.log(data)

//  }

  nextQuestion = (e) => {
   
    this.setState({currentQuestion:this.state.currentQuestion+1})
    // console.log(data[1].answer)
    this.setState({answers:data[this.state.currentQuestion+1].answer})
    
  };

  finishQuiz = (e) => {
 
    console.log(data)
    let text = data;
    Axios({
      method: 'post',
      // headers: "access-control-allow-origin:*",
      url: 'http://localhost:3010/filename',
      data: "rockyn619@gmail.com"
    });
    Axios({
      method: 'post',
      // headers: "access-control-allow-origin:*",
      url: 'http://localhost:3010/create',
      data: text
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

