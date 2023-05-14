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
import dataTipoDenuncias from '../data/dataTipoDenuncias'


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


export default function MadeComplainantsUsers() {

let event = JSON.parse(window.localStorage.getItem("userComplaints"));  


  const [complainants, setComplainants] = useState (event);
 





  const [searchText, setSearchText] = React.useState('');
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleBack = () => {
    window.localStorage.setItem("userComplaints", null);
    window.history.back();
  }
  
 


  const handleSearchChange = (event) => {
    setSearchText(event.target.value);
  };


  const handleRowsPerPageChange = (event) => {
    setRowsPerPage(event.target.value);
  };




  return (
      <div>
        <Navbar />
        <Typography variant="h6" component="div" sx={{ marginLeft: '450px', color: 'black', fontSize: 24, fontWeight: 700, mb: 2, marginTop: '20px' }}>
        Denuncias al evento
      </Typography>
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
                  label="Buscar por categoria"
                  variant="outlined"
                  value={searchText}
                  onChange={handleSearchChange}
                />
              </div>

              <Grid sx={{ maxHeight: '700px', overflowY: 'scroll'}}>
                <Table sx={{ minWidth: 700 }} aria-label="customized table">

                  <TableHead>
                    <TableRow>
                      <StyledTableCell align="center"> Categoria denuncia</StyledTableCell>
                      <StyledTableCell align="left">Descripción</StyledTableCell>
                      
                    </TableRow>
                  </TableHead>

                  {(complainants && complainants.length > 0) ? 
                  (
                    <TableBody>
                      {complainants
                        .map((row) => (
                          <StyledTableRow key={row.category}>
                            <StyledTableCell align="center" component="th" scope="row">
                              {row.category}
                            </StyledTableCell>
                            <StyledTableCell align="left">
                              {row.description}
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
