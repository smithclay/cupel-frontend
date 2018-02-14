import React, { Component } from 'react';
import logo from './logo.svg';

import { Navbar, NavbarBrand, Nav, NavItem, NavLink } from 'reactstrap';

import './Header.css';

class Header extends Component {
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
      <Navbar className="Header-navbar" color="faded" light expand="md">
        <NavbarBrand href="/">
          <img src={logo} className="App-logo" alt="logo" />&nbsp;cupel
        </NavbarBrand>
        <Nav className="ml-auto" navbar>
          <NavItem>
            <NavLink onClick={this.goTo.bind(this, 'networks')}>
              Networks
            </NavLink>
          </NavItem>
          {!isAuthenticated() && (
            <NavLink onClick={this.login.bind(this)}>Log In</NavLink>
          )}
          {isAuthenticated() && (
            <NavLink onClick={this.logout.bind(this)}>Log Out</NavLink>
          )}
        </Nav>
      </Navbar>
    );
  }
}

export default Header;
