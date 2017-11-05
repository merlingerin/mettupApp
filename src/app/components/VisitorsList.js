import React, { Component } from 'react';
import { Media, Glyphicon } from 'react-bootstrap';

const ListWithMe = ({ withMe }) => +withMe !== 0 ? <span className="list__value">{ withMe }</span> : '';

const ListDecide = ({ decide }) => {
	switch(+decide) {
		case(0):
			return <Glyphicon glyph="remove" />;
		case(1):
			return <Glyphicon glyph="ok" />;
		default:
			return <Glyphicon glyph="remove" />;
	}
}

class ListItem extends Component {
	constructor(props) {
		super(props);
		this.handleClick = this.handleClick.bind(this);
	}

	handleClick(name, userID) {
		+userID === +this.props.currentUserID ? this.props.openModal(name, userID) : false;
	}

	render() {
		return (
			this.props.users.map((user) => (
				user.name.toUpperCase().indexOf(this.props.searchInput.toUpperCase()) > -1 ?
				<Media onClick={() => this.handleClick(user.name, user.userID)} key={user.userID} className={ +user.userID === +this.props.currentUserID ? 'active' : ''} >
					<Media.Left>
						<img width={64} height={64} src={user.picture} />
					</Media.Left>
					<Media.Body>
						<span className="list__name">{ user.name }</span>
						<ListDecide decide={ user.decide } />
						<ListWithMe withMe={ user.withMe } />
					</Media.Body>
				</Media>
				: false
			))
		);
	}
}

const VisitorsList = ( { users, currentUserID, searchInput, openModal, removeUser } ) => {
	return (
		<div className="VisitorList">
			{ users.length > 0 ? 
								<ListItem 
									users={users} 
									searchInput={searchInput} 
									currentUserID={ currentUserID } 
									openModal={openModal}/> 
								: ''
			}
		</div>
	)
}

export default VisitorsList;
