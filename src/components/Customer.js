import React from 'react';

class Customer extends React.Component{ // customer class or component  정의 / React.Component : Library or Class
    render() { // Customer에 그려지는 내용이 담기는 곳 / Component Library에 포함된 function 
        return (
            <div>
                <CustomerProfile id={this.props.id} image={this.props.image} name={this.props.name}/>
                <CustomerInfo birthday={this.props.birthday} gender={this.props.gender} job={this.props.job} major={this.props.major}/>
            </div>
        );
    }

}

class CustomerProfile extends React.Component{
    render() {
        return (
            <div>
                <img src={this.props.image} alt="profile" />
                <h2>{this.props.name}({this.props.id})</h2>
            </div>
        );
    }
}

class CustomerInfo extends React.Component{
    render() {
        return (
            <div>
                <p>{this.props.birthday}</p>
                <p>{this.props.gender}</p>
                <p>{this.props.job}</p>
                <p>{this.props.major}</p>
            </div>
        );
    }
}

export default Customer;