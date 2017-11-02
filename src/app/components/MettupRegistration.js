import React, { Component } from 'react';
import { FormControl, FormGroup, ControlLabel, Button, Col, Row } from 'react-bootstrap';

function FieldGroup({ id, label, help, ...props }) {
  return (
    <FormGroup controlId={id}>
      <ControlLabel>{label}</ControlLabel>
      <FormControl {...props} />
    </FormGroup>
  );
}

const FormTemplate = (props) => {
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
						<option value="Need to decide" default>select</option>
						<option value="Yes">Yes</option>
						<option value="No">No</option>
					</FormControl>
				</FormGroup>
				<Button type="submit">
					Send
				</Button>
			</form>
		</Col>
	)
}

const userList = (function(user) {
	const users = [];
	return function(user)  {
		console.log('users', users);
		return users.push(user);
	}
}());


export default class MettupRegistration extends Component {
	constructor(props) {
		super(props);
		this.state = {
			name: this.props.name,
			withMe: 0,
			decide: 'Need to decide',
			user_id: this.props.user_id
		}
		this.handleInput = this.handleInput.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	handleInput(e) {
		this.setState({ [e.target.name]: e.target.value });
	}

	handleSubmit(e) {
		e.preventDefault();
		userList(this.state);
	}
	render() {
		console.log('this.state', this.state);

		return (
			<div>
				<h1>MettupRegistration</h1>
				<FormTemplate value={this.state} handleInput={this.handleInput} handleSubmit={this.handleSubmit} />
			</div>
		);
	}
}
