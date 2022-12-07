import React, { Component } from 'react';

class PokemonListDetails extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        let { id, name } = this.props;

        return (
            <div className="details">
                <div className="artwork">
                    <img src={'pokemon_artwork/' + id + '.png'} alt={'Artwork ' + name} loading="lazy" />
                </div>
            </div>
        )
    }
}

export default PokemonListDetails;