import React,{useState,useEffect, } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'




function FriendChat() {
  
  const navigate = useNavigate()
  const [friend,setFriend]=useState([])
  const email = sessionStorage.getItem('email')
  const password = sessionStorage.getItem('password')

 
  useEffect( ()=>{
    
    
   getFriend(); 
   // eslint-disable-next-line react-hooks/exhaustive-deps  
  },[]) 

const getFriend= async ()=>{
  try{
  const result = await axios.post("http://localhost:8000/Friend",{email,password});
  
   setFriend(result.data[0]['friend'])
  }catch(err){
    return navigate('/')
  }
  
 }
  
 
return (
  <div>

  {
  friend.length!==0?(
   
     
    friend.map((friend,index)=>{
        const friendImage= friend.image
        const friendName =friend.name
        const friendEmail = friend.email 
         
   return (
         
    <div key={index}
      style={{background:'smokewhite',borderBottom:'0.5px solid lightgrey',borderRadius:'20px',display:'flex',height:'80px',padding:'5px',marginTop:'20px'}}>
     <div>
      <img style={{width:"70px",height:'70px',borderRadius:'50%',background:'white',border:"2px solid lightgreen",cursor:"pointer",margin:" 0px 30px",}}
      src={friendImage} alt=''/>
     </div>
      <div style={{margin:" 0px 30px",display:'flex'}}>
      {friendName}
      </div>
      <div style={{margin:" 0px 30px",display:'flex'}}>
        {friendEmail}
        </div>
      </div>
          )
       
      }
     )
  ):(
    <h5 style={{display:'flex',justifyContent:'center',margin:'30px',}}>No Friend</h5>
  )
    }
  
  </div>
  )
}

export default FriendChat
