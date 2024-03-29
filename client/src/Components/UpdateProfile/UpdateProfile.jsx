import React,{useEffect, useState} from 'react'
import "./UpdateProfile.css"
import { Avatar, Button, Typography } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import { loadUser, updateProfile } from '../../Actions/User'
import { useAlert } from 'react-alert'
import Loader from '../Loader/Loader'

const UpdateProfile = () => {

    const {loading,error,user}=useSelector((state)=>state.user)

    const {loading:updateLoading,error:updateError,message}=useSelector((state)=>state.like)

    const [name,setName]=useState(user.name)

    const [email,setEmail]=useState(user.email)

    const [avatar,setAvatar]=useState("")

    const [avatarPrev,setAvatarPrev]=useState(user.avatar.url)

    const dispatch=useDispatch()

    const alert=useAlert()

    

    const handleImageChange=(e)=>{
        const file = e.target.files[0];
        const Reader=new FileReader();
        Reader.onload=()=>{
            if(Reader.readyState===2){

                setAvatarPrev(Reader.result);
                
                setAvatar(Reader.result);
            }
        }
        Reader.readAsDataURL(file)
    };

    const submitHandler=async (e)=>{
        e.preventDefault();
        await dispatch(updateProfile(name,email,avatar))
        dispatch(loadUser())
    }

    useEffect(()=>{
        if(error){
            alert.error(error);
            dispatch({type:'clearErrors'})
        }

        if(updateError){
            alert.error(updateError);
            dispatch({type:'clearErrors'})
        }

        if(message){
            alert.success(message);
            dispatch({type:'clearMessage'})
        }
    },[dispatch,alert,error,updateError,message])

  return (
    loading? <Loader/>:(
        <div className='updateProfile'>

        <form  className="updateProfileForm" onSubmit={submitHandler}>
        <Typography variant="h3" style={{ padding: "2vmax" }}>
          Merny 
        </Typography>

        <Avatar src={avatarPrev} alt="User" sx={{height:"10vmax", width:"10vmax"}} />

        <input type='file' accept="image/*" onChange={handleImageChange} />

        <input type='text' 
        value={name} className='updateProfileInputs' required
        onChange={(e) => setName(e.target.value)} placeholder='Name'/>

        <input
          type="email" placeholder="Email" 
          required value={email} className='updateProfileInputs' 
          onChange={(e) => setEmail(e.target.value)}
          
        />

        <Button disabled={updateLoading} type="submit">Update</Button>

        </form>
      
    </div>
    )
  )
}


export default UpdateProfile
