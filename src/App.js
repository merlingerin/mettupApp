import React, { Component } from 'react';
import './App.css';
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
  }
}

export default App;
