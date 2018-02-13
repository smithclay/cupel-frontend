import React, { Component } from 'react';
import request from 'superagent';
import { Table } from 'reactstrap';
import { Button, ButtonGroup } from 'reactstrap';
import { Container, Row, Col } from 'reactstrap';

class Networks extends Component {
  state = { fetching: true, networks: null };
  /*componentWillMount() {
    this.setState();
  }*/

  componentDidMount() {
    this.fetchNetworks();
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

  createNetwork() {
    return request
      .post('https://api.cupel.io/networks')
      .set('Authorization', `Bearer ${this.props.auth.getIdToken()}`)
      .then(res => {
        console.log('created network', res.body);
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
        console.log('deleted network', res.body);
        //this.fetchNetworks();
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

  renderError() {
    return <Container>Error!</Container>;
  }

  renderNetworks() {
    const createButtonStyle = {
      float: 'right',
      marginBottom: '10px'
    };
    var networks = this.state.networks.map(n => {
      return (
        <tr key={n.network_id}>
          <td>{n.network_id}</td>
          <td>{n.created_on}</td>
          <td>
            <ButtonGroup size="sm">
              <Button outline color="info">
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
                    <th>ID</th>
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

  render() {
    if (this.state.fetching) {
      return this.renderLoading();
    } else if (this.state.networks) {
      return this.renderNetworks();
    } else {
      return this.renderError();
    }
  }
}

export default Networks;
