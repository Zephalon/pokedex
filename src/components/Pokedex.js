import React, { Component } from 'react';
import species_list from "../species.json";
import PokemonList from "./PokemonList";

class Pokedex extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  filterSpecies() {
    let { search_request } = this.props;
    if (!search_request) return species_list;

    let result = species_list.filter(species => species.name.toLowerCase().indexOf(search_request.toLowerCase()) > -1)

    return result;
  }

  render() {
    return (
      <div id="pokedex" key={this.props.id}>
        <PokemonList key="pokemon-list" pokemon={this.filterSpecies()} />
      </div >
    );
  }
}

export default Pokedex;