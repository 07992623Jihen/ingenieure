import React, { useState, useEffect } from "react";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import { Container, Row, Col, Image } from "react-bootstrap";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import UpdateIcon from "@material-ui/icons/Update";
import AddIcon from "@material-ui/icons/Add";
import Fab from "@material-ui/core/Fab";
import Tooltip from "@material-ui/core/Tooltip";
import { Link } from "react-router-dom";
import ErrorModel from "../model/error-model";
import SuccessModel from "../model/success-model";
import TablePagination from '@material-ui/core/TablePagination';
import {useParams} from 'react-router-dom'


const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
  fab: {
    margin: theme.spacing(2),
  },
  absolute: {
    position: "absolute",
    bottom: theme.spacing(2),
    right: theme.spacing(3),
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);

const useStyles = makeStyles({
  table: {
    minWidth: 700,
  },
});



export default function ListeHerbicide() {
  const classes = useStyles();

  const [list, setList] = useState();
  const [error, seterror] = useState(null);
  const [success, setsuccess] = useState(null);

  const id = useParams().id

  useEffect(() => {
    const sendRequest = async () => {
      try {
        const response = await fetch(
          `http://localhost:5000/api/herbicide/mauvaiseHerbe/${id}`
        );

        const responseData = await response.json();
        if (!response.ok) {
          throw new Error(responseData.message);
        }

        setList(responseData.herbicides);
      } catch (err) {
        seterror(err.message);
      }
    };

    sendRequest();
  }, []);

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <Container>
      <Row>
        <Col></Col>
        <Col xs={9}>
          <ErrorModel error={error} />
          <SuccessModel success={success} />
          <div style={{ marginBlock: "20px" }}>
            <Link to={`/ajoutHerbicide/${id}`}>
              <Tooltip title="Ajout herbicide" aria-label="add">
                <Fab color="primary" className={classes.fab}>
                  <AddIcon />
                </Fab>
              </Tooltip>
            </Link>
          </div>

          <TableContainer component={Paper}>
            <Table className={classes.table} aria-label="customized table">
              <TableHead>
                <TableRow>
                 
                  <StyledTableCell align="right">Nom</StyledTableCell>
                  <StyledTableCell align="right">Mati??re actif</StyledTableCell>
                  <StyledTableCell align="right">Dose Par Hectare</StyledTableCell>
                  <StyledTableCell align="right">Stade d'intervention</StyledTableCell>
                  <StyledTableCell align="right">Action</StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {list &&
                  list.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => (
                    <StyledTableRow key={row._id}>
                      <StyledTableCell align="right">{row.nom}</StyledTableCell>
                      <StyledTableCell align="right">
                        {row.matiere}
                      </StyledTableCell>
                      <StyledTableCell align="right">
                        {row.dose}
                      </StyledTableCell>
                      <StyledTableCell align="right">
                        {row.stade}
                      </StyledTableCell>

                      <StyledTableCell align="right">
                        <DeleteForeverIcon
                          color="secondary"
                          onClick={async (event) => {
                            try {
                              let response = await fetch(
                                `http://localhost:5000/api/herbicide/${row._id}`,
                                {
                                  method: "DELETE",
                                  headers: {
                                    "Content-Type": "application/json",
                                  },
                                }
                              );
                              let responsedata = await response.json();
                              if (!response.ok) {
                                throw new Error(responsedata.message);
                              }
                              setList(
                                list.filter((item) => item._id !== row._id)
                              );
                              setsuccess("Herbicide bien supprimer");
                            } catch (err) {
                              console.log(err);
                              seterror(err.message || "il y a un probleme");
                            }
                          }}
                        />
                        <Link to={`/update-herbicide/${row._id}`}>
                          <UpdateIcon style={{ color: "green" }} />
                        </Link>
                      </StyledTableCell>
                    </StyledTableRow>
                  ))}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
          rowsPerPageOptions={[10]}
          component="div"
          count={list && list.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
        />
        </Col>
        <Col></Col>
      </Row>
    </Container>
  );
}
