import React, { Component } from 'react';
import logo from './logo.svg';

import { Navbar, NavbarBrand, Nav, NavItem, NavLink } from 'reactstrap';

import './App.css';

class App extends Component {
  goTo(route) {
    this.props.history.replace(`/${route}`);
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
      <div>
        <Navbar color="faded" light expand="md">
          <NavbarBrand href="/">
            <img src={logo} className="App-logo" alt="logo" />cupel
          </NavbarBrand>
          <Nav className="ml-auto" navbar>
            <NavItem>
              <NavLink onClick={this.goTo.bind(this, 'home')}>Home</NavLink>
            </NavItem>
            {!isAuthenticated() && (
              <NavLink onClick={this.login.bind(this)}>Log In</NavLink>
            )}
            {isAuthenticated() && (
              <NavLink onClick={this.logout.bind(this)}>Log Out</NavLink>
            )}
          </Nav>
        </Navbar>
      </div>
    );
  }
}

export default App;
