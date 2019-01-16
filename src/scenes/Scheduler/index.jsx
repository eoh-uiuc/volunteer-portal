import React, { Component } from 'react';
import { connect } from 'react-redux';

class Scheduler extends Component {
  render() {
    return <p>Scheduler</p>
  }
}

const mapStateToProps = state => ({
});
export default connect(mapStateToProps)(Scheduler);
