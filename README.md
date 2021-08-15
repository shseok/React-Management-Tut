## Management System

본 프로젝트는 React study 목적으로 만들어진 고객 관리 시스템(Management System)입니다.

## 개선사항
* firebase의 Realtime DB를 사용해서 server에서 가져오지 않고 데이터가 있는 주소에서 가졌왔습니다.
    * 이를 다음과 같이 바꿔볼 생각입니다.
    1. Firestore DB를 사용해서 Mui porject에서 했던(Key를 적용하는)방식 적용하기
    2. server -> '/api/customers'주소를 가진 get method에서 axios를 이용해 데이터 얻기
    3. 데이터 res.send()로 보여주기
    4. client 측에서 fetch로 가져오기 

* setRefresh가 적시에 적용되지 않아 f5를 눌러 삭제된 것들이 refresh되는 현상

* App.js: 158 - 필터링하는 과정에서 
```
data = Object.keys(data).filter(id => {
        const customer = data[id];
        return (customer.name.indexOf(this.state.searchKeyword) >-1);
        // return customer.name === this.state.searchKeyword;
      });
```
위 부분의 코드를 적용하면 필터링이 되지만 정보를 불러오는데 딜레이가 심하게 걸리는지 잘 보이지 않는다.
위 코드를 없애주면 필터링은 안되지만 정상적인 데이터가 도출됨을 볼 수 있다.(임시방편으로 위 코드를 주석 처리함으로써 필터링기능은 제거하였음)
## 실행방법

```
cd .\management\
npm install
yarn dev 
```
**yarn dev === server와 client 동시 실행**

## 얻게 된 지식
 입력창이 존재하고 어떤 값을 입력할 때, 입력값을 상태변화로 감지해서 React 내부에서 해당 데이터를 가지고 있도록 하기 위해서는 handleValueChange(ex. in App.js)와 같은 함수가 필요

## 주의사항
CreateMuiTheme 는 deprecated 되었기 때문에 createTheme를 대체해서 폰트를 적용시켜야한다

## 도움 받은 사이트

JSON Validator

https://jsonlint.com/

Google Font

https://fonts.google.com/specimen/Noto+Sans+KR

Material-UI

https://material-ui.com/components/app-bar/#app-bar