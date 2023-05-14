import { Typography, Grid, Stack, Divider, Paper } from '@mui/material';

export default function FaqsDisplay({ faqs }) {
  if (faqs.length === 0 || faqs[0].question === '') {
    return;
  }
  return (
    <div>
      <Typography variant="h6" component="div" sx={{ marginTop: '20px', marginLeft: '50px', fontSize: 14, fontWeight: 700}}>
        Preguntas frecuentes
      </Typography>

      <Paper elevation={0}>
        <Stack divider={<Divider sx={{ marginLeft: '100px', marginRight: '100px' }} />} spacing={1.5} direction="column" useFlexGap flexWrap="wrap" padding='10px'>
          {faqs.map((item, key) => {
            return (
              <Grid container justifyContent={'center'} spacing={2}>
                <Grid item xs={5} sx={{ justifyContent: 'right', display: 'flex' }}>
                  <Typography variant='body2' sx={{ fontWeight: 100 }} >
                    {item.question}
                  </Typography>
                </Grid>
                <Grid item xs={5}>
                  <Typography variant='body2'>
                    {item.response}
                  </Typography>
                </Grid>
              </Grid>
            )
          })}
        </Stack>
      </Paper>
    </div>
  )
}