import React, { Component } from 'react';
import './App.css';
import FacebookLogin from 'react-facebook-login';
import { Grid, Row } from 'react-bootstrap';
import NavTabs from './app/components/NavTabs';
import MettupRegistration from './app/components/MettupRegistration';
import Visitors from './app/components/Visitors';
import MyModal from './app/components/Modal';
import { fetchUsers, deleteUser } from './app/models/Users';


//===================CREATE AND INITIALIZE APP'S STORE================//
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
			modal: {
				showModal: false, 
				type: 'alert',
			}
		}
		this.ckeckTocken = this.ckeckTocken.bind(this);
		this.responseFacebook = this.responseFacebook.bind(this);
		this.changeTabs = this.changeTabs.bind(this);
		this.refreshState = this.refreshState.bind(this);
		this.openModal = this.openModal.bind(this);
		this.closeModal = this.closeModal.bind(this);
		this.confirmDelete = this.confirmDelete.bind(this);
	}

	componentDidMount() {
		const users = fetchUsers();
		this.setState({
			users: users
		});
	}

	responseFacebook(response) {
	  this.ckeckTocken(response);
	}

//===================LOGIN================//
ckeckTocken(response) {
		const Users = fetchUsers();

		if(!response.accessToken) {
			return false;
		} else {
			const exist = Users.filter((user) => {
				return user.userID === response.userID;
			});
			if(exist.length) {
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
	}

//===================SWITCH APP'S TAB================//
	changeTabs(key) {
		this.setState({
			activeTab: key
		});
	}

//===================REFRESH APP'S STATE================//
	refreshState(data) {
		this.setState({
			users: fetchUsers()
		});
	}

//===================CLOSE MODAL================//
	closeModal() {
		this.setState({ modal: { ...this.state.modal, showModal: false} });
	};
	
//===================OPEN MODAL================//
	openModal(name, userID) {
		if( name !== undefined ) {
			this.setState({ modal: { ...this.state.modal, showModal: true, type: 'confirm', name: name, userID: userID} });							
		} else {
			this.setState({ modal: { ...this.state.modal, showModal: true, name: ''} });										
		}
	};

//===================HANDLE MODAL CONFIRM EVENT================//
	confirmDelete() {
		deleteUser(this.state.modal.userID);		
		this.setState({
			users: this.state.users.filter( (user) => +user.userID !== this.state.modal.userID )
		});
		this.refreshState();
	}

	render() {
	    return (
	      <div className="App">
			  <Grid>
				<Row>
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
							MettupRegistration = {<MettupRegistration 
													refreshState={this.refreshState} 
													exist={this.state.exist} 
													data={ this.state.data }
													openModal={this.openModal} />}
							Visitors = {<Visitors 
											users={this.state.users} 
											refreshState={this.refreshState} 
											data={ this.state.data } 
											openModal={this.openModal} />}
						/>
					}
				</Row>
			</Grid>
			<MyModal showModal={this.state.modal.showModal}
					closeModal={this.closeModal}
					refreshState={this.refreshState} 
					confirmDelete={this.confirmDelete}					
					openModal={this.state.modal.openModal}
					options={this.state.modal} />
	      </div>
	    );
  }
}

export default App;
