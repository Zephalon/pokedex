import React, { Component } from 'react';
import species_list from "../species.json";

class PokecardNavigation extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    getSpeciesById(id) {
        let species = species_list.filter(pokemon => pokemon.id === id);

        return species.length ? species[0].slug : false;
    }


    gotoPrevCard() {
        let new_id = this.props.current_species.id - 1;
        if (new_id < 1) new_id = species_list.length;
        this.open(this.getSpeciesById(new_id));
    }

    gotoNextCard() {
        let new_id = this.props.current_species.id + 1;
        if (new_id > species_list.length) new_id = 1;
        this.open(this.getSpeciesById(new_id));
    }

    open(slug) {

        window.location.hash = '#' + slug;
    }

    render() {
        let { close } = this.props;

        return (
            <div className="pokecard_navigation">
                <div className="prev" onClick={this.gotoPrevCard.bind(this)}><span class="icon">◄</span></div>
                <div className="close" onClick={close}><span class="icon">✕</span></div>
                <div className="next" onClick={this.gotoNextCard.bind(this)}><span class="icon">►</span></div>
            </div>
        )
    }
}

export default PokecardNavigation;