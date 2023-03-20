import React, { Component } from 'react';
import species_list from "../../data/species.json";

class Navigation extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    getPrevSpeciesId(id) {
        let new_id = id - 1;
        return new_id < 1 ? species_list.length : new_id;
    }

    getNextSpeciesId(id) {
        let new_id = id + 1;
        return new_id > species_list.length ? 1 : new_id;
    }

    getSpeciesById(id) {
        let species = species_list.filter(pokemon => pokemon.id === id);

        return species.length ? species[0].slug : false;
    }

    gotoPrevCard() {
        this.open(this.getSpeciesById(this.getPrevSpeciesId(this.props.current_species.id)));

    }

    gotoNextCard() {
        this.open(this.getSpeciesById(this.getNextSpeciesId(this.props.current_species.id)));
    }

    open(slug) {

        window.location.hash = '#' + slug;
    }

    render() {
        let { current_species, close } = this.props;

        return (
            <div className="pokecard_navigation">
                <div className="prev" onClick={this.gotoPrevCard.bind(this)}><span className="icon">⇠ #{this.getPrevSpeciesId(current_species.id)}</span></div>
                <div className="close" onClick={close}><span className="icon">✕</span></div>
                <div className="next" onClick={this.gotoNextCard.bind(this)}><span className="icon">#{this.getNextSpeciesId(current_species.id)} ⇢</span></div>
            </div>
        )
    }
}

export default Navigation;