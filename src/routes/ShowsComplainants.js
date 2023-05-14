import * as React from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import CardComplainants from '../components/CardComplainants';
import { useEffect, useState } from 'react';
import Navbar from '../components/NavBar';
import swal from 'sweetalert2';
import { Button, Grid } from '@mui/material';
import { Height } from '@material-ui/icons';
import data from '../data/dataComplainants'
import Typography from '@mui/material/Typography';
import axios from '../api/axios';


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

  const [complainants, setComplainants] = useState([]);



  const loadComplaints = async () => {
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
        url: `/admin/complaints`,
        headers: headers,
      });

      const promises = response.data.map(async (item, index) => {
        const eventObj = response_2.data.find(
          (event) => event.Event.id === item.id
        );

        if (eventObj) {
          const event = {
            email: eventObj.User.email,
            name: eventObj.User.name,
            numberComplaints: item.denounce,
            state: eventObj.User.suspended,

          };
          return event;
        }
      });

      const events = await Promise.all(promises);
      load.push(...events);
      setComplainants(load);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {


    loadComplaints();
  }, []);


  const [searchText, setSearchText] = React.useState('');
  const [rowsPerPage, setRowsPerPage] = React.useState(10);



  const handleEnable = (e, row) => {
   
    let token_user;
    if (!window.localStorage.getItem("token")) {
      console.log("no autorizado");
      window.location.href = "/home";
      return;
    } else {
      token_user = window.localStorage.getItem("token");
    }
    console.log(token_user)

    const headers = {
      accept: "application/json",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Credentials": true,
      "Access-Control-Allow-Headers": "*",
      Authorization: "Bearer " + token_user,
    };

    try {
      const response = axios({
        method: "post",
        url: `/admin/user/enable?email=${row.email}`,
        headers: headers,
      });
      window.location.href = '/complainants'



    } catch (error) {
      console.log(error);
    }

  };

  const handleSuspend = (e, row) => {
    console.log('entro')

    let token_user;
    if (!window.localStorage.getItem("token")) {
      console.log("no autorizado");
      window.location.href = "/home";
      return;
    } else {
      token_user = window.localStorage.getItem("token");
    }
    console.log(token_user)

    const headers = {
      accept: "application/json",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Credentials": true,
      "Access-Control-Allow-Headers": "*",
      Authorization: "Bearer " + token_user,
    };

    try {
      const response = axios({
        method: "post",
        url: `/admin/user/suspend?email=${row.email}`,
        headers: headers,
      });

      window.location.href = '/complainants'



    } catch (error) {
      console.log(error);
    }

  };


  const handleSearchChange = (event) => {
    setSearchText(event.target.value);
  };


  const handleRowsPerPageChange = (event) => {
    setRowsPerPage(event.target.value);
  };


  const filteredData = complainants.filter((row) =>
    row.name.toLowerCase().includes(searchText.toLowerCase())
  );

  const handleBack = () => {

    window.history.back();
  }



  return (
    <div>
      <Navbar />
      <Typography variant="h6" component="div" sx={{ marginLeft: '550px', color: 'black', fontSize: 24, fontWeight: 700, mb: 2, marginTop: '20px' }}>
        Ranking de usuarios denunciantes
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
                label="Buscar por usuario"
                variant="outlined"
                value={searchText}
                onChange={handleSearchChange}
              />
            </div>

            <Grid sx={{ maxHeight: '700px', overflowY: 'scroll' }}>
              <Table sx={{ minWidth: 700 }} aria-label="customized table">

                <TableHead>
                  <TableRow>
                    <StyledTableCell> Nombre Usuario</StyledTableCell>
                    <StyledTableCell align="right">Cantidad de denuncias</StyledTableCell>
                    <StyledTableCell align="right">Estado del usuario</StyledTableCell>
                    <StyledTableCell align="center">Opciones</StyledTableCell>
                  </TableRow>
                </TableHead>

                {(complainants && complainants.length > 0) ?
                  (
                    <TableBody>
                      {filteredData
                        .slice(0, rowsPerPage)
                        .map((row) => (
                          <StyledTableRow key={row.name}>
                            <StyledTableCell component="th" scope="row">
                              {row.name}
                            </StyledTableCell>
                            <StyledTableCell align="right">
                              {row.numberComplaints}
                            </StyledTableCell>
                            <StyledTableCell align="right">
                              {row.state === false ? "Habilitado" : "Suspendido"}
                            </StyledTableCell>
                            <StyledTableCell align="center">
                              {row.state === false ? (
                                <Button aria-label="suspender" onClick={(e) => handleSuspend(e, row)}>
                                  SUSPENDER
                                </Button>
                              ) : (
                                <Button aria-label="habilitar" onClick={(e) => handleEnable(e, row)}>
                                  HABILITAR
                                </Button>
                              )}
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
                        NO HAY USUARIOS
                      </StyledTableCell>
                    </StyledTableRow>
                  )}
              </Table>
            </Grid>

          </TableContainer>
        </Paper>
      </Grid>
      <Grid container sx={{ display: 'flex', marginLeft: '20px', alignItems: 'center', textAlign: 'center' }} >
        <Button onClick={() => { handleBack() }} sx={{
          fontFamily: "'Circular Std', Arial, sans-serif", justifyContent: 'center',
          fontSize: 14, fontWeight: 700, color: '#fff', backgroundColor: '#1286f7', borderRadius: 2, px: 2, py: 1, '&:hover': { backgroundColor: '#1c1c1c' }
        }}>
          Volver
        </Button>
      </Grid>
    </div>
  );
}
