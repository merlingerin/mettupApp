import React, { Component } from 'react';
import './App.css';
import FacebookLogin from 'react-facebook-login';
import { Grid, Row } from 'react-bootstrap';
import NavTabs from './app/components/NavTabs';
import MettupRegistration from './app/components/MettupRegistration';
import Visitors from './app/components/Visitors';
import { fetchUsers, addUser, deleteUser } from './app/models/Users';


let store = (function () {
	if(localStorage.Users) {
		return false;
	} else {
		localStorage.Users = '[]';
	}
}());


class App extends Component {
	constructor(props) {
		super(props);
		this.state = {
			login: false,
			activeTab: 1,
		}
		this.ckeckTocken = this.ckeckTocken.bind(this);
		this.responseFacebook = this.responseFacebook.bind(this);
		this.changeTabs = this.changeTabs.bind(this);
	}

	responseFacebook(response) {
	  this.ckeckTocken(response);
	}

	ckeckTocken(response) {
		const Users = fetchUsers();

		if(!response.accessToken) {
			return false;
		} else {
			const exist = Users.filter((user) => {
				return user.userID === response.userID;
			});
			if(exist.length) {
				console.log('exist', exist);
				this.setState({
					login: true,
					exist: !!exist.length,
					data: exist[0],
				})
			} else {
				this.setState({
					login: true,
					exist: !!exist.length,
					data: response,
				})
			}
		}

		console.log('data', this.state);
	}

	changeTabs(key) {
		this.setState({
			activeTab: key
		})
	}

	render() {
		const Login = () => (<h1>You are welcome!</h1>);

		const Logout = () => (<h1>You need to login!</h1>);

	    return (
	      <div className="App">
			  <Grid>
				<Row>
					<h1>Home Screen</h1>
					{ !this.state.login
						? <FacebookLogin
							appId="314496742353104"
							autoLoad={true}
							fields="name,email,picture"
							cssClass="btn__logIn"
							textButton="facebook"
							callback={this.responseFacebook}
						/>
					: 	<NavTabs
							activeTab={this.state.activeTab}
							changeTabs={this.changeTabs}
							MettupRegistration = {<MettupRegistration exist={this.state.exist} data={ this.state.data } />}
							Visitors = {<Visitors users={this.state.users} data={ this.state.data } />}
						/>
					}
				</Row>
			</Grid>
	      </div>
	    );
  }
}

export default App;
