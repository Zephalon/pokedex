import React, { Component } from 'react';
import EvolutionItem from "./EvolutionItem";
import pokemon_list from "../../species.json";

//import PokemonList from "./../PokemonList";

class Evolutions extends Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.evolutions = [];
    }

    walkEvolutionChain(chain) {
        let species = pokemon_list.filter(pokemon => pokemon.slug === chain.species.name);
        if (species.length) {
            species[0]['evolution_details'] = chain.evolution_details[0];
            this.evolutions.push(species[0]);
        }

        // more?
        if (chain.evolves_to && chain.evolves_to.length) {
            chain.evolves_to.forEach(evolution => this.walkEvolutionChain(evolution));
        }
    }

    render() {
        let { evolution_data, active_pokemon } = this.props;

        if (evolution_data) {
            // flatten data
            this.evolutions = [];
            this.walkEvolutionChain(evolution_data.chain)
        }

        if (this.evolutions.length > 0) {
            return (
                <div className="evolutions">
                    {this.evolutions.map((evolution) =>
                        <EvolutionItem key={evolution.name} species={evolution} active={evolution.slug === active_pokemon} />
                    )}
                </div>
            )
        } else {
            return (
                <div className="evolutions loading">
                    <img src="loading.png" alt="loading animation" loading="lazy" />
                </div>
            )
        }
    }
}

export default Evolutions;