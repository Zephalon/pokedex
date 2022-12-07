import React, { Component } from 'react';

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div id="header" key={this.props.id}>
        <img src="favicon/android-chrome-512x512.png" alt="Logo" /> 
        <div id="title">Pokédex</div>
      </div >
    );
  }
}

export default Header;