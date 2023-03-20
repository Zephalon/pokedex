import React, { Component } from 'react';
import type_lookup from "../data/all_types.json";

class Type extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    render() {
        let { unique, type } = this.props;

        return (
            <span className="pokemon-type" key={'type-' + unique ? unique : Math.random() * 1000} title={type}>{type_lookup[type].name}</span>
        )
    }
}

export default Type;