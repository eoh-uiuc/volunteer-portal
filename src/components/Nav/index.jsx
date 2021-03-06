import React, { Fragment, useState } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import AppBar from '@material-ui/core/AppBar';
import Drawer from '@material-ui/core/Drawer';
import IconButton from '@material-ui/core/IconButton';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import ClockIcon from '@material-ui/icons/AccessTime';
import EventIcon from '@material-ui/icons/Event';
import BallotIcon from '@material-ui/icons/Ballot';
import MenuIcon from '@material-ui/icons/Menu';
import CheckinIcon from '@material-ui/icons/Whatshot';
import LogoutIcon from '@material-ui/icons/KeyboardBackspace';

import { withAdmin } from 'components/Auth';
import { clearJWT as clearJWTAction } from 'services/user/actions';

import './styles.scss';

const Checkin = withAdmin(() => (
  <Link to="/Checkin">
    <ListItem button>
      <ListItemIcon>
        <CheckinIcon />
      </ListItemIcon>
      <ListItemText primary="Checkin" />
    </ListItem>
  </Link>
), false);

const SideList = (props) => {
  return (
    <List>
      <Link to="/">
        <ListItem button>
          <ListItemIcon>
            <ClockIcon />
          </ListItemIcon>
          <ListItemText primary="Timeslots" />
        </ListItem>
      </Link>
      <Link to="/schedule">
        <ListItem button>
          <ListItemIcon>
            <EventIcon />
          </ListItemIcon>
          <ListItemText primary="My Schedule" />
        </ListItem>
      </Link>
      <Link to="/information">
        <ListItem button>
          <ListItemIcon>
            <BallotIcon />
          </ListItemIcon>
          <ListItemText primary="Information" />
        </ListItem>
      </Link>
      <Checkin />
      <ListItem button onClick={() => props.clearJWT()} >
        <ListItemIcon>
          <LogoutIcon />
        </ListItemIcon>
        <ListItemText primary="Log Out" />
      </ListItem>
    </List>
  );
}

const Nav = (props) => {
  const [ open, setOpen ] = useState(false);

  return (
    <Fragment>
      <Drawer anchor="left" open={open} onClose={() => setOpen(false)}>
        <div
          tabIndex={0}
          role="button"
          onClick={() => setOpen(false)}
          onKeyDown={() => setOpen(false)}
        >
          <SideList clearJWT={props.clearJWT} />
        </div>
      </Drawer>

      <AppBar position="static" className="nav">
        <Toolbar>
          { props.jwt &&
            <IconButton color="inherit" aria-label="Menu" onClick={() => setOpen(true)}>
              <MenuIcon />
            </IconButton>
          }

          <Link to="/" className="grow">
            <Typography variant="h6" color="inherit">
              EOH Volunteer Portal
            </Typography>
          </Link>
        </Toolbar>
      </AppBar>
    </Fragment>
  );
};

const mapStateToProps = state => ({
  jwt: state.user.jwt,
});
const mapDispatchToProps = {
  clearJWT: clearJWTAction,
};
export default connect(mapStateToProps, mapDispatchToProps)(Nav);
