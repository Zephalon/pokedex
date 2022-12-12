import React, { Component } from 'react';
import PokemonTitle from "./PokemonTitle";

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

        return (
            <li className={'pokemon_list_item type-' + types.join('-')} onClick={this.open.bind(this)}>
                <div className="meta">
                    <div className="icon"><img src={'pokemon_sprites/' + slug + '.png'} alt={'Icon ' + name} loading="lazy" /></div>
                    <PokemonTitle id={id} name={name} types={types} />
                    <div className="mid">{'#' + id}</div>
                </div>
                <div className="pattern"></div>
            </li>
        )
    }
}

export default PokemonListItem;