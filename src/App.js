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
      show_card: false,
      card_id: false,
      last_card_id: false,
      search_request: false
    };

    this.last_hash = false;
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
        show_card: true,
        card_id: requested_id,
        last_card_id: this.state.card_id
      };
    });
  }

  reset() {
    window.history.replaceState(null, null, ' '); // reset hash in url

    this.setState((state, props) => {
      return { 
        show_card: false
      };
    });

    this.navigateHash();
  }

  getIdBySlug(slug) {
    let species = pokemon_list.filter(pokemon => pokemon.slug === slug);

    return species.length ? species[0].id : false;
  }

  updateSearch(request) {
    this.setState((state, props) => {
      return { 
        search_request: request
      };
    });
  }

  render() {
    let { show_card, card_id, last_card_id, search_request } = this.state;

    return (
      <div className="app" key={this.props.id}>

        <Header update_search={this.updateSearch.bind(this)} />
        {card_id ? <Pokecard key="pokecard" id={card_id} last_id={last_card_id} display={show_card} close={this.reset.bind(this)} /> : ''}
        <Pokedex search_request={search_request} />
      </div>
    );
  }
}

export default App;