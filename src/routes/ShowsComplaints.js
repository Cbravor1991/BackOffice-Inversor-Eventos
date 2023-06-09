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
import CardComplaints from '../components/CardComplaints';
import { useEffect, useState } from 'react';
import axios from '../api/axios';
import Navbar from '../components/NavBar';
import swal from 'sweetalert2';
import { Button, Grid } from '@mui/material';
import { Category, Height } from '@material-ui/icons';
import data from '../data/dataComplaints'
import Typography from '@mui/material/Typography';
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


export default function ShowsComplaints() {

  const [complainants, setComplainants] = useState([]);
  const [searchText, setSearchText] = React.useState('');
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  

  const handleLoadUserComplaints = async (e, row) => {

    const load = [];

    let token_user;
    if (!window.localStorage.getItem("token")) {
      console.log("no autorizado");
      window.location.href = "/home";
      return;
    } else {
      token_user = window.localStorage.getItem("token");
    }
    console.log(token_user);

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
        url: `/admin/event/complaints?event_id=${row.event_id_use}`,
        headers: headers,
      });

      const response_2 = await axios({
        method: "get",
        url: `/admin/complaints`,
        headers: headers,
      });

      const promises = response.data.map(async (item, index) => {
        const eventObj = response_2.data.find(
          (event) => event.User.id === item.user_id && event.Event.id === item.event_id
        );

        if (eventObj) {
          const event = {
            id_event: eventObj.Event.id,
            name: eventObj.Event.title,
            category: item.category,
            description: item.description,
            email:eventObj.User.email ,
         
          };
          return event;
        }
      });

      const events = await Promise.all(promises);
      load.push(...events);
      window.localStorage.setItem("userComplaints", JSON.stringify(load));

        window.location.href = "/eventUserCompalints";
    } catch (error) {
      console.log(error);
    }

}



  const handleViewClick = async (e, row) => {


    try {
      var options = {
        method: 'GET',
        url: `/admin/event?event_id=${row.event_id_use}`,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + window.localStorage.getItem("token")
        },
      };

      axios.request(options)
        //.then((response) => response.json())
        .then((response) => {
          console.log(response);
          if (response.length === 0) {
            console.log("No hay evento")
          }
          window.localStorage.setItem("cache_view", JSON.stringify(response.data));
          window.location.href = "/view";
        })

    } catch (error) {
      console.error(error);
    }

  }




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
    console.log(token_user);

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
        url: "/admin/complaints/events/ranking",
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
            event_id_use: eventObj.Event.id,
            title: eventObj.Event.title,
            category: eventObj.Event.category,
            state: eventObj.Event.state,
            denounce: item.denounce,
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
    if (!window.localStorage.getItem("token")) {
      console.log("no autorizado")
      window.location.href = "/home";
      return;
    }


    loadComplaints();
  }, []);

  const handleSearchChange = (event) => {
    setSearchText(event.target.value);
  };

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
        url: `/admin/event/enable?event_id=${row.event_id_use}`,
        headers: headers,
      });

      window.location.href = '/complaints'



    } catch (error) {
      console.log(error);
    }

  };

  const handleSuspend = (e, row) => {

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
        url: `/admin/event/suspend?event_id=${row.event_id_use}`,
        headers: headers,
      });

      window.location.href = '/complaints'



    } catch (error) {
      console.log(error);
    }

  };


  const handleRowsPerPageChange = (event) => {
    setRowsPerPage(event.target.value);
  };


  const filteredData = complainants.filter((row) =>
    row.title.toLowerCase().includes(searchText.toLowerCase())
  );


  const handleBack = () => {
    window.localStorage.setItem("userComplaints", null);
    window.history.back();
  }


  return (
    <div>
      <Navbar />
      <Typography variant="h6" component="div" sx={{ marginLeft: '650px', color: 'black', fontSize: 24, fontWeight: 700, mb: 2, marginTop: '20px' }}>
        Ranking de denuncias
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
              <FormControl sx={{ m: 1, minWidth: 120 }}>
                <InputLabel id="demo-simple-select-label">Fecha</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={rowsPerPage}
                  label="Mostrar"
                  onChange={handleRowsPerPageChange}
                >
                  <MenuItem sx={{ color: 'black' }} value={5}>Historicos</MenuItem>
                  <MenuItem sx={{ color: 'black' }} value={10}>Ultimos 30 dias</MenuItem>

                </Select>
              </FormControl>
              <TextField
                sx={{ m: 1, width: '30ch' }}
                label="Buscar por evento"
                variant="outlined"
                value={searchText}
                onChange={handleSearchChange}
              />
            </div>

            <Grid sx={{ maxHeight: '700px', overflowY: 'scroll' }}>
              <Table sx={{ minWidth: 700 }} aria-label="customized table">

                <TableHead>
                  <TableRow>
                    <StyledTableCell align="center"> Nombre</StyledTableCell>
                    <StyledTableCell align="center">Categoria</StyledTableCell>
                    <StyledTableCell align="center">Cantidad de denuncias</StyledTableCell>
                    <StyledTableCell align="center">Estado</StyledTableCell>
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
                            <StyledTableCell align="center" component="th" scope="row">
                              <Link to="#" onClick={(e) => handleViewClick(e, row)}>
                                {row.title}
                              </Link>
                            </StyledTableCell>
                            <StyledTableCell align="center" component="th" scope="row">
                              {row.category}
                            </StyledTableCell>
                            <StyledTableCell align="center" component="th" scope="row">
                              <Link to="#" onClick={(e) => handleLoadUserComplaints(e, row)}>
                                {row.denounce}
                              </Link>
                            </StyledTableCell>
                            <StyledTableCell align="center" component="th" scope="row">
                              {row.state === "published" ? "Publicado" : "Suspendido"}
                            </StyledTableCell>

                            <StyledTableCell align="center">
                              {row.state === "published" ? (
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
                        NO HAY EVENTOS DENUNCIADOS
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
