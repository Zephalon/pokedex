import React, { Component } from 'react';
import EvolutionItem from "./EvolutionItem";

//import PokemonList from "./../PokemonList";

class Evolutions extends Component {
    constructor(props) {
        super(props);
        this.state = {
            preloaded: false,
            evolution_data: false
        };
        this.evolutions = [];
    }

    async componentDidMount() {
        if (!this.state.preloaded) {
            this.setState((state, props) => {
                return {
                    preloaded: true
                };
            });
            this.loadData('/data/evolutions/' + this.props.species + '.json', this.setData.bind(this));
        }
    }

    async loadData(file, callback) {
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
                callback(data);
            });
    }

    setData(data) {
        this.setState((state, props) => {
            return {
                evolution_data: data
            };
        });
    }

    walkEvolutionChain(chain) {
        this.evolutions.push(chain);
        if (chain.evolves_to && chain.evolves_to.length) {
            chain.evolves_to.forEach(evolution => this.walkEvolutionChain(evolution));
        }
    }

    render() {
        let { evolution_data } = this.state;

        if (evolution_data) {
            // flatten data
            this.evolutions = [];
            this.walkEvolutionChain(evolution_data.chain)
        }

        if (this.evolutions.length > 1) return (
            <div className="evolutions">
                {this.evolutions.map((evolution) =>
                    <EvolutionItem key={evolution.species.name} evolution={evolution} />
                )}
            </div>
        )
    }
}

export default Evolutions;