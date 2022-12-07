import React, { Component } from 'react';

import './App.scss';
import Header from "./components/Header";
import Pokedex from "./components/Pokedex";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="app" key={this.props.id}>
        <Header />
        <Pokedex />
      </div>
    );
  }
}

export default App;