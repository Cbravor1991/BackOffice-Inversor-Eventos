import * as React from 'react';
import { Button, Typography, Box, AppBar, Container, Toolbar } from '@mui/material';

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
            href="/complaints"
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
          <Box sx={{ flexGrow: 1, marginLeft: 4, display: { xs: 'none', md: 'flex' } }}>
            <Button
              onClick={() => { window.location.href = '/complaints' }}
              sx={{ my: 2, color: 'white', display: 'block' }}
            >
              Denuncias
            </Button>

            <Button
              onClick={() => { window.location.href = '/complainants' }}
              sx={{ my: 2, color: 'white', display: 'block' }}
            >
              Usuarios
            </Button>

            <Button
              onClick={() => { window.location.href = '/dashboard' }}
              sx={{ my: 2, color: 'white', display: 'block' }}
            >
              Métricas
            </Button>
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