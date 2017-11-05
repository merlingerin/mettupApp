import React, { Component } from 'react';
import { FormControl, FormGroup, ControlLabel, Button, Col } from 'react-bootstrap';
import { addUser, deleteUser, updateUser, getUser } from '../models/Users';

function FieldGroup({ id, label, help, ...props }) {
  return (
    <FormGroup controlId={id}>
      <ControlLabel>{label}</ControlLabel>
      <FormControl {...props} />
    </FormGroup>
  );
}

//===============CREATE TEMPLATE FOR REGISTRATION FORM==============//
const FormTemplate = (props) => {
	return (
		<Col className="mettup__form">
			<form onSubmit={props.handleSubmit} >
				<FieldGroup
					id="name"
					type="text"
					label="Me"
					name="name"
					value={props.value.name}
					onChange={props.handleInput}
					placeholder="Enter your name"
				/>
				<FormGroup controlId="formHorizontalEmail" 
							className="meetup__input">
					<Col componentClass={ControlLabel} >
						With Me
					</Col>
					<Col >
						<FormControl name="withMe" onChange={props.handleInput} type="number" value={props.value.withMe} min="0" placeholder="" />
					</Col>
				</FormGroup>
				<FormGroup controlId="formControlsSelect" >
					<ControlLabel></ControlLabel>
					<FormControl value={props.value.decide} onChange={props.handleInput} name="decide" componentClass="select" placeholder="select">
						<option value="-1" default>Нужно выбрать</option>
						<option value="1">Я точно приду</option>
						<option value="0">Я точно не приду</option>
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
			userID: this.props.data.userID,
			picture: this.props.exist ? this.props.data.picture : this.props.data.picture.data.url
		}
		this.handleInput = this.handleInput.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	componentDidMount() {
		const userData = getUser(this.state.userID);
		userData.length > 0 ? 	this.setState({ ...userData[0] }) : false;
	}

	handleInput(e) {
		this.setState({ [e.target.name]: e.target.value });
	}
	
	handleSubmit(e) {
		e.preventDefault();
		const exist = getUser(this.state.userID);
		
		if( +this.state.decide === -1 ) {
			exist.length > 0 ? deleteUser(+this.state.userID) : false;
			this.props.openModal(undefined);
			this.props.refreshState();
			
		} else {
			if( exist.length > 0 ) {
				updateUser(this.state);
				this.props.refreshState();
			} else {
				addUser(this.state);
				this.props.refreshState();
			}
		}
	}

	render() {
		console.log('thisPROPS', this.props);

		return (
			<div className="tab__container">
				<h1>Мой ответ:</h1>
				<FormTemplate value={this.state} handleInput={this.handleInput} handleSubmit={this.handleSubmit} />
			</div>
		);
	}
}
