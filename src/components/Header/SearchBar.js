import React, { Component } from 'react';

class SearchBar extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  updateSearch(event) {
    this.props.update_search(event.target.value);
  }

  render() {
    let { show } = this.props;

    return (
      <div id="search_bar" className={'container ' + (show ? 'active' : 'inactive')}>
        <input type="text" onChange={this.updateSearch.bind(this)} />
      </div >
    );
  }
}

export default SearchBar;