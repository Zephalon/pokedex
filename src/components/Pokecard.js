import React, { Component } from 'react';
import species_list from "../species.json";
import Artwork from "./PokemonDetails/Artwork";
import PokemonDetails from "./PokemonDetails";
import PokemonStats from "./PokemonStats";
import PokemonTitle from "./PokemonTitle";
import PokecardNavigation from "./PokecardNavigation";
import Star from "./Star";

class Pokecard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            ready: false
        };
        this.last_species = null;
    }

    componentDidUpdate(prev_props) {
        if (this.props.id !== prev_props.id) {
            this.setState((state, props) => {
                return {
                    ready: false
                };
            });
        }
    }

    getSpeciesById(id) {
        if (!id) id = this.props.id;
        let species = species_list.filter(pokemon => pokemon.id === id);

        return species.length ? species[0] : false;
    }

    setReady() {
        setTimeout(() => {
            this.setState((state, props) => {
                return {
                    ready: true
                };
            });
        }, 10);
    }

    render() {
        let { id, last_id, close } = this.props;
        let { ready } = this.state;

        let species = this.getSpeciesById();
        let last_species = this.getSpeciesById(last_id);
        let state_class = ready ? 'ready' : 'switching';

        if (!ready) this.setReady();

        if (!species) return (<div>Unknown species.</div>);

        return (
            <div id="pokecard-container">
                <div id="pokecard" className={'type type-' + species.types[0] + ' ' + state_class}>
                    <div className="content-wrapper">
                        <div className='visual'>
                            <PokemonTitle id={id} name={species.name} types={species.types} />
                            <Star id={id} />
                            <Artwork slug={species.slug} artwork_url={'pokemon_artwork/' + id + '.png'} />
                        </div>
                        <div className="pokecard-content">
                            <div className="track">
                                <PokemonDetails species={species} />
                                <PokemonStats species={species} />
                            </div>
                        </div>
                        <div className={'underlayer inactive type type-' + (last_species ? last_species.types.join('-') : 'normal')}></div>
                        <div className={'underlayer active type type-' + species.types.join('-')}></div>
                    </div>
                    <div className="shiny"></div>
                </div>
                <PokecardNavigation current_species={species} close={close} />
                <div className="curtain" onClick={close}></div>
            </div>
        );
    }
}

export default Pokecard;