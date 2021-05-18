import React, { Component } from 'react'
import Tab from 'react-bootstrap/Tab'
import Tabs from 'react-bootstrap/Tabs'
import 'bootstrap/dist/css/bootstrap.min.css';
import Table from 'react-bootstrap/Table'
import Modal from 'react-bootstrap/Modal'
import Axios from 'axios';
const scoreArr=[]
let indscore=0
export class Admin extends Component {
  state={
    key:"home",
    data:[],
    show:false,
    show1:false,
    currentQuestion:0,
    answers:{},
    scores:[],
    score:0,
    email:""
  }


   handleClose = () => this.setState({show:false,show1:false});
   handlepopup = () => this.setState({show:true});
  handlepopup1 = (e) => {
    this.setState({show1:true})
    this.setState({email:e.target.getAttribute('datakey')})
    Axios({
      method: 'post',
      // headers: "access-control-allow-origin:*",
      url: 'http://localhost:3010/answerfilename',
      data: e.target.getAttribute('datakey')
    });
  Axios.get('http://localhost:3010/answerFile')
  .then((response) => {
    console.log(response.data);
    this.setState({answers:response.data})
  });      
}
   handleFileRead = (e) => {
    const content = e.target.result;
    console.log(JSON.parse(content))
    
    Axios({
      method: 'post',
      // headers: "access-control-allow-origin:*",
      url: 'http://localhost:3010/createQuiz',
      data: JSON.parse(content)
    });
    // console.log(Object.entries(content))
    // … do something with the 'content' …
  };
  
   handleFileChosen = (file) => {
    var fileReader = new global.FileReader();
    fileReader.onloadend = this.handleFileRead;
    fileReader.readAsText(file);
  };

  handleEvaluate=()=>{
    Axios.get('http://localhost:3000/quizapp/users')
        .then((response) => {
          console.log(response.data);
          this.setState({data:response.data})
        });
        console.log("done")
  }
  componentDidMount() {
    this.handleEvaluate();   
}
nextQuestion=()=>{
  this.setState({currentQuestion:this.state.currentQuestion+1})
  // this.setState({ scores: [...this.state.scores, this.state.score] })
  scoreArr.push(indscore)
  // console.log(scoreArr[10])
  this.setState({score:0})
}

handleScore=(e)=>{
  indscore=Number(e.target.value)
  // console.log(indscore)
  this.setState({score:Number(e.target.value)})
}
finishQuiz=()=>{
  // this.setState({ scores: [...this.state.scores, this.state.score] })
  scoreArr.push(indscore)
  console.log(scoreArr)
  let sum = scoreArr.reduce(function (accumulator, current) {
    return accumulator + current;
});
console.log(this.state.email)
Axios({
    method: 'PUT',
    // headers: "access-control-allow-origin:*",
    url: 'http://localhost:3000/quizapp/update-user',
    data: {
      "UserID": 0,
      "email": this.state.email,
      "mcqmark": 0,
      "descmark": sum,
      "status": true
    }
  });
  // this.setState({currentQuestion:0});
  this.handleEvaluate();   
  // this.setState({show:false})

}

  render() {
    return (
      <div>
       <Tabs
      id="controlled-tab-example"
      activeKey={this.state.key}
      onSelect={(k) => this.setState({key:k})}
    >
      <Tab eventKey="home" title="Home">
      <h1>Welcome Admin</h1>
      <h4>You can Upload, Evaluate or see the results by navigating the tabs above</h4>
      </Tab>
      <Tab eventKey="upload" title="Upload">
               Click to upload a file.
        
        <input
            type='file'
            id='file'
            className='input-file'
            accept='.json'
            onChange={e => this.handleFileChosen(e.target.files[0])}
          />
      </Tab>
      <Tab eventKey="evaluate" title="Evaluate" onClick={this.handleEvaluate} >
      <Table striped bordered hover variant="dark">
  <thead>
    <tr>
      <th>Email</th>
      <th>MCQ Marks</th>
      <th>Descriptive Marks</th>
      <th>Evaluation Status</th>
    </tr>
  </thead>
  <tbody>
  {this.state.data.map((row) => (
    <tr key={row.UserID}>
      <td>{row.email}</td>
      <td>{row.mcqmark}</td>
      <td>{row.descmark}</td>
      <td>{row.status===true?"evaluated":<button onClick={this.handlepopup1} datakey={row.email}>Evaluate</button>}<Modal show={this.state.show1} onHide={this.handleClose}>
         <Modal.Header closeButton>
         </Modal.Header>
         <Modal.Body>
         
          <h1 style={{fontSize:"5.2vmin"}}>{Object.keys(this.state.answers)[this.state.currentQuestion]}</h1>
         <h1 style={{fontSize:"5.2vmin"}}>Answer:-{Object.values(this.state.answers)[this.state.currentQuestion]}</h1>
         <input onChange={this.handleScore} value={this.state.score} type="text"/>
       {/* {currentQuestion > 0 ? (
        <button onClick={prevQues} id="nextQuestion">
          Previous Question
        </button>
      ) : (
        null
      )} */}
      {this.state.currentQuestion == Object.keys(this.state.answers).length - 1 ? (
        <button onClick={this.finishQuiz} id="nextQuestion">
          Finish Quiz
        </button>
      ) : (
        <button onClick={this.nextQuestion} id="nextQuestion">
          Next Question
        </button>
      )}
        </Modal.Body>
        
         
       </Modal></td>
    </tr>
    ))}
  </tbody>
 
</Table>
      </Tab>
      <Tab eventKey="result" title="Result" onClick={this.handleEvaluate} >
      <Table striped bordered hover variant="dark">
  <thead>
    <tr>
      <th>Email</th>
      <th>Total Marks</th>
      {/* <th>Descriptive Marks</th>
      <th>Evaluation Status</th> */}
    </tr>
  </thead>
  <tbody>
    {console.log(this.state.data)}
  {this.state.data.map((item) => (
    <tr key={item.UserID}>
      <td onClick={this.handlepopup}>{item.email}</td>
      <td>{item.mcqmark+item.descmark}</td>
      <Modal show={this.state.show} onHide={this.handleClose}>
         <Modal.Header closeButton>
         </Modal.Header>
         <Modal.Body>
         <h1 style={{fontSize:"5.2vmin"}}>email:{item.email}</h1>
         <h1 style={{fontSize:"5.2vmin"}}>MCQ Marks:{item.mcqmark}</h1>
         <h1 style={{fontSize:"5.2vmin"}}>Descriptive Marks:{Number(item.descmark)}</h1>
        
      
         </Modal.Body>
        
        
       </Modal>
      {/* <td>{row.descmark}</td> */}
      {/* <td>{row.status===true?"evaluated":<button datakey={row.email}>Evaluate</button>}</td> */}
    </tr>
    ))}
  </tbody>
 
</Table>
      </Tab>
    </Tabs>
      </div>
    )
  }
}

export default Admin
