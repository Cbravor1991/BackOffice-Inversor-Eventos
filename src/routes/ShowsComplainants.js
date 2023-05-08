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



  const loadComplainants = () => {
    setComplainants(data)
    
  }

  useEffect(() => {
   

    loadComplainants();
  }, []);


  const [searchText, setSearchText] = React.useState('');
  const [rowsPerPage, setRowsPerPage] = React.useState(10);


 


  const handleSearchChange = (event) => {
    setSearchText(event.target.value);
  };


  const handleRowsPerPageChange = (event) => {
    setRowsPerPage(event.target.value);
  };


  const filteredData = complainants.filter((row) =>
    row.name.toLowerCase().includes(searchText.toLowerCase())
  );


  return (
      <div>
        <Navbar />
        <CardComplainants />
        <Grid sx={{ display: 'flex', justifyContent: 'center', padding: '20px' }}>
          <Paper sx={{  width: '100%' }} elevation={5}>
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

              <Grid sx={{ maxHeight: '700px', overflowY: 'scroll'}}>
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
                              {row.state}
                            </StyledTableCell>
                            <StyledTableCell align="center">
                              <Button aria-label="ver"  >
                                VER EVENTOS DENUNCIADOS
                              </Button>
                              <Button aria-label="editar" >
                                SUSPENDER/HABILITAR
                              </Button>
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
      </div>
  );
}
