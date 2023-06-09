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

  const loadOrganizers = async () => {
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
    };

    try {
      const response = await axios({
        method: "get",
        url: "/admin/complaints/users/ranking",
        headers: headers,
      });

      const response_2 = await axios({
        method: "get",
        url: "/admin/complaints",
        headers: headers,
      });

      const processedUsers = new Set(); // Variable para realizar un seguimiento de los usuarios procesados

      const promises = response.data.map(async (item, index) => {
        if (!processedUsers.has(item.id)) { // Verificar si el usuario ya ha sido procesado
          processedUsers.add(item.id); // Marcar el usuario como procesado

          const matchingComplaints = response_2.data.filter(
            (item_2) => item.id === item_2.Complaint.user_id
          );

          if (matchingComplaints.length > 0) {
            const event = {
              email: item.email,
              name: matchingComplaints[0].User.name,
              numberComplaints: item.denounce,
              state: item.suspended,
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
  const [sorting, setStorting] = React.useState('events');

  const handleSearchChange = (event) => {
    setSearchText(event.target.value);
  };

  const handleSortingChange = (event) => {
    setStorting(event.target.value);
  };

  const handleRowsPerPageChange = (event) => {
    setRowsPerPage(event.target.value);
  };

  const filteredData = organizers.filter((row) =>
    row.email.toLowerCase().includes(searchText.toLowerCase())
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
                  value={sorting}
                  label="Mostrar"
                  onChange={handleSortingChange}
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
                          <StyledTableRow key={row.name}>
                            <StyledTableCell component="th" scope="row">
                              {row.email}
                            </StyledTableCell>
                            <StyledTableCell align="center">
                              {row.events}
                            </StyledTableCell>
                            <StyledTableCell align="center">
                              {row.acreditaciones}
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
