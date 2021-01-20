import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

function AuthTable({ fireApp, user }) {
  const classes = useStyles();
  const [authInfo, setAuthInfo] = useState([])
  // const [userInfo, setUser] = useState(user||'');
  console.log(user);

  //데이터싱크 
  useEffect(() => {
    fireApp.onAuth((e) => {
      const cf = { f1:(p)=> {setAuthInfo([p]) }, f2:()=> {setAuthInfo({}) } }
      if (e) {fireApp.authdataSync('auth', cf); }
      else { console.log('no-User') }
    })
  }, []);
  
  return (
    <TableContainer component={Paper}>
      <h2 style={{ padding: '20px' }}>회원관리</h2>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell  align="center">이름</TableCell>
            <TableCell  align="center">email</TableCell>
            <TableCell  align="center">password</TableCell>
            <TableCell  align="center">조력자ID</TableCell>
            <TableCell  align="center">level&nbsp;(등급)</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {authInfo.length>0 && authInfo[0].map((e) => {
            // if(!e.level){return} 회원검색 코드
            return(
            <TableRow key={e.name}>
              <TableCell component="th" scope="row"  align="center">
                {e.name}
              </TableCell>
              <TableCell align="center">{e.email}</TableCell>
              <TableCell align="center">{e.pass}</TableCell>
              <TableCell align="center">{e.follow}</TableCell>
              <TableCell align="center">{e.level}</TableCell>
            </TableRow>
            )
            }
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default AuthTable;