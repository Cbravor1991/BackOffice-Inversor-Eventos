import React, { useEffect, useState } from 'react';
import Highcharts from 'highcharts/highstock'
import HighchartsReact from 'highcharts-react-official'
import Navbar from '../components/NavBar';
import { Grid, Paper, Select, MenuItem, FormControl, InputLabel } from '@mui/material';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';
import axios from '../api/axios';
require('highcharts/modules/map')(Highcharts);

const Dashboard = () => {
  const [initialDate, setInitialDate] = useState(dayjs());
  const [unit, setUnit] = useState('day');
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      var options = {
        method: 'GET',
        url: '/admin/statistics', // completar
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + window.localStorage.getItem("token")
        },
      };

      const response = await fetch(options);
      const data = await response.json();
      setData(data);
    };
    fetchData();
  }, []);

  const isDateValid = (date) => {
    const currentDate = new Date();
    return date && date.isAfter(currentDate, 'day');
  };  

  return (
    <div>
      <Navbar />
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <div style={{ margin: '30px', display: 'flex', flexDirection: 'row', justifyContent: 'space-evenly' }}>
          <DatePicker 
            label="Desde"
            shouldDisableDate={isDateValid}
            value={initialDate}
            onChange={(newValue) => setInitialDate(newValue)}
          />
        </div>

        <Grid container justifyContent={'center'}>
          <Grid item xs={6}>
            <Paper style={{ margin: '30px', marginTop: 0, padding: "20px", color: 'grey' }} elevation={4}>
            <HighchartsReact
              options={{
                chart: { type: "pie" },
                title: { text: 'Estado de eventos' },
                series: [{
                  name: 'Estados',
                  data: [
                    ['Publicados', 14],
                    ['Finalizados', 14],
                    ['Cancelados', 14],
                    ['Suspendidos', 14],
                  ]
                }]            
              }}
              highcharts={Highcharts}
            />
            </Paper>
          </Grid>

          <Grid item xs={12} s>
            <Paper style={{ margin: '30px', marginTop: 0, padding: "20px", color: 'grey' }} elevation={4}>
            <HighchartsReact
              options={{
                chart: { type: 'column' },
                title: { text: 'Acreditaciones a lo largo del tiempo' },
                xAxis: {
                  categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun']
                },            
                yAxis: {
                  title: {
                    text: 'Acreditaciones'
                  }
                },            
                series: [{
                  name: 'Acreditaciones',
                  data: [10, 20, 30, 40, 50, 60]
                }],
              }}
              highcharts={Highcharts}
            />

            <div style={{ margin: '5px', display: 'flex', justifyContent: 'center' }}>
              <FormControl sx={{ minWidth: 100 }} size="small">
                <InputLabel id="unit">Unidad</InputLabel>
                <Select
                  labelId="unit"
                  id="unit"              
                  label="Unidad"
                  value={unit}
                  onChange={(e) => setUnit(e.target.value)}
                >
                  <MenuItem value={1}>Dia</MenuItem>
                  <MenuItem value={2}>Mes</MenuItem>
                  <MenuItem value={3}>Año</MenuItem>
                </Select>
              </FormControl>
            </div>
            </Paper>
          </Grid>

          <Grid item xs={12} s>
            <Paper style={{ margin: '30px', marginTop: 0, padding: "20px", color: 'grey' }} elevation={4}>
            <HighchartsReact
              options={{
                chart: { type: 'line' },
                title: { text: 'Eventos a lo largo del tiempo' },
                series: [{
                  name: 'Eventos',
                  data: [10, 20, 30, 40, 50, 60]
                }],
                xAxis: {
                  categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
                },
                yAxis: {
                  title: {
                    text: 'Eventos'
                  }
                },  
              }}
              highcharts={Highcharts}
            />
            </Paper>
          </Grid>
        </Grid>
      </LocalizationProvider>
    </div>
  )
};

export default Dashboard;
