import React, { Component } from 'react';
import type_lookup from "../data/all_types.json";

class Type extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    render() {
        let { unique, type, tag } = this.props;
        let el_tag;

        if (tag) el_tag = <div className="tag"><span>{tag}</span></div>;

        return (
            <div className="pokemon-type" key={'type-' + unique ? unique : Math.random() * 1000} title={type}>
                <div className="name"><span>{type_lookup[type].name}</span></div>
                {el_tag}
            </div>
        )
    }
}

export default Type;