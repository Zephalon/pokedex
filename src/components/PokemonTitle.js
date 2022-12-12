import React, { Component } from 'react';
import type_lookup from "../type_lookup.json";

class PokemonTitle extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    render() {
        let { id, name, types } = this.props;

        return (
            <div className="pokemon-title">
                <div className="name">{name}</div>
                <div className="types">
                    {types.map((type) =>
                        <span key={id + '-' + type} title={type}>{type_lookup[type]}</span>
                    )}
                </div>
            </div>
        )
    }
}

export default PokemonTitle;