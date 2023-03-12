import React, { Component } from 'react';
import { ReactComponent as Icon } from '../../svg/star.svg';

class StarButton extends Component {
  constructor(props) {
    super(props);
    this.state = {
        active: false,
    };
  }

  toggleStarred() {
    this.setState((state, props) => {
      return {
        active: !state.active
      };
    }, () => {this.props.set_starred(this.state.active)});
  }

  render() {
    let { active } = this.state;

    return (
        <div className={'star option ' + (active ? 'active' : 'inactive')} onClick={this.toggleStarred.bind(this)}>
            <Icon />
        </div>
    );
  }
}

export default StarButton;