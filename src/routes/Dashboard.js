import React, { useEffect, useState } from 'react';
import Highcharts from 'highcharts/highstock'
import HighchartsReact from 'highcharts-react-official'
import Navbar from '../components/NavBar';
import { Grid, Button, Paper, Select, MenuItem, FormControl, InputLabel } from '@mui/material';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';
import axios from '../api/axios';
import moment from "moment";
require('highcharts/modules/map')(Highcharts);


const Dashboard = () => {
  const [initialDate, setInitialDate] = useState(dayjs("2023-04-01"));
  let today = moment().format('yyyy-MM-DD');
  const [finalDate, setFinalDate] = useState(dayjs(today));
  const [unit, setUnit] = useState('day');
  const [dataState, setDataState] = useState([]);
  const [dataAttendances, setDataAttendances] = useState([10, 20, 30, 40, 50, 60]);
  const [categoriesAttendances, setCategoriesAttendances] = useState(['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun']);
  const [dataEvents, setDataEvents] = useState([10, 20, 30, 40, 50, 60]);
  const [categoriesEvents, setCategoriesEvents] = useState(['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun']);
  
  
  console.log(window.localStorage.getItem("token"));
  
  
  const fetchDataState = async () => {
      console.log(today);
      console.log(initialDate.format('YYYY-MM-DD'));
      
      var options = {
        method: 'GET',
        url: 'admin/event/statistics/state',
        headers: {
          'accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + window.localStorage.getItem("token")
        },
        params: {
           "init_date": initialDate.format('YYYY-MM-DD'),
           "end_date": finalDate.format('YYYY-MM-DD')
        }
      };

      console.log(options);

      axios(options)
      .then (function (response) {
             setDataState([]);
             console.log(response.data);
             for(let i in response.data){
              setDataState(dataState => [...dataState, ({"name":i,"y":response.data[i]})]);
             }
             })    
   };
    
    
  const fetchDataAttendances = async () => {
      var options = {
        method: 'GET',
        url: '/admin/attendances/statistics/distribution',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + window.localStorage.getItem("token")
        },
        params: {
           "init_date": initialDate.format('YYYY-MM-DD'),
           "end_date": finalDate.format('YYYY-MM-DD')
        }
      };

      axios(options)
      .then (function (response) {
             setDataAttendances([]);
             setCategoriesAttendances([]);
             console.log(response.data);
             for(let i in response.data){
              setDataAttendances(dataAttendances => [...dataAttendances, i]);
              setCategoriesAttendances(categoriesAttendances => [...categoriesAttendances, response.data[i]]);
             }
             })    
     };
    
    
   const fetchDataEvents = async () => {
      var options = {
        method: 'GET',
        url: '/admin/events/statistics/distribution',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + window.localStorage.getItem("token")
        },
        params: {
           "init_date": initialDate.format('YYYY-MM-DD'),
           "end_date": finalDate.format('YYYY-MM-DD')
        }
      };

      axios(options)
      .then (function (response) {
             setDataEvents([]);
             setCategoriesEvents([]);
             console.log(response.data);
             for(let i in response.data){
              setDataEvents(dataEvents => [...dataEvents, i]);
              setCategoriesEvents(categoriesEvents => [...categoriesEvents, response.data[i]]);
             }
             })    
      };
    
  
  const isDateValid = (date) => {
    const currentDate = new Date();
    return date && date.isAfter(currentDate, 'day');
  };  


  const handleChangeInitialDate = (date) => {
     setInitialDate(date);
     console.log(initialDate);  
  }


  const handleChangeFinalDate = (date) => {
     setFinalDate(date);
     console.log(finalDate);  
  }
  
  
  const handleBack = () => {
    window.history.back();
  }


  useEffect(() => {
    fetchDataState();
    fetchDataAttendances();
    fetchDataEvents();
  }, [initialDate, finalDate]);


  return (
    <div>
      <Navbar />
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <div style={{ margin: '10px', display: 'flex', flexDirection: 'row', justifyContent: 'center', width: '100%'}}>
          <div style= {{ marginRight: '90px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: 300 }}>
            Desde:
            <DatePicker 
              shouldDisableDate={isDateValid}
              value={initialDate}
              onChange={handleChangeInitialDate}
              slotProps={{ textField: { size: 'small' } }}
            />
          </div>
          <div style= {{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: 300 }}>
            Hasta:
            <DatePicker 
              shouldDisableDate={isDateValid}
              value={finalDate}
              onChange={handleChangeFinalDate}
              slotProps={{ textField: { size: 'small' } }}
            />
          </div>
        </div>

        <Grid container justifyContent={'center'} rowSpacing={1} columnSpacing={{ xs: 0.5, sm: 2, md: 3 }}>
          <Grid item xs={3}>
            <Paper style={{ display: 'flex', justifyContent: 'center', padding: "5px", color: 'grey' }} elevation={3}>
              <HighchartsReact
                options={{
                  chart: { 
                    type: "pie",
                    height: 310,
                    width: 300,
                  },
                  title: { text: 'Estado de eventos' },
                  series: [{
                    name: 'Estados',
                    data: dataState
                  }]            
                }}
                highcharts={Highcharts}
              />
            </Paper>
          </Grid>

          <Grid item xs={6} s>
            <Paper style={{ position: 'relative', padding: "5px", color: 'grey' }} elevation={3}>
              <FormControl sx={{ zIndex: 100, minWidth: 100, position: 'absolute', top: '2%', right: '4%' }} size="small">
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

              <HighchartsReact
                options={{
                  chart: { type: 'column', height: 310 },
                  title: { text: 'Acreditaciones a lo largo del tiempo' },
                  xAxis: {
                    categories: categoriesAttendances
                  },            
                  yAxis: {
                    title: {
                      text: 'Acreditaciones'
                    }
                  },            
                  series: [{
                    name: 'Acreditaciones',
                    data: dataAttendances
                  }],
                }}
                highcharts={Highcharts}
              />
            </Paper>
          </Grid>

          <Grid item xs={6} s>
            <Paper style={{ padding: "5px", color: 'grey' }} elevation={3}>
            <HighchartsReact
              options={{
                chart: { type: 'line', height: 310 },
                title: { text: 'Eventos a lo largo del tiempo' },
                series: [{
                  name: 'Eventos',
                  data: dataEvents
                }],
                xAxis: {
                  categories: categoriesEvents,
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
      
      <Grid container sx={{ display: 'flex', justifyContent: 'center', marginTop: '20px', alignItems: 'center', textAlign: 'center' }} >
        <Button onClick={() => { handleBack() }} sx={{
          fontFamily: "'Circular Std', Arial, sans-serif", justifyContent: 'center',
          fontSize: 14, fontWeight: 700, color: '#fff', backgroundColor: '#1286f7', borderRadius: 2, px: 2, py: 1, '&:hover': { backgroundColor: '#1c1c1c' }
        }}>
          Volver
        </Button>
      </Grid>

      
    </div>
  )
};

export default Dashboard;
