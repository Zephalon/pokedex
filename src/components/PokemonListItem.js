import React, { Component } from 'react';
import PokemonListDetails from "./PokemonListDetails";

class PokemonListItem extends Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false,
        };
    }

    switch() {
        this.setState((state, props) => {
            return {
                open: !this.state.open
            };
        });
    }

    render() {
        let { id, name, types } = this.props;
        let { open } = this.state;

        return (
            <li className={'pokemon_list_item type-' + types.join('-') + ' ' + open} onClick={this.switch.bind(this)}>
                <div className="meta">
                    <div className="icon"><img src={'pokemon_icons/' + id + '.png'} alt={'Icon ' + name} loading="lazy" /></div>
                    <div className="title">
                        <div className="name">{name}</div>
                        <div className="types">
                            {types.map((type) =>
                                <span key={id + '-' + type} title={type}>{type}</span>
                            )}
                        </div>
                    </div>
                    <div className="mid">{'#' + id}</div>
                </div>
                { open ? <PokemonListDetails id={id} name={name} /> : '' }
            </li>
        )
    }
}

export default PokemonListItem;