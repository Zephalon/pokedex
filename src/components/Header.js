import React, { Component } from 'react';

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div id="header" key={this.props.id}>
        <div className="container">
          <div className="start">
            <img src="icons/star-filled.svg" alt="Star" />
          </div>
          <div className="logo">
            <img src="favicon/android-chrome-512x512.png" alt="Logo" />
            <div id="title">Pokédex</div>
          </div>
          <div className="search">
            <img src="icons/search.svg" alt="Search" />
          </div>
        </div>
      </div >
    );
  }
}

export default Header;