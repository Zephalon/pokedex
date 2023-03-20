import React, { Component } from 'react';
import Type from "./PokemonType";

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
                        <Type key={name + type} unique={name} type={type} />
                    )}
                </div>
            </div>
        )
    }
}

export default PokemonTitle;