import React, { Component } from 'react';
import PokemonTitle from "../PokemonTitle";
import { ReactComponent as Icon } from '../../svg/star.svg';

class Empty extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <div className="pokemon-list-empty">
                Es wurde kein passendes Pokémon gefunden.
            </div>
        )
    }
}

export default Empty;