import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter, Route } from 'react-router-dom';

import Home from 'scenes/Home';
import Login from 'scenes/Login';
import Register from 'scenes/Register';
import store from './services/store';

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <BrowserRouter>
          <div className="App">
            <Route path="/" exact component={Home} />
            <Route path="/login" exact component={Login} />
            <Route path="/register" exact component={Register} />
          </div>
        </BrowserRouter>
      </Provider>
    );
  }
}

export default App;
