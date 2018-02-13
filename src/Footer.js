import React, { Component } from 'react';
import { Container } from 'reactstrap';

import './Footer.css';

class Footer extends Component {
  goTo(route) {
    this.props.history.replace(`/${route}`);
  }

  render() {
    return (
      <Container className="Footer text-center">
        <span>&copy; 2018. Made in Noe Valley, San Francisco.</span>
      </Container>
    );
  }
}

export default Footer;
