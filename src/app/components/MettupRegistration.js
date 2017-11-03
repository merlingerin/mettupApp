import React, { Component } from 'react';
import { FormControl, FormGroup, ControlLabel, Button, Col, Row } from 'react-bootstrap';
import { fetchUsers, addUser, deleteUser, updateUser } from '../models/Users';

function FieldGroup({ id, label, help, ...props }) {
  return (
    <FormGroup controlId={id}>
      <ControlLabel>{label}</ControlLabel>
      <FormControl {...props} />
    </FormGroup>
  );
}

const FormTemplate = (props) => {
	console.log('props.value', props.value);
	return (
		<Col>
			<form onSubmit={props.handleSubmit}>
				<FieldGroup
					id="name"
					type="text"
					label="Me"
					name="name"
					value={props.value.name}
					onChange={props.handleInput}
					placeholder="Enter your name"
				/>
				<FormGroup controlId="formHorizontalEmail">
					<Row>
						<Col componentClass={ControlLabel} sm={8}>
							With Me
						</Col>
						<Col sm={4}>
							<FormControl name="withMe" onChange={props.handleInput} type="number" value={props.value.withMe} min="0" placeholder="" />
						</Col>
					</Row>
				</FormGroup>
				<FormGroup controlId="formControlsSelect">
					<ControlLabel>Select</ControlLabel>
					<FormControl value={props.value.decide} onChange={props.handleInput} name="decide" componentClass="select" placeholder="select">
						<option value="-1" default>Need to decide</option>
						<option value="1">Yes</option>
						<option value="0">No</option>
					</FormControl>
				</FormGroup>
				<Button type="submit">
					Send
				</Button>
			</form>
		</Col>
	)
}

export default class MettupRegistration extends Component {
	constructor(props) {
		super(props);
		this.state = {
			name: this.props.data.name,
			withMe: this.props.data.withMe || 0,
			decide: this.props.data.decide || -1,
			userID: 235634657,
			picture: this.props.exist ? this.props.data.picture : this.props.data.picture.data.url
		}
		this.handleInput = this.handleInput.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	handleInput(e) {
		this.setState({ [e.target.name]: e.target.value });
	}

	handleSubmit(e) {
		e.preventDefault();
		const users = fetchUsers();
		const exist = users.some((user) => {
			return +user.userID === +this.state.userID;
		});
		console.log('exist', exist);
		if( +this.state.decide === -1 ) {
			exist ? deleteUser(+this.state.userID) : false;
		} else {
			exist ? updateUser(this.state) : addUser(this.state);
		}
	}
	render() {
		console.log('thisPROPS', this.props);

		return (
			<div className="tab__container">
				<h1>MettupRegistration</h1>
				<FormTemplate value={this.state} handleInput={this.handleInput} handleSubmit={this.handleSubmit} />
			</div>
		);
	}
}
