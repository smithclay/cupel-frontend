import React, { Component } from 'react';
import request from 'superagent';
import { Table } from 'reactstrap';
import { Button, ButtonGroup } from 'reactstrap';
import { Container, Row, Col } from 'reactstrap';
import Moment from 'react-moment';
import InteractiveShell from '../InteractiveShell/InteractiveShell';

// TODO:
// move API client into index.js (auth) and inject it into
// all components?

import './Networks.css';

class Networks extends Component {
  componentWillMount() {
    this.setState({ fetching: true, networks: null });
  }

  componentDidMount() {
    if (this.props.auth.isAuthenticated()) {
      this.fetchNetworks();
    } else {
      this.setState({ fetching: false });
    }
  }

  fetchNetworks() {
    return request
      .get('https://api.cupel.io/networks')
      .set('Authorization', `Bearer ${this.props.auth.getIdToken()}`)
      .then(res => {
        this.setState({ fetching: false, networks: res.body });
      })
      .catch(e => {
        this.setState({ fetching: false, error: e });
      });
  }

  connectNetwork(friendlyName) {
    this.setState({ selectedNetwork: friendlyName });
  }

  createNetwork() {
    return request
      .post('https://api.cupel.io/networks')
      .set('Authorization', `Bearer ${this.props.auth.getIdToken()}`)
      .then(res => {
        this.setState({ networks: this.state.networks.concat([res.body]) });
      })
      .catch(e => {
        this.setState({ fetching: false, error: e });
      });
  }

  deleteNetwork(networkId) {
    return request
      .delete(`https://api.cupel.io/networks/${networkId}`)
      .set('Authorization', `Bearer ${this.props.auth.getIdToken()}`)
      .then(res => {
        var deletedId = res.body.network_id;
        var nets = this.state.networks.slice(0);
        var foundIndex = nets.findIndex(n => {
          return n.network_id === deletedId;
        });
        nets.splice(foundIndex, 1);
        this.setState({ networks: nets });
      })
      .catch(e => {
        this.setState({ fetching: false, error: e });
      });
  }

  login() {
    this.props.auth.login();
  }

  renderLoading() {
    return <Container>Loading...</Container>;
  }

  renderNeedsLogin() {
    return (
      <Container className="Networks-loggedout">
        Hey, you're logged out. Log in, yeah?
      </Container>
    );
  }

  renderError() {
    return (
      <Container>
        Whoops. That was an error. Please try again or refreshing the page.
      </Container>
    );
  }

  renderNetworkRows() {
    var networks = this.state.networks.map(n => {
      return (
        <tr key={n.network_id}>
          <td>{n.friendly_name}</td>
          <td>
            <Moment>{n.created_on}</Moment>
          </td>
          <td>
            <ButtonGroup size="sm">
              <Button
                outline
                color="info"
                onClick={this.connectNetwork.bind(this, n.friendly_name)}
              >
                Connect
              </Button>
              <Button outline disabled color="secondary">
                Edit
              </Button>
              <Button
                outline
                color="danger"
                onClick={this.deleteNetwork.bind(this, n.network_id)}
              >
                Delete
              </Button>
            </ButtonGroup>
          </td>
        </tr>
      );
    });

    if (networks.length === 0) {
      networks = [
        <tr key="no-network">
          <td colSpan="3">No networks. Why not create one, eh?</td>
        </tr>
      ];
    }

    return networks;
  }

  renderNetworks() {
    const createButtonStyle = {
      float: 'right',
      marginBottom: '10px'
    };

    var networks = this.renderNetworkRows();

    return (
      <Container>
        {networks.length >= 0 && (
          <Row>
            <Col>
              <Button
                outline
                style={createButtonStyle}
                color="primary"
                onClick={this.createNetwork.bind(this)}
              >
                Create a new network
              </Button>
            </Col>
          </Row>
        )}
        {networks.length >= 0 && (
          <Row>
            <Col sm>
              <Table>
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Created On</th>
                    <th />
                  </tr>
                </thead>
                <tbody>{networks}</tbody>
              </Table>
            </Col>
          </Row>
        )}
      </Container>
    );
  }

  handleShellClose() {
    this.setState({ selectedNetwork: null });
  }

  render() {
    var shellStyle = { height: '70vh' };
    if (this.state.fetching) {
      return this.renderLoading();
    } else if (this.state.selectedNetwork) {
      return (
        <Container>
          <Row>
            <Col style={shellStyle}>
              <InteractiveShell
                networkName={this.state.selectedNetwork}
                handleShellClose={this.handleShellClose.bind(this)}
                {...this.props}
              />
            </Col>
          </Row>
        </Container>
      );
    } else if (this.state.networks) {
      return this.renderNetworks();
    } else if (!this.props.auth.isAuthenticated()) {
      return this.renderNeedsLogin();
    } else {
      return this.renderError();
    }
  }
}

export default Networks;
