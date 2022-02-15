import { createContext, useEffect, useState } from "react";
import jwt_decode from "jwt-decode";
import { useNavigate } from "react-router-dom";

const AuthContext= createContext()

 

export default AuthContext;



export const AuthProvider = ({children})=>
{

  

  let [authToken,setAuthToken] =useState(()=>localStorage.getItem('authToken') ? JSON.parse(localStorage.getItem('authToken')) : null);
  let [user,setUser] =useState(()=>localStorage.getItem('authToken') ? jwt_decode(localStorage.getItem('authToken')) : null);
  const [loading, setLoading] = useState(true)

  const navigate = useNavigate();
  





  
  let loginUser = async(e)=>
  {
    e.preventDefault()
    console.log("From submittted");
    let response= fetch('http://localhost:8000/api/token/',{
      method: 'POST',
      headers:{
        'Content-Type':'application/json'
      },
      body:JSON.stringify({'username':e.target.username.value, 'password':e.target.password.value})
    })
    let data=await (await response).json()
    // console.log('data: ' ,data)
    // console.log('response: ',response)

    if((await response).status===200)
    {
      setAuthToken(data)
      setUser(jwt_decode(data.access))
      localStorage.setItem('authToken',JSON.stringify(data))
      navigate('/');
    }
    else
    {
      alert('Something went wrong');
    }

  }


  let logoutUser=()=>{
    setAuthToken(null)
    setUser(null)
    localStorage.removeItem('authToken')
    navigate('/login');

  }


  let updateToken = async ()=>{

    console.log("update token called");

    let response= fetch('http://localhost:8000/api/token/refresh/',{
      method: 'POST',
      headers:{
        'Content-Type':'application/json'
      },
      body:JSON.stringify({'refresh':authToken?.refresh})
    })
    let data=await (await response).json()

    if((await response).status===200)
    {
      setAuthToken(data)
      setUser(jwt_decode(data.access))
      localStorage.setItem('authToken',JSON.stringify(data))
      navigate('/');

    }
    else
    {
      logoutUser();
    }

    if(loading)
    {
      setLoading(false)
    }

  }

  useEffect(() => {

    if(loading){
      updateToken()
    }



  let fourMinute = 1000 * 60 * 4

   let interval= setInterval(()=>{
      if(authToken)
      {
        updateToken()
      }
    },2000)

    return ()=> clearInterval(interval)

  
  }, [authToken,loading])
  





  let contextData={
    authToken:authToken,
    user:user,
    loginUser:loginUser,
    logoutUser:logoutUser,
   

    
  }



  return(
    <AuthContext.Provider value={contextData}>
     {loading ? null : children}
    </AuthContext.Provider>
  )
}