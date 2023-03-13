import React, { Component } from 'react';
import StarButton from "./Header/StarButton";
import SearchButton from "./Header/SearchButton";
import Logo from "./Header/Logo";
import SearchBar from "./Header/SearchBar";

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      show_search_bar: false
    };
  }

  setSearchBar(new_state) {
    this.setState((state, props) => {
      return {
        show_search_bar: new_state
      };
    }, () => {this.updateSearch()});
  }

  // proxy to modify request
  updateSearch(request) {
    this.props.set_search(!this.state.show_search_bar ? false : request ?? false);
  }

  render() {
    let { show_search_bar } = this.state;

    return (
      <div id="header" key={this.props.id}>
        <div className="top-bar">
          <div className="container">
            <Logo />
            <StarButton set_starred={this.props.set_starred} />
            <SearchButton set_searchbar={this.setSearchBar.bind(this)} />
          </div>
        </div>
        <SearchBar update_search={this.updateSearch.bind(this)} show={show_search_bar} />
      </div >
    );
  }
}

export default Header;