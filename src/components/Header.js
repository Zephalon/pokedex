import React, { Component } from 'react';

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div id="header" key={this.props.id}>
        <img src="favicon/favicon-32x32.png" alt="Logo" /> 
        <div id="title">Pokédex</div>
      </div >
    );
  }
}

export default Header;