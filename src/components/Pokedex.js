import React, { Component } from 'react';
import pokemon_list from "../pokemon.json";
import PokemonList from "./PokemonList";

class Pokedex extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
    };

    this.last_hash = '';
    this.loaded = false;
  }

  async componentDidMount() {
    this.navigateHash(); // navigate to folder or page if hash is set

    if (!this.loaded) {
      window.addEventListener('hashchange', this.navigateHash.bind(this), false);
    }
    this.loaded = true;
  }

  // navigate to the set location
  navigateHash() {
    if (window.location.hash === this.last_hash) return; // do not fire twice
    this.last_hash = window.location.hash;

    // get requested 
    let current_pokemon = window.location.hash.substring(2);

    // set navigation state
    this.setState((state, props) => {
      return {
        open: current_pokemon
      };
    });
  }

  openPokemon(id) {
  }

  closePokemon() {
    window.history.replaceState(null, null, ' '); // reset hash in url

    this.setState((state, props) => {
      return { open: false };
    });

    this.navigateHash();
  }

  render() {
    let { open } = this.state;

    return (
      <div id="pokedex" key={this.props.id}>
        <PokemonList key="pokemon-list" pokemon={pokemon_list} open={open} />
      </div >
    );
  }
}

export default Pokedex;