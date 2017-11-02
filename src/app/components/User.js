import React from 'react';

const UserCard = ({name, picture, email}) => {
	return (
		<div>
			<h3>{name}</h3>
			<img src={picture} />
			<cite>{email}</cite>
		</div>
	);
}

export default UserCard;
