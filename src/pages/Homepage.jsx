import React, { useContext, useEffect, useState } from 'react'
import AuthContext from '../context/AuthContext'




export const Homepage = () => {

const [notes, setnotes] = useState([])

let {authToken,logoutUser}=useContext(AuthContext)

useEffect(() => {

  getNotes();
 
}, [])





let getNotes=async()=>
{

 


  let token=String(authToken.access);

  // console.log(`Bearer ${token}`)
  // console.log('Bearer2' + token)


   let response = await fetch('http://localhost:8000/api/note/',{
     method: 'GET',
     headers:{
       'Content-Type':'application/json',
        Authorization: 'Bearer ' + token
     }
   }) 

   console.log(response)

   let data= await response.json()
   console.log('data: ',data)


   if((await response).status===200)
   {
    setnotes(data)

   }
   else if(( await response).statusText ==="Unauthorized")
   {
     
    logoutUser();

   }
   
  
}



  




  return (
    <div>
    <p>You are logged to the home page!</p>


    <ul>

      {notes.map(note=>(
        <li key={note.id}>{note.body}</li>

      ))}


    </ul>

   


    </div>


  )
}
