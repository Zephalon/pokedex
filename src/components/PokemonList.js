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
                    { pokemon && pokemon.length ? pokemon.map((monster) =>
                        <PokemonListItem key={monster.id} {...monster} default_pokemon={monster.pokemon} set_starred={this.props.set_starred.bind(this)}/>
                    ) : ''}
                </ul>
            </div>
        )
    }
}

export default PokemonList;