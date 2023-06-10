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
  const [dataAttendances, setDataAttendances] = useState([]);
  const [categoriesAttendances, setCategoriesAttendances] = useState([]);
  const [dataEvents, setDataEvents] = useState([]);
  const [categoriesEvents, setCategoriesEvents] = useState([]);


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

    try {
      const response = await axios(options);
      const newDataState = [];

      for (let [key, value] of Object.entries(response.data)) {
        newDataState.push({ "name": value.state, "y": value.amount });
      }

      setDataState(newDataState);

    } catch (error) {
      console.error('Error al obtener los datos:', error);
    }
  };


  const fetchDataAttendances = async () => {
    console.log(finalDate.format('YYYY-MM-DD'))
    const data_Attendances = []
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

    await axios(options)
      .then(function (response) {


        if (response.data.length >0){
        const months = [
          'ene', 'feb', 'mar', 'abr', 'may', 'jun',
          'jul', 'ago', 'sep', 'oct', 'nov', 'dic'
        ];
        console.log(response.data)

        const startMonthString = response.data[0].date;
        const endMonthString = response.data[response.data.length - 1].date;
        const startMonth = parseInt(startMonthString.substring(5));
        const endMonth = parseInt(endMonthString.substring(5));
        const attendancesMonths = months.slice(0, endMonth);

        setCategoriesAttendances(attendancesMonths);

        for (let i in attendancesMonths) {

          data_Attendances.push(0)
        }

        for (let i in response.data) {
          for (let j in data_Attendances) {
            if (((parseInt(response.data[i].date.substring(5)) - 1)) == j) {
              data_Attendances[j] = response.data[i].attendances
            }
          }
        }
        setDataAttendances(data_Attendances)} 
        else{
          
          setDataAttendances([]);
          setCategoriesAttendances([]);


        } 
     
     
     
     
      })
  };


  const fetchDataEvents = async () => {
    const data_Events = []
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
      .then(function (response) {
        if (response.data.length >0){
        const months = [
          'ene', 'feb', 'mar', 'abr', 'may', 'jun',
          'jul', 'ago', 'sep', 'oct', 'nov', 'dic'
        ];

        const startMonthString = response.data[0].date;
        const endMonthString = response.data[response.data.length - 1].date;
        const startMonth = parseInt(startMonthString.substring(5));
        const endMonth = parseInt(endMonthString.substring(5));
        const eventsMonths = months.slice(0, endMonth);

        setCategoriesEvents(eventsMonths);

        for (let i in eventsMonths) {

          data_Events.push(0)
        }

        for (let i in response.data) {
          for (let j in data_Events) {
            if (((parseInt(response.data[i].date.substring(5)) - 1)) == j) {
              data_Events[j] = response.data[i].events
            }
          }
        }
        setDataEvents(data_Events)} 
        else{
          
          setCategoriesEvents([]);
          setDataEvents([]);


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
        <div style={{ margin: '10px', display: 'flex', flexDirection: 'row', justifyContent: 'center', width: '100%' }}>
          <div style={{ marginRight: '90px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: 300 }}>
            Desde:
            <DatePicker
              shouldDisableDate={isDateValid}
              value={initialDate}
              onChange={handleChangeInitialDate}
              slotProps={{ textField: { size: 'small' } }}
            />
          </div>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: 300 }}>
            Hasta:
            <DatePicker
              shouldDisableDate={isDateValid}
              value={finalDate}
              onChange={handleChangeFinalDate}
              slotProps={{ textField: { size: 'small' } }}
            />
          </div>
        </div>

        <Grid container style={{ padding: '10px', paddingTop: 0, paddingBottom: 0 }} justifyContent={'center'} rowSpacing={1} columnSpacing={{ xs: 0.5, sm: 1, md: 1 }}>
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
          {console.log('en el pie =>',dataAttendances)}
            <Paper style={{ position: 'relative', padding: "5px", color: 'grey' }} elevation={3}>
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

          <Grid item xs={6} s>
            <Paper style={{ padding: "5px", color: 'grey' }} elevation={3}>
              <HighchartsReact
                options={{
                  chart: {
                    scrollablePlotArea: {
                      minWidth: 700
                    },
                    height: 310
                  },

                  data: [],

                  title: { text: 'Denuncias a lo largo del tiempo' },

                  xAxis: {
                    tickInterval: 7 * 24 * 3600 * 1000, // one week
                    tickWidth: 0,
                    gridLineWidth: 1,
                    labels: {
                      align: 'left',
                      x: 3,
                      y: -3
                    }
                  },

                  yAxis: [{ // left y axis
                    title: {
                      text: null
                    },
                    labels: {
                      align: 'left',
                      x: 3,
                      y: 16,
                      format: '{value:.,0f}'
                    },
                    showFirstLabel: false
                  }, { // right y axis
                    linkedTo: 0,
                    gridLineWidth: 0,
                    opposite: true,
                    title: {
                      text: null
                    },
                    labels: {
                      align: 'right',
                      x: -3,
                      y: 16,
                      format: '{value:.,0f}'
                    },
                    showFirstLabel: false
                  }],

                  tooltip: {
                    shared: true,
                    crosshairs: true
                  },

                  series: [{
                    name: 'Denuncias',
                    lineWidth: 3,
                    marker: {
                      radius: 4
                    }
                  }, {
                    name: 'Suspensiones'
                  }]
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
