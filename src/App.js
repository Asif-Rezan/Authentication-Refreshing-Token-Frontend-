import './App.css';
import { Homepage } from './pages/Homepage';
import { LoginPage } from './pages/LoginPage';
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Route, useNavigate } from "react-router-dom";
import { Header } from './components/Header';
import { useContext, useEffect, useState } from 'react';
import AuthContext from './context/AuthContext';




function App() {

let navigate = useNavigate();

let {user} = useContext(AuthContext)

           

useEffect(() => {
  if (!user){
     return navigate("/login");
  }
},[]);

  

  return (

    <div>
      

    <Homepage/>
  
   </div>

   
    // <Router>
    // <Route path="/" component={<Homepage/>} />
    // </Router>
   
    
  );
}

export default App;
