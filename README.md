## Management System

본 프로젝트는 React study 목적으로 만들어진 고객 관리 시스템(Management System)입니다.

## 개선사항
* firebase의 Realtime DB를 사용해서 server에서 가져오지 않고 데이터가 있는 주소에서 가졌왔다.
    * 이를 다음과 같이 바꿔볼 생각이다.
    1. Firestore DB를 사용해서 Mui porject에서 했던(Key를 적용하는)방식으로 한다.
    2. server -> '/api/customers'주소를 가진 get method에서 axios를 이용해 데이터 얻기
    3. 데이터 res.send()로 보여주기
    4. client 측에서 fetch로 가져오기 
## 실행방법

yarn dev -> server와 client 동시 실행

## 도움 받은 사이트
https://jsonlint.com/