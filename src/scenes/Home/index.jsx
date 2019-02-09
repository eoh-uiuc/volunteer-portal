import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import Scheduler from 'scenes/Scheduler';

class Home extends Component {
  render() {
    const { jwt, uid } = this.props;
    console.log(uid);
    if (jwt === null) {
      return <Redirect to="/login" />;
    }
    return <Scheduler />;
  }
}

const mapStateToProps = state => ({
  jwt: state.user.jwt,
  uid: state.user.uid,
});
export default connect(mapStateToProps)(Home);
