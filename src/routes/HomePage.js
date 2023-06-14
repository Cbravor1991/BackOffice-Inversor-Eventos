import React from 'react';
import '../styles/HomePage.scss';
import { Link } from 'react-router-dom';
import { useSpring, animated } from 'react-spring';
import { Typography, Button, Grid } from '@mui/material';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import {useState} from 'react';
import axios from '../api/axios';

const HomePage = () => {
  // Animación del botón de llamado a la acción
  const [ctaSpring, setCTASpring] = useSpring(() => ({
    transform: 'scale(1)',
    from: { opacity: 0 },
    to: { opacity: 1 },
    from: { y: 1000 },
    to: { y: 0 },
  }));

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');





  const handleLogin = async (e) => {
    try {
  const params = new URLSearchParams([['email',email ],['password', password]]);
  


  axios({method: 'post', url: '/admin/login', params:params})
  .then((response) => {
  
 
    window.localStorage.setItem('token',response.data.access_token )
    window.location.href='/complaints'
 
   
 } )
} catch (err) { console.log(err) }

} 
   






  
 

  return (
    <div className="homepage">
      <header className="header">
        <nav className="header__nav">
          <Typography
            variant="h5"
            noWrap
            component="a"
            href="/home"
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            TicketApp
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}></Box>

        </nav>
      </header>

      <section className="hero-section">
        <animated.div style={ctaSpring}>
          <div className="hero-section__content">
            <Box
              component="form"
              sx={{
                '& .MuiTextField-root': { m: 1, width: '25ch' },
              }}
              noValidate
              autoComplete="off"
            >


              

                <Typography
                  variant="h5"
                  noWrap
                  component="a"

                  sx={{
                
                    mr: 2,
                    display: { xs: 'none', md: 'flex' },
                    fontWeight: 700,
                    letterSpacing: '.3rem',
                
                    textDecoration: 'none',
                  }}
                >
                  ¡Bienvenido! Ingresá tus credenciales
                </Typography>

                <Grid  sx = {{marginLeft: '100px'}}  >

                  <Grid >
                    <TextField
                      
                      required
                      id="filled-required"
                      label="Usuario"
                    
                      autoComplete="current-password"
                      variant="filled"
                      value={email} 
                      onChange={(e) => setEmail(e.target.value)}
                    
                      sx={{    backgroundColor: 'white',   borderRadius: '1rem'}}
                    />
                  </Grid>

                  <Grid >

                    <TextField
                    required
                      id="filled-password-input"
                      label="Contraseña"
                      type="password"
                      autoComplete="current-password"
                      variant="filled"
                      value={password} 
                      onChange={(e) => setPassword(e.target.value)}
                      sx={{ backgroundColor: 'white', borderRadius: '1rem'}}
                      
                    />
                  </Grid>
                  <Grid  sx = {{marginLeft: '100px'}}>
                <Button variant="contained" onClick={handleLogin} sx={{
                  backgroundColor: '#1286f7',
                  border: 'none',
                  color: 'white',
                  fontSize: '15px',
                  fontWeight: 'bold',
                  padding: '10px 20px',
                  borderRadius: '30px',
                  width: '200px',
                  cursor: 'pointer',
                  transition: 'background-color 0.2s ease-in-out'
                }}>
                  Ingresar
                </Button>
              </Grid>

                </Grid>











             
            </Box>








          </div>
        </animated.div>
      </section>


    </div>
  );
};

export default HomePage;
