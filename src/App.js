import React, { Component } from 'react';
import './App.css';
import Customer from './components/Customer';

import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing.unit * 3,
    overflowX: "auto"
  },
  table: {
    minWidth: 1080
  }
})

const customers = [
  {
  'id': 1,
  'image': 'https://placeimg.com/64/64/1',
  'name': '신현석',
  'birthday': '19960525',
  'gender': '남',
  'job': '대학생',
  'major': '아주대 소프트웨어'
  },
  {
  'id': 2,
  'image': 'https://placeimg.com/64/64/2',
  'name': '신현석인데요?',
  'birthday': '19971101',
  'gender': '남',
  'job': 'sk회사원',
  'major': '아주대 기계공'
  },
  {
  'id': 3,
  'image': 'https://placeimg.com/64/64/3',
  'name': '신현석이라는 것...',
  'birthday': '20000218',
  'gender': '남',
  'job': '삼성직원',
  'major': '아주대 전자공'
}]

class App extends Component{
  render() {
    const { classes } = this.props;
    return (
      <Paper className={classes.root}>
        <Table className={classes.table}>
          <TableHead>
            <TableRow>
              <TableCell>번호</TableCell>
              <TableCell>이미지</TableCell>
              <TableCell>이름</TableCell>
              <TableCell>생년월일</TableCell>
              <TableCell>성별</TableCell>
              <TableCell>직업</TableCell>
              <TableCell>전공</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            { // *주의
              customers.map(customer => {
                return(
                  <Customer
                    key={customer.id} // map으로 다수의 정보 출력시 key 이름의 props 설정 필요
                    id={customer.id}
                    image={customer.image}
                    name={customer.name}
                    birthday={customer.birthday}
                    gender={customer.gender}
                    job={customer.job}
                    major={customer.major}
                  />
                ) 
              })
            }      
            </TableBody>
        </Table>
      </Paper>
    );
  }
}

export default withStyles(styles)(App);
