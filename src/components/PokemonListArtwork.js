import React, { Component } from 'react';

class PokemonListArtwork extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        let { image, name } = this.props;

        return (
            <div className="artwork">
                <img src={image} alt={'Artwork ' + name} loading="lazy" />
            </div>
        )
    }
}

export default PokemonListArtwork;