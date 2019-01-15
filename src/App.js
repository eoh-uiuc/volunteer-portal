import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';

import Home from 'scenes/Home';
import Login from 'scenes/Login';
import Register from 'scenes/Register';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <Route path="/" exact component={Home} />
          <Route path="/login" exact component={Login} />
          <Route path="/register" exact component={Register} />
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
