import React, { Component } from 'react';
import PokemonTitle from "./PokemonTitle";
import { ReactComponent as Icon } from '../svg/star.svg';

class PokemonListItem extends Component {
    constructor(props) {
        super(props);
        this.state = {
            is_starred: false
        };
    }

    open() {
        window.location.hash = '#' + this.props.slug;
    }

    toggleStarred() {
        this.props.set_starred(this.props.id, !this.props.starred)
    }

    render() {
        let { id, name, slug, types, starred } = this.props;

        return (
            <li className={'pokemon_list_item type-' + types.join('-')} onClick={this.open.bind(this)}>
                <div className="meta">
                    <div className="icon"><img src={'pokemon_sprites/' + slug + '.png'} alt={'Icon ' + name} loading="lazy" /></div>
                    <PokemonTitle id={id} name={name} types={types} />
                    <div className={'mid ' + (starred ? 'starred' : '')} onClick={(e) => {
             e.stopPropagation(); this.toggleStarred();}}>
                        <span></span>
                        <Icon />
                    </div>
                </div>
                <div className="pattern"></div>
            </li>
        )
    }
}

export default PokemonListItem;