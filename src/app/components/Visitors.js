import React, { Component } from 'react';
import SearchField from './SearchField';
import VisitorsList from './VisitorsList';

export default class Visitors extends Component {
	constructor(props) {
		super(props);
		this.state = {
			users: this.props.users,
			searchInput: ''
		}
		this.handleInput = this.handleInput.bind(this);
	}

	handleInput(text) {
		this.setState({searchInput: text})
	}

	componentWillReceiveProps(nextProps) {
		this.setState({...nextProps});
	}

	render() {
		return (
			<div className="tab__container">
				<h1>Все ответы:</h1>
				<SearchField searchInput={this.state.searchInput} handleInput={this.handleInput} />
				<VisitorsList 
							openModal={this.props.openModal} 
							searchInput={this.state.searchInput} 
							currentUserID={ this.props.data.userID } 
							users={ this.state.users } />
			</div>
		);
	}
}
