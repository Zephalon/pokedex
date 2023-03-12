import React, { Component } from 'react';
import { ReactComponent as Icon } from '../../svg/search.svg';

class SearchButton extends Component {
  constructor(props) {
    super(props);
    this.state = {
        active: false,
    };
  }

  toggleSearchBar() {
    this.setState((state, props) => {
      return {
        active: !state.active
      };
    }, () => {this.props.set_searchbar(this.state.active)});
  }

  render() {
    let { active } = this.state;

    return (
        <div className={'search option ' + (active ? 'active' : 'inactive')} onClick={this.toggleSearchBar.bind(this)}>
            <Icon />
        </div>
    );
  }
}

export default SearchButton;