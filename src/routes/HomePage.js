import React from 'react';
import '../styles/HomePage.scss';
import { Link } from 'react-router-dom';
import { useSpring, animated } from 'react-spring';
import { Typography } from '@mui/material';
import Box from '@mui/material/Box';

const HomePage = () => {
  // Animación del botón de llamado a la acción
  const [ctaSpring, setCTASpring] = useSpring(() => ({
    transform: 'scale(1)',
    from: { opacity: 0 },
    to: { opacity: 1 },
    from: { y: 1000 },
    to: { y: 0 },
  }));

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
          <h1 className="hero-section__title">¡Organizá los mejores eventos de tu ciudad, de la manera más fácil posible!</h1>
          <p className="hero-section__subtitle">Accedé a todo lo que tenemos para ofrecerte.</p>
        </div>
        </animated.div>
      </section>

    
    </div>
  );
};

export default HomePage;