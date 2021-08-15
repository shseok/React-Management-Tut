import React, { Component } from 'react';
import './App.css';
import Customer from './components/Customer';
import CustomerAdd from './components/CustomerAdd';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import { alpha, withStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';

const styles = theme => ({
  root: {
    width: '100%',
    minWidth: 1080
  },
  menu:{
    marginTop: 15,
    marginBottom: 15,
    display: "flex",
    justifyContent: 'center'
  },
  paper:{
    marginLeft: 18,
    marginRight: 18
  },
  tableHead:{
    fontSize: '1.0rem'
  },
  progress: {
    marginTop: theme.spacing(2),
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(1),
      width: 'auto',
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: '12ch',
      '&:focus': {
        width: '20ch',
      },
    },
  },
})

const databaseURL = "https://management-cloud-default-rtdb.firebaseio.com";

class App extends Component{

  constructor(props){
    super(props);
    this.state={
      customers:{}, // ""랑 왜 같을까? = "" 해도 상관 x ...?
      completed:0
    }
  }
  
  stateRefresh= ()=>{
    this.setState({
      customers: {},
      completed: 0
    });
    this.callApi() // 3
    .then(res=> {
      // console.log(typeof res);
      return this.setState({customers:res})
    })
    .catch(error=> console.log(error));
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
    const cellList = ['번호', '프로필 이미지', '이름', '생년월일', '성별', '직업', '전공', '설정'];
    return (
      <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="open drawer"
          >
            <MenuIcon />
          </IconButton>
          <Typography className={classes.title} variant="h6" noWrap>
            고객 관리 시스템
          </Typography>
          <div className={classes.search}>
            <div className={classes.searchIcon}>
              <SearchIcon />
            </div>
            <InputBase
              placeholder="검색하기"
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
              inputProps={{ 'aria-label': 'search' }}
            />
          </div>
        </Toolbar>
      </AppBar>
      <div className={classes.menu}>
        <CustomerAdd stateRefresh={this.stateRefresh}/>
      </div>
      <Paper className={classes.paper}>
        <Table className={classes.table}>
          <TableHead>
            <TableRow>
              {cellList.map(c=><TableCell className={classes.tableHead}>{c}</TableCell>)}
            </TableRow>
          </TableHead>
          <TableBody>
            { // *주의 : 비동기적인 customers 호출시 데이터가 비어있을 수 있음
              this.state.customers ? Object.keys(this.state.customers).map(id => {
                const customer = this.state.customers[id];
                return(
                  <Customer
                    keyId={id}
                    stateRefresh={this.stateRefresh}
                    key={id} // map으로 다수의 정보 출력시 key 이름의 props 설정 필요
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
      </div>
    );
  }
}

export default withStyles(styles)(App);
