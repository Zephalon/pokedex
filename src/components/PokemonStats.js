import React, { Component } from 'react';
import Stats from "./PokemonDetails/Stats";

class PokemonStats extends Component {
    constructor(props) {
        super(props);
        this.state = {
            species_data: [],
            pokemon_data: [],
            evolution_data: []
        };
        this.preloading = [];
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
        let { species_data, evolution_data } = this.state;

        if (this.preloading[species.slug]) return

        if (!species_data[species.slug]) {
            this.loadData('species_data', species.slug, '/data/species/' + species.slug + '.json', this.setData.bind(this));
            this.loadData('pokemon_data', species.slug, '/data/pokemon/' + species.pokemon + '.json', this.setData.bind(this));
        }

        if (!evolution_data[species.evolution_id]) {
            this.loadData('evolution_data', species.evolution_id, '/data/evolutions/' + species.evolution_id + '.json', this.setData.bind(this));
        }

        this.preloading[species.slug] = true;
    }

    async loadData(data_property, data_key, file, callback) {
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
                callback(data_property, data_key, data);
            }).catch(function() {
                callback(data_property, data_key, []);
            });
    }

    async setData(data_property, data_key, data) {
        this.setState((state, props) => {
            let new_state = state[data_property];
            new_state[data_key] = data;
            return {
                [data_property]: new_state
            };
        });
    }

    render() {
        let { species } = this.props;
        let { pokemon_data } = this.state;
        let slug = species.slug;

        return (
            <div className="details">
                <Stats stats={pokemon_data[slug] ? pokemon_data[slug]['stats'] : false} />
            </div>
        )
    }
}

export default PokemonStats;