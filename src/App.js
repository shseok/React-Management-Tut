import React, { Component } from 'react';
import './App.css';
import Customer from './components/Customer';

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
  render(){
    return (
      <div>{ // 괄호는 왜?
        customers.map(customer => {
          return(
            <Customer
              key={customer.id} // map으로 다수의 정보 출력시 key 이름의 props 설정 필요
              id={customer.id}
              image={customer.image}
              name={customer.name}
              birthday={customer.birthday}
              gender={customer.gender}
              major={customer.major}
            />
          ) 
        })
      }      
      </div>
      // <Customer// customer를 불러와서 app component안에서 출력할 수 있도록
      //   id={customers[0].id}
      //   image={customers[0].image}
      //   name={customers[0].name}
      //   birthday={customers[0].birthday}
      //   gender={customers[0].gender}
      //   major={customers[0].major}
      //   />
    );
  }
}

export default App;
