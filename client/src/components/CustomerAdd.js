import React from 'react';
// import { post } from 'axios';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/styles';


const styles = theme=>({
    hidden:{
        display:"none"
    }
});

const databaseURL = "https://management-cloud-default-rtdb.firebaseio.com";

class CustomerAdd extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            // 이름 생일 성별 
            file: null,
            userName: '',
            birthday: '',
            gender: '',
            job: '',
            major: '',
            fileName: '',
            id: 5,
            words:{},
            open: false,
        }
    }
    _post(word) { // data insert
        return fetch(`${databaseURL}/words.json`, {
            method: 'POST',
            body: JSON.stringify(word) // javascript object -> JSON object
        }).then(res => {
            if (res.status !== 200) {
                throw new ErrorEvent(res.statusText);
            }
            return res.json();
        }).then(data => { // 화면의 정보를 모두 보여주는 것이 아닌 등록요청한 그 단어 정보만 화면에 '추가로' 보여준다
            let nextState = this.state.words; // array assign => deep? shallow? 일부러 이렇게 추가한 이유가 있을 것...
            nextState[data.name] = word;
            this.setState({ words: nextState });
        });
    }
    handleFormSubmit = (e)=>{
        e.preventDefault()
        // this.addCustomer()
        //     .then((response)=>{
        //         console.log(response.data);    
        //     })
        this.setState({
            id: this.state.id + 1,
            open: false
        });
        const words = {
            name: this.state.userName,
            major: this.state.major,
            gender: this.state.gender,
            id: this.state.id + 1,
            image: `https://placeimg.com/64/64/${this.state.id}`,
            job: this.state.job,
            birthday: this.state.birthday
        }
        if (!words.name && 
            !words.major &&
            !words.gender &&
            !words.id &&
            !words.image &&
            !words.job &&
            !words.birthday) {
            return;
        }
        this._post(words);
        this.props.stateRefresh();
    }
    // addCustomer = () => {
    //     // const url = '/api/customers';
    //     const url = `${databaseURL}/words.json`;
    //     const formData = new FormData();
    //     formData.append('birthday', this.state.birthday); 
    //     formData.append('gender', this.state.gender); 
    //     formData.append('id', this.state.id + 1); 
    //     formData.append('image', this.state.file);
    //     formData.append('image', `https://placeimg.com/64/64/${this.state.id + 1}`);
    //     formData.append('job', this.state.job); 
    //     formData.append('major', this.state.major);
    //     formData.append('name', this.state.userName);  

    //     const config = {
    //         headers:{
    //             'content-type': 'multipart/form-data'
    //         } 
    //     }
    //     return post(url, formData, config);
    // }

    handleFileChange = (e) =>{
        this.setState({
            file: e.target.files[0],
            fileName: e.target.value
        })
    }

    handleValueChange = (e) => { // 입력시 input창에 입력글씨가 쓰이는 함수
        let nextState = {};
        nextState[e.target.name] = e.target.value;
        this.setState(nextState);
    }
    handleClickOpen = () =>{
        this.setState({open: true});
    }
    handleClose= () =>{
        this.setState({
            file: null,
            userName: '',
            birthday: '',
            gender: '',
            job: '',
            major: '',
            fileName: '',
            id: 5,
            words:{},
            open: false,
        })
    }

    render(){
        const {classes} = this.props;
        return(
            <div>
                <Button variant="contained" color="primary" onClick={this.handleClickOpen}>
                    고객 추가하기
                </Button>
                <Dialog open={this.state.open} onClose={this.handleClose}>
                    <DialogTitle>고객 추가</DialogTitle>
                    <DialogContent>
                        <input className={classes.hidden} accept="image/*" id="raised-button-file" type="file" file={this.state.file} value={this.state.fileName} onChange={this.handleFileChange}/><br/>
                        <label htmlFor="raised-button-file">
                            <Button variant="contained" color="primary" component="span" name="file">
                                {this.state.fileName === "" ? "프로필 이미지 선택" : this.state.fileName}
                            </Button>
                        </label>
                        <br/>
                        <TextField label="이름" type="text" name="userName" value={this.state.userName } onChange={this.handleValueChange}/><br/>
                        <TextField label="생년월일" type="text" name="birthday" value={this.state.birthday} onChange={this.handleValueChange}/><br/>
                        <TextField label="성별" type="text" name="gender" value={this.state.gender} onChange={this.handleValueChange}/><br/>
                        <TextField label="전공" type="text" name="major" value={this.state.major} onChange={this.handleValueChange}/><br/>
                        <TextField label="직업" type="text" name="job" value={this.state.job} onChange={this.handleValueChange}/><br/>
                    </DialogContent>
                    <DialogActions>
                        <Button variant="contained" color="primary" onClick={this.handleFormSubmit}>추가</Button>
                        <Button variant="outlined" color="primary" onClick={this.handleClose}>닫기</Button>
                    </DialogActions>
                </Dialog>
            </div>
        )
    }
}

export default withStyles(styles)(CustomerAdd);