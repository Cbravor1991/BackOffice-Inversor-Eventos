import * as React from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import { useEffect, useState } from 'react';
import Navbar from '../components/NavBar';
import { Button, Grid } from '@mui/material';
import Typography from '@mui/material/Typography';
import axios from '../api/axios';
import { Link } from 'react-router-dom';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';
import moment from "moment";


const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: '#1286f7',
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));


const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));


export default function ShowsComplainants() {

  const [organizers, setOrganizers] = useState([]);
  const [initialDate, setInitialDate] = useState('2023-04-01');

  let today = moment().add(1, 'days').format('YYYY-MM-DD');
  const [finalDate, setFinalDate] = useState(today);

  


  const loadOrganizers = async () => {
    console.log(initialDate)
    console.log(finalDate)
    const load = [];

    let token_user;
    if (!window.localStorage.getItem("token")) {
      console.log("no autorizado");
      window.location.href = "/home";
      return;
    } else {
      token_user = window.localStorage.getItem("token");
    }

    const headers = {
      accept: "application/json",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Credentials": true,
      "Access-Control-Allow-Headers": "*",
      Authorization: "Bearer " + token_user,
    }
    const params= {
      "init_date":initialDate,
      "end_date": finalDate ,
    };

    try {
      const response = await axios({
        method: "get",
        url: "/admin/events/organizers/ranking",
        headers: headers,
        params: params,
 
      });

      const response_2 = await axios({
        method: "get",
        url: "/admin/attendances/organizers/ranking",
        headers: headers,
        params: params,
      });

      const processedUsers = new Set(); // Variable para realizar un seguimiento de los usuarios procesados

      const promises = response.data.map(async (item, index) => {
        if (!processedUsers.has(item.organizer_email)) { // Verificar si el usuario ya ha sido procesado
          processedUsers.add(item.organizer_email); // Marcar el usuario como procesado

          const matchingComplaints = response_2.data.filter(
            (item_2) => item.organizer_email === item_2.organizer_email,
       
          );

          if (matchingComplaints.length > 0) {
            const event = {
              organizer_email: item.organizer_email,
              amount: item.amount,
              attendances: matchingComplaints[0].attendances,
          
            };

            load.push(event);
          }
        }
      });

      await Promise.all(promises); // Esperar a que se completen todas las promesas 

      setOrganizers(load);
    
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (!window.localStorage.getItem("token") || window.localStorage.getItem("token") === '') {
      console.log("no autorizado");
      window.location.href = "/home";
      return;
    }
    loadOrganizers();
  }, []);


  const [searchText, setSearchText] = React.useState('');
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [sortingColumn, setSortingColumn] = useState('events');
  const [sortingDirection, setSortingDirection] = useState('desc');

  const handleSearchChange = (event) => {
    setSearchText(event.target.value);
  };

  const handleSortingColumnChange = (event) => {
    setSortingColumn(event.target.value);
  };

  const handleRowsPerPageChange = (event) => {
    setRowsPerPage(event.target.value);
  };

  const sortedData = [...organizers];
  sortedData.sort((a, b) => {
    if (sortingColumn === 'events') {
      return sortingDirection === 'asc' ? a.amount - b.amount : b.amount - a.amount;
    } else if (sortingColumn === 'people') {
      return sortingDirection === 'asc' ? a.attendances - b.attendances : b.attendances - a.attendances;
    }
    return 0;
  });

  const filteredData = sortedData.filter((row) =>
    row.organizer_email.toLowerCase().includes(searchText.toLowerCase())
  );

  return (
    <div>
      <Navbar />
      <Typography variant="h6" component="div" sx={{ marginLeft: '550px', color: 'black', fontSize: 24, fontWeight: 700, mb: 2, marginTop: '20px' }}>
        Ranking de organizadores
      </Typography>
      <Grid sx={{ display: 'flex', justifyContent: 'center', padding: '20px' }}>
        <Paper sx={{ width: '100%' }} elevation={5}>
          <TableContainer component={Grid}>
            <div>
            <FormControl sx={{ m: 1, minWidth: 120 }}>
                <InputLabel id="demo-simple-select-label">Mostrar</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={rowsPerPage}
                  label="Mostrar"
                  onChange={handleRowsPerPageChange}
                >
                  <MenuItem sx={{ color: 'black' }} value={5}>5</MenuItem>
                  <MenuItem sx={{ color: 'black' }} value={10}>10</MenuItem>
                  <MenuItem sx={{ color: 'black' }} value={25}>25</MenuItem>
                </Select>
              </FormControl>

              <TextField
                sx={{ m: 1, width: '30ch' }}
                label="Buscar por organizador"
                variant="outlined"
                value={searchText}
                onChange={handleSearchChange}
              />

               <FormControl sx={{ m: 1, minWidth: 120 }}>
        <InputLabel id="demo-simple-select-label">Ordenar por</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={sortingColumn}
          label="Ordenar por"
          onChange={handleSortingColumnChange}
        >
          <MenuItem sx={{ color: 'black' }} value={'events'}>Eventos creados</MenuItem>
          <MenuItem sx={{ color: 'black' }} value={'people'}>Acreditaciones</MenuItem>
        </Select>
      </FormControl>
    

            </div>

            <Grid sx={{ maxHeight: '700px', overflowY: 'scroll' }}>
              <Table sx={{ minWidth: 700 }} aria-label="customized table">

                <TableHead>
                  <TableRow>
                    <StyledTableCell> Mail</StyledTableCell>
                    <StyledTableCell align="center">Cantidad de eventos</StyledTableCell>
                    <StyledTableCell align="center">Cantidad de acreditaciones</StyledTableCell>
                  </TableRow>
                </TableHead>

                {(organizers && organizers.length > 0) ?
                  (
                    <TableBody>
                      {filteredData
                        .slice(0, rowsPerPage)
                        .map((row) => (
                          <StyledTableRow key={row.organizer_email}>
                            <StyledTableCell component="th" scope="row">
                              {row.organizer_email}
                            </StyledTableCell>
                            <StyledTableCell align="center">
                              {row.amount}
                            </StyledTableCell>
                            <StyledTableCell align="center">
                              {row.attendances}
                            </StyledTableCell>
                          </StyledTableRow>
                        ))
                      }
                    </TableBody>
                  )
                  :
                  (
                    <StyledTableRow >
                      <StyledTableCell component="th" scope="row">
                        NO HAY ORGANIZADORES
                      </StyledTableCell>
                    </StyledTableRow>
                  )}
              </Table>
            </Grid>

          </TableContainer>
        </Paper>
      </Grid>
    </div>
  );
}
