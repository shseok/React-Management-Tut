import React from 'react';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import CustomerDelete from './CustomerDelete';

class Customer extends React.Component{ // customer class or component  정의 / React.Component : Library or Class
    render() { // Customer에 그려지는 내용이 담기는 곳 / Component Library에 포함된 function 
        return (
            <TableRow>
                <TableCell>{this.props.id}</TableCell>
                <TableCell><img src={this.props.image} alt="profile" /></TableCell>
                <TableCell>{this.props.name}</TableCell>
                <TableCell>{this.props.birthday}</TableCell>
                <TableCell>{this.props.gender}</TableCell>
                <TableCell>{this.props.job}</TableCell>
                <TableCell>{this.props.major}</TableCell>
                <TableCell><CustomerDelete keyId={this.props.keyId} stateRefresh={this.props.stateRefresh} id={this.props.id}/></TableCell>
            </TableRow>
        );
    }

}

export default Customer;