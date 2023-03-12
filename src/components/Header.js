import React, { Component } from 'react';
import Search from "./Header/Search";

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      show_search_bar: false
    };
  }

  toggleSearchBar() {
    this.setState((state, props) => {
      return {
        show_search_bar: !state.show_search_bar
      };
    }, () => {this.updateSearch()});
  }

  updateSearch(request) {
    this.props.update_search(!this.state.show_search_bar ? false : request ?? false);
  }

  render() {
    let { show_search_bar } = this.state;
    let component = false;

    if (show_search_bar) {
      component = <Search update_search={this.updateSearch.bind(this)} />;
    }

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
          <div className="search" onClick={this.toggleSearchBar.bind(this)}>
            <img src="icons/search.svg" alt="Search" />
          </div>
        </div>
        {component}
      </div >
    );
  }
}

export default Header;