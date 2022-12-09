import React, { Component } from 'react';

import './App.scss';
import pokemon_list from "./species.json";
import Header from "./components/Header";
import Pokedex from "./components/Pokedex";
import Pokecard from "./components/Pokecard";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      card_id: false
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

  navigateHash() {
    if (window.location.hash === this.last_hash) return; // do not fire twice
    this.last_hash = window.location.hash;

    let requested_slug = window.location.hash.substring(1);
    let requested_id = this.getIdBySlug(requested_slug);

    this.setState((state, props) => {
      return {
        card_id: requested_id
      };
    });
  }

  reset() {
    window.history.replaceState(null, null, ' '); // reset hash in url

    this.setState((state, props) => {
      return { 
        card_id: false
      };
    });

    this.navigateHash();
  }

  getIdBySlug(slug) {
    let species = pokemon_list.filter(pokemon => pokemon.slug === slug);

    return species.length ? species[0].id : false;
  }

  render() {
    let { card_id } = this.state;
    let overlay = [];

    if (card_id) {
      overlay.push(<Pokecard key="pokecard" id={card_id} close={this.reset.bind(this)} />);
    }


    return (
      <div className="app" key={this.props.id}>
        <Header />
        {overlay}
        <Pokedex />
      </div>
    );
  }
}

export default App;