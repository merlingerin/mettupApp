import React, { Component } from 'react';
import { Media, Glyphicon } from 'react-bootstrap';

const ListWithMe = ({ withMe }) => +withMe !== 0 ? <span className="list__value">{ withMe }</span> : '';
const ListDecide = ({ decide }) => {
	switch(+decide) {
		case(0):
			return <Glyphicon glyph="remove" />;
			break;
		case(1):
			return <Glyphicon glyph="ok" />;
			break;
		default:
			return <Glyphicon glyph="remove" />;
	}
}
const ListItem = ({ users, currentUserID }) => {
	console.log('user.id', users);
	console.log('currentUserID', +currentUserID);
	return (
		users.map((user) => (
			<Media key={user.userID} className={ +user.userID === +currentUserID ? 'active' : ''} >
				<Media.Left>
					<img width={64} height={64} src={user.picture} alt="Image" />
				</Media.Left>
				<Media.Body>
					<span className="list__name">{ user.name }</span>
					<ListDecide decide={ user.decide } />
					<ListWithMe withMe={ user.withMe } />
				</Media.Body>
			</Media>
		))

	);
}

const VisitorsList = ( { users, currentUserID } ) => {
	console.log('users', currentUserID);
	return (
		<div className="VisitorList">
			{ users.length > 0 ? <ListItem users={users} currentUserID={ currentUserID } /> : ''}
		</div>
	)
}

export default VisitorsList;
