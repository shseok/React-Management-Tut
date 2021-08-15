import React from 'react';

// import { post } from 'axios';


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
        const words = {
            name: this.state.userName,
            major: this.state.major,
            gender: this.state.gender,
            id: this.state.id + 1,
            image: `https://placeimg.com/64/64/${this.state.id + 1}`,
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
    render(){
        return(
            <form onSubmit={this.handleFormSubmit}>
                <h1>고객 추가</h1>
                프로필 이미지: <input type="file" name="file" file={this.state.file} value={this.state.fileName} onChange={this.handleFileChange}/><br/>
                이름: <input type="text" name="userName" value={this.state.userName } onChange={this.handleValueChange}/><br/>
                생년월일: <input type="text" name="birthday" value={this.state.birthday} onChange={this.handleValueChange}/><br/>
                성별: <input type="text" name="gender" value={this.state.gender} onChange={this.handleValueChange}/><br/>
                전공: <input type="text" name="major" value={this.state.major} onChange={this.handleValueChange}/><br/>
                직업: <input type="text" name="job" value={this.state.job} onChange={this.handleValueChange}/><br/>
                <button type="submit">추가하기</button>
            </form>
        )
    }
}

export default CustomerAdd;