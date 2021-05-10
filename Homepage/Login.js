import React, { Component } from 'react'
import Admindata from './Admin.txt'
import Userdata from './User.txt'
import history from './history';
import './Login.css';

export class Login extends Component {
        state={
            email:'',
            Admin:[],
            User:[],
            AdminLogin:false,
            UserLogin:false
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
       
        fetch('http://localhost:3000/api/todos', {
  headers: {
    'Content-Type': 'application/json',
  },
//   body: JSON.stringify(data),
})
.then(response => response.json())
.then(data => {
  console.log('Success:', data);
})
    }
    handleChange=(e)=>{
        // this.setState({email:e.target.value})
        for(let i=0;i<this.state.Admin.length;i++){
            // console.log(this.state.Admin.length)
            if(e.target.value===this.state.Admin[i]){
                // this.setState({AdminLogin:true})
                // console.log(this.state.Admin[i])

                // console.log("true")
                this.setState({AdminLogin:true})
                // history.push('/admin')
                break;
            }else{
                this.setState({AdminLogin:false})
                // console.log("faluse")
                // window.alert("Admin not found")
            }
        }
        // console.log(this.state.Admin)
        // this.state.Admin.map((item)=>{
        //     console.log(item)
        //     e.target.value===item?this.setState({AdminLogin:true}):this.setState({AdminLogin:false})
        // })

        for(var j=0;j<this.state.User.length;j++){
            // console.log(this.state.User[i])
            
            if(e.target.value===this.state.User[j]){
                this.setState({UserLogin:true})
                console.log("User found")
                // history.push('/User')
                break;
            }else{
                this.setState({UserLogin:false})
                // window.alert("User not found")
            }
        }
    }
    onAdminClick=(e)=>{
        // for(var i=0;i<this.state.Admin.length;i++){
        //     // console.log(this.state.Admin[i])
        //     if(this.state.email===this.state.Admin[i]){
        //         window.alert("Admin found")
        //         history.push('/admin')
        //         break;
        //     }else{
        //         window.alert("Admin not found")
        //     }
        // }
        // e.preventDefault()
        // console.log(this.state.AdminLogin)
        this.state.AdminLogin===true ? history.push('/admin') : window.alert("Admin not found");
    }
    onUserClick=()=>{
        // for(var i=0;i<this.state.User.length;i++){
        //     // console.log(this.state.User[i])
        //     if(this.state.email===this.state.User[i]){
        //         window.alert("User found")
        //         history.push('/user')
        //         break;
        //     }else{
        //         window.alert("User not found")
        //     }
        // }
        // console.log(this.state.UserLogin)
        (this.state.UserLogin===true)?history.push('/user'):window.alert("User not found")
    }
    render() {
        return (

            <div>
            <div   className="login">  
   
   <form className="login-form">
   
   
   <input className= "txt" type = "text" placeholder=" Login ID " onClick={this.onclick} onChange={this.handleChange} />
   
   <button className="btn1"  onClick={this.onUserClick}> User Login</button>
   
   <button className="btn2" onClick={this.onAdminClick} > Admin Login </button>
   
   </form>
   
   </div>
         </div>


            
        )
    }
}

export default Login
