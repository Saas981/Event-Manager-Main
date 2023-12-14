import React, {useEffect} from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './Components/Navbar';
import Home from './Components/Home';
import About from './Components/About';
import Contact from './Components/Contact';
import Login from './Components/Login';
import SignUp from './Components/Signup';
import Dashboard from './Components/Dashboard'
import { Container, Grid } from '@mui/material';
import './App.css'; 

import { getCurrentUser } from 'aws-amplify/auth';
import config from './aws-exports';
import { Amplify } from 'aws-amplify';
Amplify.configure(config);

// App.js




function App({ }) {
  const [user, setUser] = React.useState(null);
 
  useEffect(() => {
    const currentAuthenticatedUser = async () => {
      try {
        const { username, userId, signInDetails } = await getCurrentUser();
        console.log(`The username: ${username}`);
        console.log(`The userId: ${userId}`);
        console.log(`The signInDetails: ${JSON.stringify(signInDetails)}`);
        setUser(signInDetails.loginId)
      } catch (err) {
        console.log(err);
      }
    };

    // Call the function when the component mounts
    currentAuthenticatedUser();
  }, [])
  return (
    <Router >
           <Navbar user={user} style={{zIndex:100}}/>
      <div style={{minHeight: '90vh',height:"auto",background: 'linear-gradient(to right, rgba(80, 63, 159,0.18), rgba(255, 81, 181,0.18))',paddingBottom:"10%",paddingTop:"6%"}} >
   
        <br></br>
          <Grid
            container
            direction="column"
            justifyContent="center"
            alignItems="center"
            style={{ paddingTop: '20px', }}
            
          >
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<SignUp />} />
              <Route path="/dashboard" element={<Dashboard />} />
            </Routes>
          </Grid>
      
      </div>
    </Router>
  );
}

export default App;
