import { Button, Grid } from '@mui/material';


export default function Menu() {


  return (
    <div>
      
      <Grid container sx={{ display: 'flex', justifyContent: 'center', marginTop: '50px', marginLeft: '20px', alignItems: 'center', textAlign: 'center' }}>
        <Button href={'/complaints'} sx={{
          fontFamily: "'Circular Std', Arial, sans-serif", fontSize: 14, fontWeight: 700, color: '#fff',
          justifyContent: 'center', backgroundColor: '#1286f7', borderRadius: 2, px: 4, py: 1, '&:hover': { backgroundColor: '#1286f7' }
        }}>
          Ir a sección de denuncias
        </Button>
      </Grid>
     
      <Grid container sx={{ display: 'flex', justifyContent: 'center', marginTop: '20px', marginLeft: '20px', alignItems: 'center', textAlign: 'center' }}>
        <Button href={'/dashboard'} sx={{
          fontFamily: "'Circular Std', Arial, sans-serif", fontSize: 14, fontWeight: 700, color: '#fff',
          justifyContent: 'center', backgroundColor: '#1286f7', borderRadius: 2, px: 4, py: 1, '&:hover': { backgroundColor: '#1286f7' }
        }}>
          Ir a sección de métricas
        </Button>
      </Grid>
      
    </div>
  );
}
