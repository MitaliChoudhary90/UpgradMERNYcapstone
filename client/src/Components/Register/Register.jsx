import React,{useEffect, useState} from 'react'
import "./Register.css"
import { Avatar, Button, Typography } from '@mui/material'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { registerUser } from '../../Actions/User'
import { useAlert } from 'react-alert'
const Register = () => {

    const [name,setName]=useState("")

    const [email,setEmail]=useState("")

    const [avatar,setAvatar]=useState("")


    const [password,setPassword]=useState("")

    const dispatch=useDispatch()

    const alert=useAlert()

    const {loading,error}=useSelector((state)=>state.user)

    const handleImageChange=(e)=>{
        const file = e.target.files[0];
        const Reader=new FileReader();
        Reader.onload=()=>{
            if(Reader.readyState===2){
                
                setAvatar(Reader.result);
            }
        }
        Reader.readAsDataURL(file)
    };

    const submitHandler=(e)=>{
        e.preventDefault();
        dispatch(registerUser(name,email,password,avatar))
    }

    useEffect(()=>{
        if(error){
            alert.error(error);
            dispatch({type:'clearErrors'})
        }
    },[dispatch,alert,error])

  return (
    <div className='register'>

        <form  className="registerForm" onSubmit={submitHandler}>
        <Typography variant="h3" style={{ padding: "2vmax" }}>
          Merny 
        </Typography>

        <Avatar src={avatar} alt="User" sx={{height:"10vmax", width:"10vmax"}} />

        <input type='file' accept="image/*" onChange={handleImageChange} />

        <input type='text' 
        value={name} className='registerInputs' required
        onChange={(e) => setName(e.target.value)} placeholder='Name'/>

        <input
          type="email" placeholder="Email" 
          required value={email} className='registerInputs' 
          onChange={(e) => setEmail(e.target.value)}
          
        />

        <input
          type="password" placeholder="Password" 
          required value={password} className='registerInputs'
          onChange={(e) => setPassword(e.target.value)}
          
        />

        <Link to="/"><Typography>Already Registered? Login now.</Typography></Link>

        <Button disabled={loading} type="submit">Register</Button>

        </form>
      
    </div>
  )
}

export default Register
