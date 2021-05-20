import React, { Component } from 'react';
import Axios from "axios";
import Admindata from './Admin.txt'
import Userdata from './User.txt'
import history from '../../history';
import './Login.css';
// var data = require('./fakeusers.json');

export class Login extends Component {
        state={
            email:'',
            Admin:[],
            User:[],
            AdminLogin:false,
            UserLogin:false,
            login:"",
            data:""
        }
    componentDidMount(){
        fetch(Admindata)
        .then(r=>r.text())
        .then(text=>{
            // console.log(text)
            let adminArr=text.split(/\s+/);
            this.setState({Admin:adminArr})
            // console.log(adminArr)
        })
        fetch(Userdata)
        .then(r=>r.text())
        .then(text=>{
            // console.log(text)
            let userArr=text.split(/\s+/);
            this.setState({User:userArr})
            // console.log(userArr)
        })
       
        fetch('http://localhost:3000/quizapp/users', {
  headers: {
    'Content-Type': 'application/json',
  }

//   body: JSON.stringify(data),
})
.then(response => response.json())
.then(data => {
  this.setState({data:data})
})
    }

    handleAdmin=()=>{
        this.setState({login:"admin"})
    }
    handleUser=()=>{
        this.setState({login:"user"})
    }

    handleClick=(e)=>{
        e.preventDefault()
        if(this.state.login=="admin"){
            // this.props.onAdminLogin(true);
            this.state.AdminLogin===true ? history.push('/admin') : window.alert("Admin not found");
        }else{
            var email=this.state.email
            console.log(email)
             var loggedIn =  this.state.data.filter((item)=> {
                 return item.email === email;
             });
             console.log(loggedIn.length)
     
             if(this.state.UserLogin===true && loggedIn.length==0){
                // this.props.onUserLogin(true);
                localStorage.setItem("email",email)

               
                 history.push('/quiz')
             }else if(this.state.UserLogin===true && loggedIn.length>0){
                 history.push('/user')
                
             }else{
                 window.alert("User not found")
             }
     
        }
    }


    handleChange=(e)=>{
        this.setState({email:e.target.value})
        localStorage.setItem("email",e.target.value)
        for(let i=0;i<this.state.Admin.length;i++){
            if(e.target.value===this.state.Admin[i]){
               
                this.setState({AdminLogin:true})
                break;
            }else{
                this.setState({AdminLogin:false})
            }
        }
       

        for(var j=0;j<this.state.User.length;j++){
            
            if(e.target.value===this.state.User[j]){
                this.setState({UserLogin:true})
                console.log("User found")
                break;
            }else{
                this.setState({UserLogin:false})
            }
        }
    }
    render() {
        return (

            <div>
            <div   className="login">  
   
   <form className="login-form">
   
   
   <input className= "txt" type = "text" placeholder=" Login ID " onChange={this.handleChange} />
   <p>
    <input type="radio" id="test1" name="radio-group" onClick={this.handleAdmin} ></input>
    <label for="test1">Admin  </label>
  
    <input type="radio" id="test2" name="radio-group" onClick={this.handleUser}></input>
    <label for="test2">  User</label>
  </p>
   {/* <button className="btn1"  onClick={this.onUserClick}> User Login</button> */}
   
   <button className="btn2" onClick={this.handleClick} > Login </button>
   
   </form>
   
   </div>
         </div>


            
        )
    }
}

export default Login
