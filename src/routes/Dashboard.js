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


  useEffect(() => {
    fetchDataState();
    fetchDataAttendances();
    fetchDataEvents();
  }, [initialDate, finalDate]);


  return (
    <div>
      <Navbar />
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <div style={{ margin: '30px', display: 'flex', flexDirection: 'row', justifyContent: 'space-evenly' }}>
          <DatePicker 
            label="Desde"
            shouldDisableDate={isDateValid}
            value={initialDate}
            onChange={handleChangeInitialDate}
          />
        </div>
        
        <div style={{ margin: '30px', display: 'flex', flexDirection: 'row', justifyContent: 'space-evenly' }}>
          <DatePicker 
            label="Hasta"
            shouldDisableDate={isDateValid}
            value={finalDate}
            onChange={handleChangeFinalDate}
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
                  data: dataState
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
    </div>
  )
};

export default Dashboard;
