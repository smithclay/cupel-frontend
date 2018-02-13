import React, { Component } from 'react';

import { Container } from 'reactstrap';

import './App.css';

class App extends Component {
  goTo(route) {
    this.props.history.replace(`/${route}`);
  }

  render() {
    const { isAuthenticated } = this.props.auth;
    return (
      <Container>
        <h3>There's nothing here yet.</h3>
        <h4>...why not create a network?</h4>
      </Container>
    );
  }
}

export default App;
