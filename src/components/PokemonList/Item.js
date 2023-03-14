import React, { Component } from 'react';
import PokemonTitle from "../PokemonTitle";
import Star from "../Star";

class Item extends Component {
    constructor(props) {
        super(props);
        this.state = {
            is_starred: false
        };
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
                    <Star id={id} />
                </div>
                <div className="pattern"></div>
            </li>
        )
    }
}

export default Item;