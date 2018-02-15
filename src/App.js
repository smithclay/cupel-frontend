import React, { Component } from 'react';
import { Container } from 'reactstrap';
import { Link } from 'react-router-dom';

import './App.css';

class App extends Component {
  goTo(route) {
    this.props.history.replace(`/${route}`);
  }

  renderNeedsLogin() {
    return (
      <Container className="App-loggedout">
        Hey, you're logged out. Log in, yeah?
      </Container>
    );
  }

  render() {
    if (!this.props.auth.isAuthenticated()) {
      return this.renderNeedsLogin();
    } else {
      return (
        <Container>
          <h3>There's nothing here yet.</h3>
          <h4>
            ...why not <Link to="networks">create a network?</Link>
          </h4>
        </Container>
      );
    }
  }
}

export default App;
