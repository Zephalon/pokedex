import React, { Component } from 'react';

class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  updateSearch(event) {
    this.props.update_search(event.target.value);
  }

  render() {
    return (
      <div id="search" className="container">
        <input type="text" onChange={this.updateSearch.bind(this)} />
      </div >
    );
  }
}

export default Search;