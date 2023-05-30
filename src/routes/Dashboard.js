import React, { useEffect, useState } from 'react';
import Highcharts from 'highcharts/highstock'
import HighchartsReact from 'highcharts-react-official'
import Navbar from '../components/NavBar';
import { Grid, Paper, Select, MenuItem, FormControl, InputLabel } from '@mui/material';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';
require('highcharts/modules/map')(Highcharts);

function getAllCategories(data) {
  const categories = [];
  data.forEach(d => {
    if (!categories.includes(d.category)) {
      categories.push(d.category);
    }
  });
  return categories.map(c => ({ value: c, label: c }));
}

function getAllProducts(data, category) {
  const products = [];
  data.forEach(d => {
    if (d.category === category && !products.includes(d.product)) {
      products.push(d.product);
    }
  });
  return products.map(c => ({ value: c, label: c }));
}

function getAllBrands(data, category, product) {
  const brands = [];
  data.forEach(d => {
    if (d.category === category && d.product === product && !brands.includes(d.brand)) {
      brands.push(d.brand);
    }
  });
  return brands.map(c => ({ value: c, label: c }));
}

function getSales(data, category, product, brand) {
  for (let i = 0; i < data.length; i++) {
    if (data[i].category === category && data[i].product === product && data[i].brand === brand) {
      return data[i].sales;
    }
  }
}


const Dashboard = () => {
  const [initialDate, setInitialDate] = useState(dayjs());
  const [unit, setUnit] = useState('day');
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch('http://localhost:3000/api/v1/events'); // completar fetch y ver que data traer
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
              }}
              highcharts={Highcharts}
            />
            </Paper>
          </Grid>

          <Grid item xs={12} s>
            <Paper style={{ margin: '30px', marginTop: 0, padding: "20px", color: 'grey' }} elevation={4}>
            <div style={{ margin: '30px', display: 'flex', flexDirection: 'row', justifyContent: 'space-evenly' }}>
              <FormControl fullWidth>
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
            <HighchartsReact
              options={{
                chart: { type: "column" },
                title: { text: 'Acreditaciones a lo largo del tiempo' },
              }}
              highcharts={Highcharts}
            />
            </Paper>
          </Grid>

          <Grid item xs={12} s>
            <Paper style={{ margin: '30px', marginTop: 0, padding: "20px", color: 'grey' }} elevation={4}>
            <HighchartsReact
              options={{
                chart: { type: "column" },
                title: { text: 'Eventos a lo largo del tiempo' },
                series: [{
                  name: 'Ventas',
                  color: '#46A0E9',
                  // data: sales.map(s => s.amount)
                }],
                xAxis: {
                  // categories: sales.map(s => s.month),
                  crosshair: true
                }          
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
