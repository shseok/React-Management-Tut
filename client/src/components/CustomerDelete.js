import React from 'react';

const databaseURL = "https://management-cloud-default-rtdb.firebaseio.com";

class CustomerDelete extends React.Component{

    deleteCustomer(id){
        const url = `${databaseURL}/words/${id}.json`;
        fetch(url, {
            method: 'DELETE'
        });
        this.props.stateRefresh();
    }
    render(){
        return(
            <button onClick={(e)=>{this.deleteCustomer(this.props.keyId)}}>삭제</button>
        );
    }
}

export default CustomerDelete;