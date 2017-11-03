import React, { Component } from 'react';
import { FormGroup, FormControl, InputGroup, Glyphicon } from 'react-bootstrap';

const SearchField = () => {
	return (
		<FormGroup>
			<InputGroup>
				<InputGroup.Addon>
					<Glyphicon glyph="search" />
				</InputGroup.Addon>
				<FormControl type="text" />
			</InputGroup>
		</FormGroup>
	);
};

export default SearchField;
