import React, { Component } from 'react';
import Text from "./PokemonDetails/Text";
import Stats from "./PokemonDetails/Stats";
import Evolutions from "./PokemonDetails/Evolutions";
import Artwork from "./PokemonDetails/Artwork";

class PokemonDetails extends Component {
    constructor(props) {
        super(props);
        this.state = {
            preloaded: false,
            species_data: false,
            pokemon_data: false
        };
    }

    async componentDidMount() {
        if (!this.state.preloaded) {
            this.setState((state, props) => {
                return {
                    preloaded: true
                };
            });
            this.loadData('species_data', '/data/species/' + this.props.species.slug + '.json', this.setData.bind(this));
            this.loadData('pokemon_data', '/data/pokemon/' + this.props.species.pokemon + '.json', this.setData.bind(this));
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

    setData(data_key, data) {
        this.setState((state, props) => {
            return {
                [data_key]: data
            };
        });
    }

    render() {
        let { species } = this.props;
        let { species_data, pokemon_data } = this.state;
        
        // get flavored text
        let flavor_text = species_data ? species_data['flavor_text_entries'].filter(text => text.language.name === 'de') : false;

        return (
            <div className="details">
                <Text text={flavor_text} />
                <Stats stats={pokemon_data ? pokemon_data['stats'] : false} />
                <Evolutions species={species.slug} />
                <Artwork artwork_url={'pokemon_artwork/' + species + '.png'} name={species.name} />
            </div>
        )
    }
}

export default PokemonDetails;