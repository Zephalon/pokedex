import React, { Component } from 'react';

class PokemonListItem extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        let { id, name, types } = this.props;

        return (
            <li className={'pokemon_list_item type-' + types.join('-')}>
                <div className="icon"><img src={'pokemon_icons/' + id + '.png'} /></div>
                <div className="title">
                    <div className="name">{name}</div>
                    <div className="types">
                        {types.map((type) =>
                            <span key={id + '-' + type} title={type}>{type}</span>
                        )}
                    </div>
                </div>
                <div className="mid">{'#' + id}</div>
            </li>
        )
    }
}

export default PokemonListItem;