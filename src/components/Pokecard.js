import React, { Component } from 'react';
import pokemon_list from "../species.json";
import Text from "./PokemonDetails/Text";
import Stats from "./PokemonDetails/Stats";
import Evolutions from "./PokemonDetails/Evolutions";
import Artwork from "./PokemonDetails/Artwork";
import PokemonDetails from "./PokemonDetails";

class Pokecard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            preloaded: false,
            species_data: false,
            pokemon_data: false
        };
        this.species = this.getSpeciesById(props.id);
    }

    getSpeciesById(id) {
        let species = pokemon_list.filter(pokemon => pokemon.id === id);

        return species.length ? species[0] : false;
    }

    render() {
        let { id, close } = this.props;
        let { species_data, pokemon_data } = this.state;

        // get flavored text
        let flavor_text = species_data ? species_data['flavor_text_entries'].filter(text => text.language.name === 'de') : false;

        return (
            <div id="pokecard-container" onClick={close}>
                <div id="pokecard">
                    <div className={'top type-' + this.species.types.join('-')}>
                        <Artwork artwork_url={'pokemon_artwork/' + id + '.png'} />
                    </div>
                    <div className="bottom">
                        <PokemonDetails species={this.species} />
                    </div>
                </div>
            </div>
        );
    }
}

export default Pokecard;