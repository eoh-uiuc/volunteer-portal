import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import jwt_decode from 'jwt-decode';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

import './styles.scss';

class Nav extends Component {
  render() {
    return (
      <AppBar position="static" className="nav">
        <Toolbar>
          <Link to="/" className="grow">
            <Typography variant="h6" color="inherit">
              EOH Volunteer Portal
            </Typography>
          </Link>

          { this.props.jwt &&
            <>
              <Link to="/">Timeslots</Link>
              <Link to="/schedule">Your Schedule</Link>
              <Link to="/information">Information</Link>
            </>
          }
          { this.props.jwt && (jwt_decode(this.props.jwt).sub === "admin" || jwt_decode(this.props.jwt).sub === "devyesh2") &&
            <>
              <Link to="/Checkin">Checkin</Link>
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
