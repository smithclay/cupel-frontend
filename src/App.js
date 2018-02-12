import React, { Component } from 'react';
import logo from './logo.svg';

import './App.css';

class App extends Component {
  goTo(route) {
    this.props.history.replace(`/${route}`)
  }

  login() {
    this.props.auth.login();
  }

  logout() {
    this.props.auth.logout();
  }

  render() {
    const { isAuthenticated } = this.props.auth;

    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <button onClick={this.goTo.bind(this, 'home')}>
          Home
        </button>
            {
              !isAuthenticated() && (
                  <button onClick={this.login.bind(this)}>
                    Log In
                  </button>
                )
            }
            {
              isAuthenticated() && (
                  <button onClick={this.logout.bind(this)}>
                    Log Out
                  </button>
                )
            }
      </div>
    );
  }
}

export default App;
