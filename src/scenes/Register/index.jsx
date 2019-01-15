import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Paper from '@material-ui/core/Paper';
import Select from '@material-ui/core/Select';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';

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
    };

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(field) {
    return (e) => { this.setState({ [field]: e.target.value }); }
  }

  render() {
    return (
      <div className="register form-wrapper">
        <Paper className="form">
          <Typography variant="h4">Registration</Typography>

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

            <TextField
              id="name"
              label="Name"
              className="text-field"
              value={this.state.name}
              onChange={this.handleChange('name')}
              margin="normal"
              type="text"
            />

            <TextField
              id="phone"
              label="Phone Number"
              className="text-field"
              value={this.state.phone}
              onChange={this.handleChange('phone')}
              margin="normal"
              type="text"
            />

            <FormControl>
              <InputLabel htmlFor="society">Society</InputLabel>
              <Select
                value={this.state.society}
                onChange={this.handleChange('society')}
              >
                <MenuItem value="">None</MenuItem>
                <MenuItem value="eoh">EOH</MenuItem>
                <MenuItem value="bngr">Bhangra</MenuItem>
              </Select>
            </FormControl>

            <Button variant="contained" color="primary">
              Register
            </Button>
          </form>
        </Paper>
      </div>
    );
  }
}

export default Register;