import React from 'react';
import { FormGroup, FormControl, InputGroup, Glyphicon } from 'react-bootstrap';

const SearchField = (props) => {
	const handleInput = (e) => {
		props.handleInput(e.target.value);
	}
	return (
		<FormGroup>
			<InputGroup>
				<InputGroup.Addon>
					<Glyphicon glyph="search" />
				</InputGroup.Addon>
				<FormControl type="text" onChange={handleInput} placeholder="Search..." value={props.searchInput} />
			</InputGroup>
		</FormGroup>
	);
};

export default SearchField;
