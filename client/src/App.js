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
import CircularProgress from '@material-ui/core/CircularProgress';

const styles = theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing(3),
    overflowX: "auto"
  },
  table: {
    minWidth: 1080
  },
  progress: {
    marginTop: theme.spacing(2),
  }
})

const databaseURL = "https://management-cloud-default-rtdb.firebaseio.com";

class App extends Component{

  state={
    customers:"",
    completed:0,
  }
  
  componentDidMount(){
    this.timer = setInterval(this.progress, 100); // 0.1sec
    this.callApi() // 3
    .then(res=> {
      // console.log(typeof res);
      return this.setState({customers:res})
    })
    .catch(error=> console.log(error));
  }

  callApi = async() =>{
    // const response = await fetch('/api/customers');
    const response = await fetch(`${databaseURL}/words.json`); // 1

    // fetch(`${databaseURL}/words.json`).then(res => { // 1 -> 2 -> 3
    //   if (res.status != 200) {
    //       throw new ErrorEvent(res.statusText);
    //   }
    //   return res.json();
    // }).then(text => this.setState({ customers: text['textContent']})); // text['textContent']-> 변경하기

    const body = await response.json(); // 2
    return body;
  }

  progress= ()=>{
    // const {completed} = this.state;
    this.setState({completed: this.state.completed >= 100 ? 0 : this.state.completed + 1})
  }

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
            { // *주의 : 비동기적인 customers 호출시 데이터가 비어있을 수 있음
              this.state.customers ? this.state.customers.map(customer => {
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
              }) : 
              <TableRow>
                <TableCell colSpan="7" align="center">
                  <CircularProgress className={classes.progress} variant="determinate" value={this.state.completed} color="secondary"/>
                </TableCell>
              </TableRow>
            }       
            </TableBody>
        </Table>
      </Paper>
    );
  }
}

export default withStyles(styles)(App);
