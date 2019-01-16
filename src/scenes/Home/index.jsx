import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import Scheduler from 'scenes/Scheduler';

class Home extends Component {
  render() {
    const { jwt } = this.props;
    if (jwt === null) {
      return <Redirect to="/login" />;
    }
    return <Scheduler />;
  }
}

const mapStateToProps = state => ({
  jwt: state.user.jwt,
});
export default connect(mapStateToProps)(Home);
