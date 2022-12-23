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
            <div id="pokemon_list">
                <ul className="container">
                    {pokemon.map((monster) =>
                        <PokemonListItem key={monster.id} id={monster.id} slug={monster.slug} name={monster.name} types={monster.types} default_pokemon={monster.pokemon} />
                    )}
                </ul>
            </div>
        )
    }
}

export default PokemonList;