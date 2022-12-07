import React, { Component } from 'react';
import PokemonListArtwork from "./PokemonListArtwork";

class PokemonListDetails extends Component {
    constructor(props) {
        super(props);
        this.state = {
            artwork_preloaded: false
        };
        this.artwork_url = 'pokemon_artwork/' + props.id + '.png';
    }

    async componentDidMount() {
        this.preloadArtwork(this.artwork_url);
    }

    async preloadArtwork(url) {
        let img = new Image();
        img.onload = () => {
            this.setState((state, props) => {
                return {
                    artwork_preloaded: !this.state.open
                };
            });
        }
        img.src = url;
    }

    render() {
        let { id, name } = this.props;
        let { artwork_preloaded } = this.state;

        return (
            <div className="details">
                <PokemonListArtwork image={artwork_preloaded ? this.artwork_url : 'loading.png'} name={name} />
            </div>
        )
    }
}

export default PokemonListDetails;