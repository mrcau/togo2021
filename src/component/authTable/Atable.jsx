import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Paper from '@material-ui/core/Paper';
import IconButton from '@material-ui/core/IconButton';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
import DeleteIcon from '@material-ui/icons/Delete';

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {   return -1; }
  if (b[orderBy] > a[orderBy]) {   return 1;  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

const headCells = [
  { id: 'name', numeric: false, disablePadding: true, label: 'name' },
  { id: 'email', numeric: true, disablePadding: false, label: 'email' },
  { id: 'pass', numeric: true, disablePadding: false, label: 'pass' },
  { id: 'follow', numeric: true, disablePadding: false, label: 'follow' },
  { id: 'level', numeric: true, disablePadding: false, label: 'level' },
];

function EnhancedTableHead(props) {
  const { classes, order, orderBy, onRequestSort } = props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
       {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? 'center' : 'right'}
            padding={headCell.disablePadding ? 'none' : 'default'}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : 'asc'}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <span className={classes.visuallyHidden}>
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </span>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

EnhancedTableHead.propTypes = {
  classes: PropTypes.object.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  order: PropTypes.oneOf(['asc', 'desc']).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
};

const useStyles = makeStyles((theme) => ({
  root: { width: '100%' },
  paper: { width: '100%' },
  table: { minWidth: 300 },
  visuallyHidden: { border: 0, clip: 'rect(0 0 0 0)', height: 1,
   margin: -1, overflow: 'hidden',  padding: 0, position: 'absolute',  top: 20, width: 1,},
}));

function Atable({fireApp,user}) {
  const classes = useStyles();
  const [order, setOrder] = React.useState('asc');
  const [orderBy, setOrderBy] = React.useState('calories');
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [authInfo, setAuthInfo] = useState({})
  const folder = "auth";
  
  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

 //데이터싱크 
 useEffect(() => {
  fireApp.onAuth((e) => {
    const cf = { f1:(p)=> {setAuthInfo(p) }, f2:()=> {setAuthInfo({}) } }
    if (e) {fireApp.authdataSync(folder,cf); }
    else { console.log('no-User') }
  })
}, [fireApp]);

// 레벨업
const levelUp =(uid) => { fireApp.level(folder,uid,1); }
const levelDown =(uid) => { fireApp.level(folder,uid,0); }
const authDel = (uid) => { fireApp.authDel(folder,uid)}
  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <TableContainer>
          <Table
            className={classes.table}
            aria-labelledby="tableTitle"
            size='small'
            aria-label="enhanced table"
          >
            <EnhancedTableHead
              classes={classes}
              order={order}
              orderBy={orderBy}
              onRequestSort={handleRequestSort}
              rowCount={Object.values(authInfo).length}
            />
            <TableBody>
              {stableSort(Object.values(authInfo), getComparator(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row) => {
                  return (
                    <TableRow key={row.name} >
                      <TableCell align="right" component="th"  padding="none">
                        {row.name}
                      </TableCell>
                      <TableCell align="center">{row.email}</TableCell>
                      <TableCell align="center">{row.pass}</TableCell>
                      <TableCell align="center">{row.follow}</TableCell>
                      {/* <TableCell align="center">{row.level}</TableCell> */}
                      <TableCell align="center">
                        <IconButton  size="small" style={{width:'25px'}} onClick={()=>levelUp(row.user)} >
                          < ArrowUpwardIcon fontSize="inherit"/>
                        </IconButton>
                        {row.level}
                        <IconButton  size="small" style={{width:'25px'}} onClick={()=>levelDown(row.user)} >
                          <ArrowDownwardIcon fontSize="inherit"/>
                        </IconButton>
                      </TableCell>
                      <TableCell align="center">
                        <IconButton size="small" style={{width:'25px'}} onClick={()=>authDel(row.user)}>
                          <DeleteIcon fontSize="inherit" />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  );
                })}

            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 15]}
          component="div"
          count={Object.values(authInfo).length}
          rowsPerPage={rowsPerPage}
          page={page}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
        />
      </Paper>
    </div>
  );
}

export default Atable