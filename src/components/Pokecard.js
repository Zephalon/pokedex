import React, { Component } from 'react';
import species_list from "../species.json";
import Artwork from "./PokemonDetails/Artwork";
import PokemonDetails from "./PokemonDetails";
import PokemonTitle from "./PokemonTitle";
import PokecardNavigation from "./PokecardNavigation";

class Pokecard extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    getSpeciesById(id) {
        let species = species_list.filter(pokemon => pokemon.id === id);

        return species.length ? species[0] : false;
    }

    render() {
        let { id, close } = this.props;

        let species = this.getSpeciesById(id);

        return (
            <div id="pokecard-container">
                <div id="pokecard" className={'type type-' + species.types[0]}>
                    <div className='top'>
                        <PokemonTitle id={id} name={species.name} types={species.types} />
                        <Artwork slug={species.slug} artwork_url={'pokemon_artwork/' + id + '.png'} />
                    </div>
                    <div className="bottom">
                        <PokemonDetails species={species} />
                    </div>
                    <div className={'underlayer type type-' + species.types.join('-')}></div>
                </div>
                <PokecardNavigation current_species={species} close={close} />
                <div className="curtain" onClick={close}></div>
            </div>
        );
    }
}

export default Pokecard;