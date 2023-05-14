import * as React from 'react';
import { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import { Backdrop, CircularProgress } from '@mui/material';
import Typography from '@mui/material/Typography';
import { api } from '../api/axios';
import Navbar from '../components/NavBar';
import { EditorState, convertFromRaw } from 'draft-js';
import { Grid } from '@mui/material';
import AgendaDisplay from '../components/AgendaDisplay';
import FaqsDisplay from '../components/FaqsDisplay';
import Paper from '@mui/material/Paper';
import BasicInfoDisplay from '../components/BasicInfoDisplay';
import ImageDisplay from '../components/ImageDisplay';
import DescriptionDisplay from '../components/DescriptionDisplay';



const View = () => {

  const [editorState, setEditorState] = useState(() => EditorState.createEmpty());
  let event = JSON.parse(window.localStorage.getItem("cache_view"));
  console.log(event);

  const stringDate = new Date(event.Event.date).toLocaleDateString('es-ES', { day: 'numeric', month: 'long' });
  const [loading, setLoading] = React.useState(false);
  const [images, setImages] = React.useState(event.Images); 
  const mapContainer = React.useRef(null);
  const [latitude, setLatitude] = useState(event ? event.Event.latitude : -34.599722222222);
  const [longitude, setLongitude] = useState(event ? event.Event.longitude : -58.381944444444);


  
  
  useEffect(() => {
 
    const rawContent = JSON.parse(event.Event.description);
    const contentState = convertFromRaw(rawContent);
    setEditorState(EditorState.createWithContent(contentState));
  }, []);
  
  

  
  const handleBack = () => {
    window.localStorage.setItem("cache_event", null);
    window.localStorage.setItem("cache_cover", null);  
    window.history.back();
  }
  

  return (

    <Box sx={{ mb: 4, justifyContent: 'center' }}>
    
      <Navbar />

      <Grid style={{ display: 'flex', justifyContent: 'center'}}>
        <Paper elevation={5} sx={{width: '600px', background: '#fff', mt: 6}}>

          <Typography variant="h5" component="div" sx={{ padding: 2, fontSize: 30, fontWeight: 70, display: 'flex', justifyContent: 'center' }}>
            {event.Event.title}
          </Typography>

          <CardContent sx={{ pb: 2, justifyContent: 'center' }}>

            <ImageDisplay images={images} />
            <BasicInfoDisplay event={event.Event} stringDate={stringDate}/>
            <DescriptionDisplay description={JSON.parse(event.Event.description)}/>
            <AgendaDisplay agenda={event.Diary} />
            
               
            
            <FaqsDisplay faqs={event.FAQ} />

          </CardContent>

          <CardActions sx={{ display: 'flex', justifyContent: 'center', pt: 0 }}>

            <Backdrop
              sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
              open={loading}
              onClick={() => setLoading(false)}
              >
              <CircularProgress color="inherit" />
            </Backdrop>

            <Button onClick={() => { handleBack() }} sx={{
              fontFamily: "'Circular Std', Arial, sans-serif", justifyContent: 'center',
              fontSize: 14, fontWeight: 700, color: '#fff', backgroundColor: '#1286f7', borderRadius: 2, px: 2, py: 1, '&:hover': { backgroundColor: '#1c1c1c' }
            }}>
              Volver
            </Button>
          </CardActions>
        </Paper>
      </Grid>

    </Box>

  )
}

export default View

