import React, { Component } from 'react';
import type_lookup from "../type_lookup.json";

class PokemonListItem extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    open() {
        window.location.hash = '#' + this.props.slug;
    }

    render() {
        let { id, name, slug, types } = this.props;
        let { open } = this.state;

        return (
            <li className={'pokemon_list_item type-' + types.join('-')} onClick={this.open.bind(this)}>
                <div className="meta">
                    <div className="icon"><img src={'pokemon_sprites/' + slug + '.png'} alt={'Icon ' + name} loading="lazy" /></div>
                    <div className="title">
                        <div className="name">{name}</div>
                        <div className="types">
                            {types.map((type) =>
                                <span key={id + '-' + type} title={type}>{type_lookup[type]}</span>
                            )}
                        </div>
                    </div>
                    <div className="mid">{'#' + id}</div>
                </div>
                <div className="pattern"></div>
            </li>
        )
    }
}

export default PokemonListItem;