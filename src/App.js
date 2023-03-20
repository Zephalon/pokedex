import React, { Component } from 'react';

import './App.scss';
import pokemon_list from "./data/species.json";
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
    this.mouse_position = { x: 0, y: 0 };
    this.device_orentation = null;
    this.light_position = { x: 50, y: 50 };

    this.lastCalledTime = Date.now();
    this.fps = [];

    window.addEventListener('mousemove', this.handleMouseMove.bind(this));
    if (window.DeviceOrientationEvent) window.addEventListener('deviceorientation', this.handleOrientation.bind(this), true);
    this.setLightSource();
  }

  setLightSource() {
    /*
    if(!this.lastCalledTime) {
      this.lastCalledTime = Date.now();
      this.fps = [];
      return;
   }
   let delta = (Date.now() - this.lastCalledTime)/1000;
   this.lastCalledTime = Date.now();
   this.fps.push(1/delta);
   if (this.fps.length > 120) this.fps.shift();
   console.log("FPS: " + Math.round(Math.min(...this.fps)));
   */

    //this.handleOrientation({ gamma: Math.random() * 100, beta: Math.random() * 100 });
    //console.log(this.device_orentation);

    const variation = 20;
    const doc = { 'x': document.body.clientWidth, 'y': document.body.clientHeight };
    const source = this.device_orentation ?? this.mouse_position;

    ['x', 'y'].forEach(d => {
      let new_position = (50 - (variation * 0.5)) + ((source[d] / doc[d]) * variation);

      if (Math.abs(this.light_position[d] - new_position) > 0.25) {
        this.light_position[d] = this.light_position[d] + ((new_position - this.light_position[d]) * 0.1);
        const containers = document.getElementsByClassName('shiny-animated');
        for (let container of containers) {
          container.style.setProperty(`--pos${d}`, `${this.light_position[d]}%`);
        }

        const pokecard = document.getElementById('pokecard');
        if (pokecard) pokecard.style.setProperty(`--r${d}`, `${(this.light_position[d] - 50) * 0.1}deg`);
      }
    });

    requestAnimationFrame(this.setLightSource.bind(this));
  }

  handleMouseMove(event) {
    this.mouse_position.x = event.pageX;
    this.mouse_position.y = event.pageY;
  }

  handleOrientation(event) {
    if (event.beta === null || event.gamma === null || isNaN(event.beta) || isNaN(event.gamma)) return;

    const max_angle = 30;
    const clamp = (num, min, max) => Math.min(Math.max(num, min), max);

    this.device_orentation = {
      x: clamp(event.gamma + max_angle, 0, max_angle * 2) / (max_angle * 2) * document.body.clientWidth,
      y: clamp(event.beta + max_angle, 0, max_angle * 2) / (max_angle * 2) * document.body.clientHeight
    }
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

  showSearch(request) {
    this.setState((state, props) => {
      return { 
        search_request: request
      };
    });
  }

  showStarred(request) {
    this.setState((state, props) => {
      return { 
        show_starred: request
      };
    });
  }

  render() {
    let { show_card, card_id, last_card_id, search_request, show_starred } = this.state;

    return (
      <div className="app" key={this.props.id}>

        <Header set_search={this.showSearch.bind(this)} set_starred={this.showStarred.bind(this)} />
        {card_id ? <Pokecard key="pokecard" id={card_id} last_id={last_card_id} display={show_card} close={this.reset.bind(this)} /> : ''}
        <Pokedex search_request={search_request} show_starred={show_starred} />
      </div>
    );
  }
}

export default App;