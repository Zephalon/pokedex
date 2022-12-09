import React, { Component } from 'react';
import Text from "./PokemonDetails/Text";
import Stats from "./PokemonDetails/Stats";
import Evolutions from "./PokemonDetails/Evolutions";
import Artwork from "./PokemonDetails/Artwork";

class PokemonListDetails extends Component {
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
            this.loadData('species_data', '/data/species/' + this.props.slug + '.json', this.setData.bind(this));
            this.loadData('pokemon_data', '/data/pokemon/' + this.props.default_pokemon + '.json', this.setData.bind(this));
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
        let { id, name, slug } = this.props;
        let { species_data, pokemon_data } = this.state;

        // get flavored text
        let flavor_text = species_data ? species_data['flavor_text_entries'].filter(text => text.language.name === 'de') : false;

        return (
            <div className="details">
                <Text text={flavor_text} />
                <Stats stats={pokemon_data ? pokemon_data['stats'] : false} />
                <Evolutions species={slug} />
                <Artwork artwork_url={'pokemon_artwork/' + id + '.png'} name={name} />
            </div>
        )
    }
}

export default PokemonListDetails;