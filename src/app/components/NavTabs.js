import React from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import { Nav, NavItem } from 'react-bootstrap';

const NavTabs = (props) => {

	const handleSelect = (selectedKey) => {
		props.changeTabs(selectedKey);
	};
	console.log('props', props);
	return (
		<div className="container">
			<Nav bsStyle="tabs" justified activeKey={props.activeTab} onSelect={handleSelect}>
				<NavItem eventKey={1} title="My Answer" >My Answer</NavItem>
				<NavItem eventKey={2} title="All Answer">All Answer</NavItem>
			</Nav>
			{ props.activeTab === 1 ? props.MettupRegistration : props.VisitorList }
		</div>
	);
};

export default NavTabs;
