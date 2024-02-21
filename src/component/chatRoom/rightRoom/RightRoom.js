import React from 'react'
import { IoSend } from "react-icons/io5";

function RightRoom() {
  return (
    <div>
{/*-------------------Top--------------------------------------------------------- */}
    <div style={{background:'lightgrey',height:'100px',display:'flex',fontSize:'30px'}}>
      <img style={{width:"90px",height:'90px',borderRadius:'50%',background:'white',border:"2px solid lightgreen",cursor:"pointer",margin:'0px 30px'}}
      src='' alt=''/>
      Arbaj
    </div>
{/*--------------------------------Chat--Section--------------------------------------  */}
    <div style={{height:'80vh'}}>
{/*-------------------------------Chat----------------------------------------------  */}
      <div style={{height:'70vh'}}>

      </div>
{/* ------------------------------------Send--Chat-------------------------------------------- */}
    <div style={{position:'relative',display:'flex',justifyContent:'center',width:'auto',borderTop:'2px solid black',background:'lightgrey'}}>

    <div style={{margin:'10px',display:'flex'}}>

      <input style={{width:'470px',height:'45px',margin:'0px 20px',borderRadius:'20px',padding:'0px 40px'}}
      type='text' placeholder='Enter Text'
      
      />
      <button style={{width:'100px',borderRadius:'20px',border:'1px solid black',}}>
           <IoSend style={{fontSize:'35px',}}/>
      </button>
      </div>
    </div>
    </div>
    
  </div>  
  )
}

export default RightRoom
