import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Paper from '@material-ui/core/Paper';
import Select from '@material-ui/core/Select';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';

import { register } from 'services/api/register';
import { setJWT } from 'services/user/actions';
import societies from './societies';
import './styles.scss';

class Register extends Component {
  constructor(props) {
    super(props);

    this.state = {
      uid: '',
      pwd: '',
      name: '',
      phone: '',
      society: '',
      error: null,
      redirect: false,
    };

    this.handleChange = this.handleChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  handleChange(field) {
    return (e) => { this.setState({ error: null, [field]: e.target.value }); }
  }

  onSubmit(e) {
    e.preventDefault();
    const { uid, pwd, name, phone, society } = this.state;
    const data = { uid, pwd, name, phone, society };
    register(data)
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
    const { redirect, error, uid, pwd, name, phone, society } = this.state;

    const menuItems = societies.map(s => <MenuItem value={s} key={s}>{s}</MenuItem>);

    return (
      <div className="register form-wrapper">
        { redirect && <Redirect to="/" /> }
        <Paper className="form">
          <Typography variant="h4">Registration</Typography>

          <p className="error">{error}</p>

          <form>
            <TextField
              id="netid"
              label="NetID"
              className="text-field"
              value={uid}
              onChange={this.handleChange('uid')}
              margin="normal"
              type="text"
            />

            <TextField
              id="pwd"
              label="Password"
              className="text-field"
              value={pwd}
              onChange={this.handleChange('pwd')}
              margin="normal"
              type="password"
            />

            <TextField
              id="name"
              label="Name"
              className="text-field"
              value={name}
              onChange={this.handleChange('name')}
              margin="normal"
              type="text"
            />

            <TextField
              id="phone"
              label="Phone Number"
              className="text-field"
              value={phone}
              onChange={this.handleChange('phone')}
              margin="normal"
              type="text"
            />

            <FormControl>
              <InputLabel htmlFor="society">Society</InputLabel>
              <Select
                value={society}
                onChange={this.handleChange('society')}
              >
                <MenuItem value="">None</MenuItem>
                { menuItems }
              </Select>
            </FormControl>

            <Button variant="contained" color="primary" onClick={this.onSubmit} type="submit">
              Register
            </Button>
          </form>
        </Paper>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  setJWT: jwt => dispatch(setJWT(jwt)),
});
export default connect(undefined, mapDispatchToProps)(Register);
