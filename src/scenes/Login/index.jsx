import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';

import { login } from 'services/api/login';
import { setJWT } from 'services/user/actions';
import './styles.scss';

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      uid: '',
      pwd: '',
      error: null,
      redirect: false,
    };

    this.handleChange = this.handleChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  handleChange(field) {
    return (e) => {
      this.setState({ error: null, [field]: e.currentTarget.value });
    }
  }

  onSubmit(e) {
    e.preventDefault();
    const { uid, pwd } = this.state;
    const data = { uid, pwd };
    login(data)
      .then(res => {
        if (res.status !== 200) {
          this.setState({ error: res.message });
        } else {
          this.props.setJWT(res.auth_token);
          this.setState({ redirect: true });
        }
      })
      .catch(res => {
        this.setState({ error: 'An error occured, try again later' });
      });
  }

  render() {
    const { redirect, error } = this.state;
    return (
      <div className="login form-wrapper">
        { redirect && <Redirect to="/" /> }
        <Paper className="form">
          <Typography variant="h4">Login</Typography>

          <p className="error">{error}</p>

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

            <Button variant="contained" color="primary" onClick={this.onSubmit} type="submit">
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

const mapDispatchToProps = dispatch => ({
  setJWT: jwt => dispatch(setJWT(jwt)),
});
export default connect(undefined, mapDispatchToProps)(Login);