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


export default function ShowsComplainants(dataTopEvents) {

  const [organizers, setOrganizers] = useState([]);
  const [initialDate, setInitialDate] = useState();

  let today = moment().format('YYYY-MM-DD');
  const [finalDate, setFinalDate] = useState();

  


  const loadOrganizers = async (datos) => {

    
   
    
      if(datos.dataTopEvents.length>0){
        console.log('entro')

      setOrganizers(datos.dataTopEvents);
      }
    
    
  };

  useEffect(() => {
    if (!window.localStorage.getItem("token") || window.localStorage.getItem("token") === '') {
      console.log("no autorizado");
      window.location.href = "/home";
      return;
    }
    loadOrganizers(dataTopEvents);
  }, [initialDate,finalDate]);


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
      return sortingDirection === 'desc' ? a.amount - b.amount : b.amount - a.amount;
    }
    return 0;
  });

  const filteredData = sortedData.filter((row) =>
    row.organizer_email.toLowerCase().includes(searchText.toLowerCase())
  );

  return (
    <div>
     
      <Typography variant="h6" component="div" sx={{ marginLeft: '160px', color: 'black', fontSize: 24, fontWeight: 700, mb: 2, marginTop: '20px' }}>
      Ranking organizadores por eventos
      </Typography>
      <Grid sx={{ display: 'flex', justifyContent: 'center' }}>
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
          <MenuItem sx={{ color: 'black' }} value={'events'}>Mayor cantidad de eventos</MenuItem>
          <MenuItem sx={{ color: 'black' }} value={'people'}>Menor cantidad de eventos</MenuItem>
        </Select>
      </FormControl>
    

            </div>

            <Grid sx={{ maxHeight: '700px', overflowY: 'scroll' }}>
              <Table sx={{ minWidth: 700 }} aria-label="customized table">

                <TableHead>
                  <TableRow>
                    <StyledTableCell align="center"> Mail</StyledTableCell>
                    <StyledTableCell align="center">Cantidad de eventos</StyledTableCell>
                  </TableRow>
                </TableHead>

                {(organizers && organizers.length > 0) ?
                  (
                    <TableBody>
                      {filteredData
                        .slice(0, rowsPerPage)
                        .map((row) => (
                          <StyledTableRow key={row.organizer_email}>
                            <StyledTableCell align="center" component="th" scope="row">
                              {row.organizer_email}
                            </StyledTableCell>
                            <StyledTableCell align="center">
                              {row.amount}
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
