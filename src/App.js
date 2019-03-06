import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter, Route } from 'react-router-dom';
import jwtDecode from 'jwt-decode';

import Home from 'scenes/Home';
import Login from 'scenes/Login';
import Register from 'scenes/Register';
import Personal from 'scenes/Personal';
import Information from 'scenes/Information';
import Checkin from 'scenes/Checkin';
import Admin from 'scenes/Admin';
import Nav from 'components/Nav';
import { setJWT } from 'services/user/actions';

import store from './services/store';

const jwt = localStorage.getItem('jwt');
if (jwt && jwt !== 'null') {
  if (jwtDecode(jwt).exp > (new Date()).getTime() / 1000) {
    store.dispatch(setJWT(jwt));
  }
}

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <BrowserRouter>
          <div className="App">
            <Nav />
            <Route path="/" exact component={Home} />
            <Route path="/schedule" exact component={Personal} />
            <Route path="/information" exact component={Information} />
            <Route path="/login" exact component={Login} />
            <Route path="/register" exact component={Register} />
            <Route path="/checkin" exact component={Checkin} />
            <Route path="/admin" component={Admin} />
          </div>
        </BrowserRouter>
      </Provider>
    );
  }
}

export default App;
