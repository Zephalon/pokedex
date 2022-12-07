import React, { Component } from 'react';
import PokemonListItem from "./PokemonListItem";

class PokemonList extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        let { pokemon } = this.props;

        return (
            <ul id="pokemon_list">
                
                {pokemon.map((monster) =>
                    <PokemonListItem key={monster.id} id={monster.id} name={monster.name} types={monster.types} />
                )}
            </ul>
        )
    }
}

export default PokemonList;