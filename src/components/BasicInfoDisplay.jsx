import { Typography, Stack, Grid, Divider, Paper } from '@mui/material';

function basicInfoData(event, stringDate) {
  return [
    {
      'key': 'Categoría',
      'value': event.category
    },
    {
      'key': 'Fecha',
      'value': stringDate
    },
    {
      'key': 'Dirección',
      'value': event.direction
    },
    {
      'key': 'Capacidad',
      'value': event.capacity
    }
  ]
}

export default function BasicInfoDisplay({ event, stringDate }) {
  return (
    <div>
      <Typography variant="h6" component="div" sx={{ marginTop: '20px', marginLeft: '50px', fontSize: 14, fontWeight: 700}}>
        Información básica
      </Typography>
      <Paper elevation={0}>
        <Stack divider={<Divider sx={{ marginLeft: '100px', marginRight: '99px' }} />} spacing={1.5} direction="column" useFlexGap flexWrap="wrap" padding='10px'>
          {basicInfoData(event, stringDate).map((data) => {
              return (
                <Grid container justifyContent={'center'} spacing={2}>
                  <Grid item xs={4} sx={{ justifyContent: 'right', display: 'flex' }}>
                    <Typography variant='body2' sx={{ fontWeight: 100 }} >
                      {data.key}
                    </Typography>
                  </Grid>
                  <Grid item xs={4}>
                    <Typography variant='body2'>
                      {data.value}
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
