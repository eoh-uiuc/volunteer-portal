import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

import './styles.scss';

class Nav extends Component {
  render() {
    return (
      <AppBar position="static" className="nav">
        <Toolbar>
          <Typography variant="h6" color="inherit" className="grow">
            EOH Volunteer Portal
          </Typography>

          { this.props.jwt &&
            <>
              <Link to="/">Timeslots</Link>
              <Link to="/schedule">Your Schedule</Link>
              <Link to="/information">Information</Link>
            </>
          }
        </Toolbar>
      </AppBar>
    );
  }
}

const mapStateToProps = state => ({
  jwt: state.user.jwt,
});
export default connect(mapStateToProps)(Nav);
