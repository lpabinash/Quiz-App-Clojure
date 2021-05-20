import React, { Component } from 'react'
import Tab from 'react-bootstrap/Tab'
import Tabs from 'react-bootstrap/Tabs'
import 'bootstrap/dist/css/bootstrap.min.css';
import Table from 'react-bootstrap/Table'
import Modal from 'react-bootstrap/Modal'
import Nav from 'react-bootstrap/Nav'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Axios from 'axios';
import "./Admin.css";
const scoreArr=[]
let indscore=0
let useremail=""
let usermcq=0;
let userdesc=0
let answers=[]
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
    email:"",
    // useremail:"",
    // usermcq:0,
    // userdesc:0
  }


   handleClose = () => this.setState({show:false,show1:false});
   handlepopup = (e) => {
     useremail=e.target.getAttribute("datakeyemail")
     usermcq=e.target.getAttribute("datakeymcq")
     userdesc=e.target.getAttribute("datakeydesc")
     this.setState({show:true})
    };
  handlepopup1 = (e) => {
    this.setState({show1:true})
    this.setState({email:e.target.getAttribute('datakey')})
  
  Axios.get('http://localhost:3000/quizapp/answers/'+`${e.target.getAttribute("datakey")}`)
  .then((response) => {
    const array = response.data
    
    const newObject = Object.assign({}, ...array.map(item => ({ [item.prompt]: item.answer })));
    
    this.setState({answers:newObject})
  });      
  console.log(answers)
}
   handleFileRead = (e) => {
    const content = e.target.result;
    console.log(JSON.parse(content))
    console.log(content)
    
    Axios({
      method: 'post',
      // headers: "access-control-allow-origin:*",
      url: 'http://localhost:3000/quizapp/file',
      data: {
        "file": content
      }

    });

    window.alert("File Uploaded")

   //console.log(Object.entries(content))
    //… do something with the 'content' …

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

handlelogout=()=>{
  window.alert("Logging out");
  window.location.href = 'http://localhost:3001/';
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
      
      "email": this.state.email,  
      "descmark": sum
    }
  });
  // this.setState({currentQuestion:0});
  this.handleEvaluate();  
  this.handleClose(); 
  // this.setState({show:false})
this.handlelogout();
}

handledata=(e)=>{
  
  useremail=e.target.getAttribute("datakeyemail")
  usermcq=e.target.getAttribute("datakeymcq")
  userdesc=e.target.getAttribute("datakeydesc")
  this.setState({show:true})
  // console.log(e.target.getAttribute("datakeyemail"))
}

  render() {
    return (
      <div className="main">
        
    <Tab.Container id="left-tabs-example" defaultActiveKey="first">
  <Row>
  <div className="sidebar">
    <Col sm={3}>
      <Nav variant="pills" className="flex-column">
        <Nav.Item style={{marginBottom:"30px",marginTop:"20px"}}>
          <Nav.Link eventKey="first">Home</Nav.Link>
        </Nav.Item>
        <Nav.Item style={{marginBottom:"30px"}}>
          <Nav.Link eventKey="second">Upload</Nav.Link>
        </Nav.Item>
        <Nav.Item style={{marginBottom:"30px"}}>
          <Nav.Link onClick={this.handleEvaluate} eventKey="third">Evaluate</Nav.Link>
        </Nav.Item >
        <Nav.Item style={{marginBottom:"30px"}}>
          <Nav.Link onClick={this.handleEvaluate} eventKey="fourth">Result</Nav.Link>
        </Nav.Item>
        <Nav.Item style={{marginBottom:"30px"}}>
          <Nav.Link onClick={this.handlelogout} eventKey="fifth">Logout</Nav.Link>
        </Nav.Item>

      </Nav>
    </Col>
    </div>
    <div className="content">
    <Col sm={9}>
      <Tab.Content>
        <Tab.Pane eventKey="first">
         
      <h1>Welcome Admin</h1>
      <h4>You can Upload, Evaluate or see the results by navigating the tabs above</h4>
        </Tab.Pane>
        <Tab.Pane eventKey="second">
          <div className="upload">
       Click to upload a file.
        
        <input
            type='file'
            id='file'
            className='input-file'
            accept='.json'
            onChange={e => this.handleFileChosen(e.target.files[0])}
          />
          </div>
        </Tab.Pane>
        <Tab.Pane eventKey="third">
        <Table style={{width:"78vw",overflowX:"hidden",borderRadius:"20px",height:"94vh",marginTop:"15px"}} striped bordered hover variant="dark">
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
      <td style={{fontSize:"20px"}}>{row.email}</td>
      <td  style={{fontSize:"20px"}}>{row.mcqmark}</td>
      <td style={{fontSize:"20px"}}>{row.descmark}</td>
      <td style={{fontSize:"20px"}}>{row.status===true?"evaluated":<button onClick={this.handlepopup1} style={{width:"250px"}} datakey={row.email}>Evaluate</button>}<Modal show={this.state.show1} onHide={this.handleClose}>
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
      {this.state.currentQuestion ==Object.keys(this.state.answers).length - 1 ? (
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
        </Tab.Pane>
        <Tab.Pane eventKey="fourth">
        <Table style={{width:"78vw",borderRadius:"20px",height:"94vh",marginTop:"15px",}} striped bordered hover variant="dark">
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
      <td  style={{fontSize:"20px"}} onClick={this.handlepopup} datakeyemail={item.email} datakeymcq={item.mcqmark} datakeydesc={item.descmark}>{item.email}</td>
      <td  style={{fontSize:"20px"}} onClick={this.handledata} datakeyemail={item.email} datakeymcq={item.mcqmark} datakeydesc={item.descmark}>{item.mcqmark+item.descmark}</td>
      <Modal show={this.state.show} onHide={this.handleClose}>
         <Modal.Header closeButton>
         </Modal.Header>
         <Modal.Body>
           <Table>
         <thead><tr>
            <th>Email</th>
            <th>MCQ Marks</th>
            <th>Descriptive Marks</th>
         </tr></thead>
         <tbody>
           <tr>
         <td style={{fontSize:"20px"}} >{useremail}</td>
         <td style={{fontSize:"20px"}} >{usermcq}</td>
         <td style={{fontSize:"20px"}} >{userdesc}</td>
         </tr>
         </tbody>
         </Table>
        
      
         </Modal.Body>
        
        
       </Modal>
      {/* <td>{row.descmark}</td> */}
      {/* <td>{row.status===true?"evaluated":<button datakey={row.email}>Evaluate</button>}</td> */}
    </tr>
    ))}
  </tbody>
 
</Table>
        </Tab.Pane>
      </Tab.Content>
    </Col>
    </div>
  </Row>
</Tab.Container>
      </div>
    )
  }
}

export default Admin
