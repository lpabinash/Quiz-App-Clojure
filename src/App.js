import React, { Component } from 'react'
import './login.css';
import axios from 'axios';
//import { text } from './user.txt' 
export class App extends Component {
  state= { emailID : " "}
  emailID = (e)=> { 
   // console.log(text); 

    this.setState({emailID : e.target.value})
    console.log(this.state.emailID)

  } 
showfile= (e)=> {
e.preventDefault()
const testURL = 'http://localhost:3000/api/todos';
	const myInit = {
		method: 'HEAD',
		mode: 'no-cors',
	};
	// const myRequest = new Request(testURL, myInit);
	fetch(testURL,myInit).then(function(response) {
		return response;
	}).then(function(response) {
		console.log(response);
	}).catch(function(e){
		console.log(e);
	});

}
onclick= () =>{
  fetch('C:\Users\User.DESKTOP-M6S9AOI\Desktop\User.txt')
      .then(function(response){
          return response.text();
      }).then(function (data) {
      console.log(data);
  })
}

  render() {


    return (
      <div>
         <div   className="login">  

<form className="login-form">


<input className= "txt" type = "text" placeholder=" Login ID " onClick={this.onclick}  onChange = {this.emailID} />

<button className="btn1" onClick = {this.showfile}> User Login</button>

{/* <link to = "Admin.js"> */}
<button className="btn2" > Admin Login </button>

</form>

</div>
      </div>
    )
  }
}

export default App



