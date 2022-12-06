import React, { Component } from 'react';

class PokemonListItem extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        let { id, name } = this.props;

        return (
            <li className="pokemon_list_item">
                <div className="icon"><img src={'pokemon_icons/' + id + '.png'} /></div>
                <div className="name">{name}</div> 
                <div className="id">#{id}</div>
                <div className="types"></div>
            </li>
        )
    }
}

export default PokemonListItem;