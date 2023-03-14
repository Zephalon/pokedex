import React, { Component } from 'react';
import { ReactComponent as Icon } from '../svg/star.svg';

class Star extends Component {
    constructor(props) {
        super(props);
        this.state = {
            starred: false
        };
    }

    componentDidMount() {
        this.getLocalstorage();
        window.addEventListener(`update-starred-${this.props.id}`, this.getLocalstorage.bind(this));
    }

    componentDidUpdate(prev_props) {
        if (this.props.id !== prev_props.id) {
            this.setState((state, props) => {
                return {
                    starred: false
                };
            }, () => {this.getLocalstorage()});
        }
    }

    getLocalstorage() {
        try {
            let result = JSON.parse(window.localStorage.getItem('pokemon-data'));
            if (result && result[this.props.id] && result[this.props.id].starred !== undefined) {
                this.setState((state, props) => {
                    return {
                        starred: result[this.props.id].starred
                    };
                });
            }
        } catch (ex) {
            // dont care
        }
    }

    toggleStarred(e) {
        let { id } = this.props;
        let pokemon_data = [];
        let new_state = !this.state.starred;

        try {
            pokemon_data = JSON.parse(window.localStorage.getItem('pokemon-data'));
        } catch (ex) {
            // dont care
        }
        
        if (!pokemon_data) pokemon_data = [];

        if (pokemon_data[id]) {
            pokemon_data[id].starred = new_state;
        } else {
            pokemon_data[id] = {
                starred: new_state
            }
        }

        window.localStorage.setItem('pokemon-data', JSON.stringify(pokemon_data));
        
        this.setState((state, props) => {
            return {
                starred: new_state,
            };
        });

        window.dispatchEvent(new Event(`update-starred-${id}`));
        window.dispatchEvent(new Event('update-localstorage'));
        e.stopPropagation();
    }

    render() {
        let { starred } = this.state;

        return (
            <div className={'star ' + (starred ? 'starred' : '')} onClick={this.toggleStarred.bind(this)}>
                <Icon />
            </div>
        )
    }
}

export default Star;