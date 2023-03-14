import React, { Component } from 'react';
import Item from "./PokemonList/Item";
import Empty from "./PokemonList/Empty";

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
                    { pokemon.length ? pokemon.map((monster) =>
                        <Item key={monster.id} {...monster} default_pokemon={monster.pokemon} />
                    ) : <Empty /> }
                </ul>
            </div>
        )
    }
}

export default PokemonList;