import React, { Component } from 'react';
import species_list from "../species.json";
import PokemonList from "./PokemonList";

class Pokedex extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pokemon_list: [],
      pokemon_data: []
    };
  }

  componentDidMount() {
    this.getLocalstorage();
  }

  getLocalstorage() {
    let result = false;

    try {
      result = JSON.parse(window.localStorage.getItem('pokemon-data'));
    } catch (ex) {
      // dont care
    }

    this.setState((state, props) => {
      return {
        pokemon_data: result ?? [],
        pokemon_list: this.mergePokemonData(result)
      };
    });
  }

  setStarred(id, state) {
    let { pokemon_data } = this.state;

    if (pokemon_data[id]) {
      pokemon_data[id].starred = state;
    } else {
      pokemon_data[id] = {
        starred: state
      }
    }
    
    this.setState((state, props) => {
      return {
        pokemon_data: pokemon_data,
        pokemon_list: this.mergePokemonData(pokemon_data)
      };
    }, () => { window.localStorage.setItem('pokemon-data', JSON.stringify(this.state.pokemon_data)) });
  }
  
  mergePokemonData(pokemon_data) {
    if (!pokemon_data) return species_list;
    return species_list.map((item, i) => Object.assign({}, item, pokemon_data[item.id]));
  }

  filterSpecies() {
    let { search_request, show_starred } = this.props;
    let { pokemon_list } = this.state;

    let result = pokemon_list;

    if (pokemon_list && pokemon_list.length) {
      if (show_starred) result = result.filter(pokemon => pokemon.starred);
      if (search_request) result = result.filter(pokemon => pokemon.name.toLowerCase().indexOf(search_request.toLowerCase()) > -1);
    }

    return result;
  }

  render() {
    return (
      <div id="pokedex" key={this.props.id}>
        <PokemonList key="pokemon-list" pokemon={this.filterSpecies()} set_starred={this.setStarred.bind(this)} />
      </div >
    );
  }
}

export default Pokedex;