import React from 'react';
import ReactDOM from 'react-dom';

import App from './App';
import { LoginPage } from './pages/LoginPage';

import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";
import { Homepage } from './pages/Homepage';
import { Header } from './components/Header';
import PrivateRoute from './utils/PrivateRoute';
import { AuthProvider } from './context/AuthContext';




ReactDOM.render(

  

  
  <BrowserRouter>
  <AuthProvider>
  <Header/>
    <Routes>
      <Route path="/" element={<App />}  />
      <Route path="login/" element={<LoginPage />} />

        {/* <Route index element={<Homepage />} />

        <Route path="teams" element={<LoginPage />}>
          <Route path=":teamId" element={<Team />} />
          <Route path="new" element={<NewTeamForm />} />
          <Route index element={<LeagueStandings />} />
        </Route>

      </Route> */}
    </Routes>
    </AuthProvider>
  </BrowserRouter>
  
 ,
  document.getElementById('root')
);



