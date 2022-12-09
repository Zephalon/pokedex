import React, { Component } from 'react';
import pokemon_list from "../species.json";
import PokemonList from "./PokemonList";

class Pokedex extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div id="pokedex" key={this.props.id}>
        <PokemonList key="pokemon-list" pokemon={pokemon_list} />
      </div >
    );
  }
}

export default Pokedex;