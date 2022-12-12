import React, { Component } from 'react';
import Text from "./PokemonDetails/Text";
import Stats from "./PokemonDetails/Stats";
import Evolutions from "./PokemonDetails/Evolutions";

class PokemonDetails extends Component {
    constructor(props) {
        super(props);
        this.state = {
            species_data: [],
            pokemon_data: [],
            evolution_data: []
        };
        this.preloaded = [];
    }

    componentDidUpdate(prev_props) {
        if (prev_props.species.slug !== this.props.species.slug) {
            this.getSpeciesData();
        }
    }

    async componentDidMount() {
        this.getSpeciesData();
    }

    async getSpeciesData() {
        let { species } = this.props;

        if (!this.preloaded[species.slug]) {
            this.loadData('species_data', '/data/species/' + species.slug + '.json', this.setData.bind(this));
            this.loadData('pokemon_data', '/data/pokemon/' + species.pokemon + '.json', this.setData.bind(this));
            this.loadData('evolution_data', '/data/evolutions/' + species.slug + '.json', this.setData.bind(this));

            this.preloaded[species.slug] = true; // do not trigger twice
        }
    }

    async loadData(data_key, file, callback) {
        fetch(file, {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        }
        )
            .then(function (response) {
                return response.json();
            })
            .then(function (data) {
                callback(data_key, data);
            });
    }

    async setData(data_key, data) {
        this.setState((state, props) => {
            let new_state = state[data_key];
            new_state[props.species.slug] = data;
            return {
                [data_key]: new_state
            };
        });
    }

    render() {
        let { species } = this.props;
        let { species_data, pokemon_data, evolution_data } = this.state;
        let slug = species.slug;

        // get flavored text
        let flavor_text = species_data[slug] ? species_data[slug]['flavor_text_entries'].filter(text => text.language.name === 'de') : false;

        return (
            <div className="details">
                <Text text={flavor_text} />
                <Stats stats={pokemon_data[slug] ? pokemon_data[slug]['stats'] : false} />
                <Evolutions evolution_data={evolution_data[slug] ? evolution_data[slug] : false} />
            </div>
        )
    }
}

export default PokemonDetails;