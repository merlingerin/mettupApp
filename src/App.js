import React, { Component } from 'react';
import './App.css';
<<<<<<< HEAD
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
=======
import { fetchUsers, deleteUser, addUser } from './models/Users';

localStorage.Users = '[]';

class App extends Component {

  componentDidMount() {
    const user = {
      name: 'Sergey',
      sex: 'male',
      age: '26',
      id: '1'
    };

    addUser(user);
  }

  handleIvent() {
    console.log(fetchUsers());
  }

  render() {

    const user = {
      name: 'Kos',
      sex: 'male',
      age: '26',
      id: '2'
    };
    addUser(user);
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p onClick={this.handleIvent} className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>

      </div>
    );
>>>>>>> f2ed736c4e71ff89f9b3b8b8e9cdc8ff1b1e60b4
  }
}

export default App;
