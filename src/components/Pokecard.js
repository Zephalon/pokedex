import React, { Component } from 'react';
import pokemon_list from "../species.json";
import Artwork from "./PokemonDetails/Artwork";
import PokemonDetails from "./PokemonDetails";
import PokemonTitle from "./PokemonTitle";

class Pokecard extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    getSpeciesById(id) {
        let species = pokemon_list.filter(pokemon => pokemon.id === id);

        return species.length ? species[0] : false;
    }

    render() {
        let { id, close } = this.props;

        let species = this.getSpeciesById(id);

        return (
            <div id="pokecard-container">
                <div id="pokecard">
                    <div className={'top type-' + species.types.join('-')}>
                        <PokemonTitle id={id} name={species.name} types={species.types} />
                        <Artwork slug={species.slug} artwork_url={'pokemon_artwork/' + id + '.png'} />
                    </div>
                    <div className="bottom">
                        <PokemonDetails species={species} />
                    </div>
                    <div className={'underlayer type-' + species.types.join('-')}></div>
                </div>
                <div className="curtain" onClick={close}></div>
            </div>
        );
    }
}

export default Pokecard;