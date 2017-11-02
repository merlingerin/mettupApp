import React, { Component } from 'react';
import './App.css';
import FacebookLogin from 'react-facebook-login';
import { Grid, Row } from 'react-bootstrap';
import NavTabs from './app/components/NavTabs';
import MettupRegistration from './app/components/MettupRegistration';
import VisitorList from './app/components/VisitorList';

class App extends Component {
	constructor(props) {
		super(props);
		this.state = {
			login: false,
			activeTab: 1
		}
		this.ckeckTocken = this.ckeckTocken.bind(this);
		this.responseFacebook = this.responseFacebook.bind(this);
		this.changeTabs = this.changeTabs.bind(this);
	}

	responseFacebook(response) {
	  console.log(response);
	  this.ckeckTocken(response);
	}

	ckeckTocken(response) {
		if(!response.accessToken) {
			return false;
		} else {
			this.setState({
				login: true,
				data: response
			})
		}
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
							MettupRegistration = {<MettupRegistration name={ this.state.data.name } user_id={ this.state.data.id } />}
							VisitorList = {<VisitorList name={this.state.data.name} />}
						/>
					}
				</Row>
			</Grid>
	      </div>
	    );
  }
}

export default App;
