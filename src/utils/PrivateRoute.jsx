import { Routes } from 'react-router-dom'
import {Route, Redirect} from 'react-router-dom'

import React from 'react'

const PrivateRoute = ({children, ...rest}) => {

  console.log("Private route work")
  return (
    
   
    <Route {...rest}>{children}</Route>
  
  )
}

export default PrivateRoute;
