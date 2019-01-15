import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';

import './styles.scss';

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      uid: '',
      pwd: '',
    };

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(field) {
    return (e) => {
      this.setState({ [field]: e.currentTarget.value });
    }
  }

  render() {
    return (
      <div className="login form-wrapper">
        <Paper className="form">
          <Typography variant="h4">Login</Typography>

          <form>
            <TextField
              id="netid"
              label="NetID"
              className="text-field"
              value={this.state.uid}
              onChange={this.handleChange('uid')}
              margin="normal"
              type="text"
            />

            <TextField
              id="pwd"
              label="Password"
              className="text-field"
              value={this.state.pwd}
              onChange={this.handleChange('pwd')}
              margin="normal"
              type="password"
            />

            <Button variant="contained" color="primary">
              Log In
            </Button>
          </form>
        </Paper>

        <Paper className="form">
          <p>New? <Link to="/register">Create an Account</Link></p>
        </Paper>
      </div>
    );
  }
}

export default Login;