import React, { Component } from 'react';

class Logo extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }


  render() {
    return (
        <div className="logo">
            <img src="favicon/android-chrome-512x512.png" alt="Logo" />
            <div id="title">Pokédex</div>
        </div>
    );
  }
}

export default Logo;