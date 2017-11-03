import React, { Component } from 'react';
import { FormControl, FormGroup, ControlLabel } from 'react-bootstrap';
import { fetchUsers, addUser, deleteUser, updateUser } from '../models/Users';
import SearchField from './SearchField';
import VisitorsList from './VisitorsList';

export default class Visitors extends Component {
	constructor(props) {
		super(props);
		this.state = {
			users: []
		}
	}

	componentDidMount() {
		const users = fetchUsers();
		this.setState({
			users: users
		});
	}

	render() {
		console.log('this.props', this.state);
		return (
			<div className="tab__container">
				<h1>VisitorList</h1>
				<SearchField />
					<VisitorsList currentUserID={ this.props.data.userID } users={ this.state.users } />
			</div>
		);
	}
}
