import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { Button, Grid } from '@mui/material';



function ResponsiveAppBar() {


  const handleLogout = (event) => {
    window.localStorage.setItem('token','')
    window.location.href = '/home'
  
    
  };
  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Typography
            variant="h5"
            noWrap
            component="a"
            href="/eventList"
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

          <Typography
            variant="h5"
            noWrap
            component="a"
            href="/eventList"
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            TicketApp
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
          </Box>

          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex', justifyContent: 'right', color:'black' } }}>
        <Button onClick={() => { handleLogout() }} sx={{ fontFamily: "'Circular Std', Arial, sans-serif", fontSize: 14, fontWeight: 700, color: '#fff',
         justifyContent: 'left', backgroundColor: 'black', borderRadius: 2, px: 4, py: 1, '&:hover': { backgroundColor: '#1286f7' } }}>
         Logout
        </Button>
        </Box>

       
        </Toolbar>
      </Container>
    </AppBar>
  );
  
}
export default ResponsiveAppBar;