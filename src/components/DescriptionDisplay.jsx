import { Typography, Paper } from '@mui/material';
import draftToHtml from 'draftjs-to-html';

export default function DescriptionDisplay({ description }) {
  if (description.length === 0) {
    return;
  }
  
  return (
    <div>
      <Typography variant="h6" component="div" sx={{ marginTop: '20px', marginLeft: '50px', fontSize: 14, fontWeight: 700}}>
        Descripción
      </Typography>

      <Paper elevation={0}>
        <Typography variant="body2" sx={{ padding:'10px', fontSize: 14, fontWeight: 400, display: 'flex', justifyContent: 'center' }}>
          <div dangerouslySetInnerHTML={{ __html: draftToHtml(description) }} />
        </Typography>
      </Paper>
    </div>
  )
}