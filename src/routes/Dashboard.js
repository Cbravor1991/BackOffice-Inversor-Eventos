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
  const [categoriesComplaints, setCategoriesComplaints] = useState([]);
  let dateCategories;
  const [dateGrapics, setDateGrapics] = useState([]);
  const [dataComplaints, setDataComplaints] = useState([]);
  const [dataSuspensions, setDataSuspensions] = useState([]);
  const [graphSize, setGraphSize] = useState((window.innerHeight - 180.5) / 2);

  console.log(window.localStorage.getItem("token"));


  const verifyMonth = async (month) => {
    let target;

    const months_ = [
      'ene', 'feb', 'mar', 'abr', 'may', 'jun',
      'jul', 'ago', 'sep', 'oct', 'nov', 'dic'
    ];


    if (month >= 1 && month <= 12) {
      target = months_[month - 1];
      console.log('el taget es =>', target)


    } else {
      return 'Invalid month';
    }

    for (let i in dateCategories) {
      if (target == dateCategories[i]) {
        console.log('encontro')
        return i;
      }
    }

  }





  const chargeDate = async () => {
    const months = [
      'ene', 'feb', 'mar', 'abr', 'may', 'jun',
      'jul', 'ago', 'sep', 'oct', 'nov', 'dic'
    ];

    const initialMonth = parseInt(initialDate.format('MM'));
    const initialYear = parseInt(initialDate.format('YYYY'));
    const finalMonth = parseInt(finalDate.format('MM'));
    const finalYear = parseInt(finalDate.format('YYYY'));

    const categories = new Set();

    if (initialYear === finalYear) {
      for (let month = initialMonth; month <= finalMonth; month++) {
        const monthName = months[month - 1];
        categories.add(monthName);
      }
    } else {
      for (let year = initialYear; year <= finalYear; year++) {
        const startMonth = (year === initialYear) ? initialMonth : 1;
        const endMonth = (year === finalYear) ? finalMonth : 12;

        for (let month = startMonth; month <= endMonth; month++) {
          const monthName = months[month - 1];
          categories.add(monthName);
        }
      }
    }

    const uniqueCategories = Array.from(categories);

    dateCategories = uniqueCategories;
    setDateGrapics(uniqueCategories);

  };









  const fetchDataState = async () => {


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
      .then(async function (response) {


        if (response.data.length > 0) {



          for (let i in dateCategories) {

            data_Attendances.push(0)
          }



          for (let i in response.data) {
            if (await verifyMonth((parseInt(response.data[i].date.substring(5)))) >= 0) {
              let position = await verifyMonth((parseInt(response.data[i].date.substring(5))));

              data_Attendances[position] = data_Attendances[position] + response.data[i].attendances

            }


          }




          setDataAttendances(data_Attendances)
        }
        else {

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

    await axios(options)
      .then(async function (response) {
        if (response.data.length > 0) {


          for (let i in dateCategories) {

            data_Events.push(0)
          }

          for (let i in response.data) {
            if (await verifyMonth((parseInt(response.data[i].date.substring(5)))) >= 0) {
              let position = await verifyMonth((parseInt(response.data[i].date.substring(5))));

              data_Events[position] = data_Events[position] + response.data[i].events

            }
          }

          setDataEvents(data_Events)
        }
        else {

          setCategoriesEvents([]);
          setDataEvents([]);


        }
      })
  };


  const fetchDataComplaints = async () => {

    const data_Complaints = []
    var options = {
      method: 'GET',
      url: '/admin/complaints/statistics/distribution',
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
      .then(async function (response) {

        if (response.data.length > 0) {
          for (let i in dateCategories) {

            data_Complaints.push(0)
          }
          for (let i in response.data) {
            if (await verifyMonth((parseInt(response.data[i].date.substring(5)))) >= 0) {
              let position = await verifyMonth((parseInt(response.data[i].date.substring(5))));

              data_Complaints[position] = data_Complaints[position] + response.data[i].complaints

            }


          }
          setDataComplaints(data_Complaints)
        }
        else {
          setDataComplaints([]);
        }
      })
  };

  const fetchDataSuspension = async () => {

    const data_Suspension = []
    var options = {
      method: 'GET',
      url: '/admin/suspensions/statistics/distribution',
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
      .then(async function (response) {
        console.log('suspendido=>', response)


        if (response.data.length > 0) {

          for (let i in dateCategories) {

            data_Suspension.push(0)
          }
          for (let i in response.data) {
            if (await verifyMonth((parseInt(response.data[i].date.substring(5)))) >= 0) {
              let position = await verifyMonth((parseInt(response.data[i].date.substring(5))));

              data_Suspension[position] = data_Suspension[position] + response.data[i].suspensions

            }


          }
          setDataSuspensions(data_Suspension)
        }
        else {


          setDataSuspensions([]);


        }
      })
  };


  const isDateValid = (date) => {
    const currentDate = new Date();
    return date && date.isAfter(currentDate, 'day');
  };


  const handleChangeInitialDate = (date) => {
    setInitialDate(date);

  }


  const handleChangeFinalDate = (date) => {
    setFinalDate(date);

  }

  const handleResize = () => {
    setGraphSize((window.innerHeight - 180.5) / 2);
  };

  useEffect(() => {
    chargeDate();
    fetchDataState();
    fetchDataAttendances();
    fetchDataEvents();
    fetchDataComplaints();
    fetchDataSuspension();

    window.addEventListener('resize', handleResize);
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
                    height: graphSize,
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
              <HighchartsReact
                options={{
                  chart: { type: 'column', height: graphSize },
                  title: { text: 'Acreditaciones a lo largo del tiempo' },
                  xAxis: {
                    categories: dateGrapics
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
                  chart: { type: 'line', height: graphSize },
                  title: { text: 'Eventos a lo largo del tiempo' },
                  series: [{
                    name: 'Eventos',
                    data: dataEvents
                  }],
                  xAxis: {
                    categories: dateGrapics,
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
                    height: graphSize
                  },
                  title: { text: 'Denuncias a lo largo del tiempo' },
                  xAxis: {
                    categories: dateGrapics, // Nombres de los meses
                    tickWidth: 0,
                    gridLineWidth: 1,
                    labels: {
                      align: 'left',
                      x: 3,
                      y: -3
                    }
                  },
                  yAxis: [{
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
                  }, {
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
                    data: dataComplaints, // Ejemplo de datos de prueba
                    lineWidth: 3,
                    marker: {
                      radius: 4
                    }
                  }, {
                    name: 'Suspensiones',
                    data: [0, 0, 3] // Ejemplo de datos de prueba
                    //data: dataSuspensions
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
