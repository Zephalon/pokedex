import React, { Component } from 'react';

class Artwork extends Component {
    constructor(props) {
        super(props);
        this.state = {
            artwork_preloaded: false,
            image_unavailable: false
        };
    }

    componentDidUpdate(prev_props) {
        if (prev_props.artwork_url !== this.props.artwork_url) {
            this.setState((state, props) => {
                return {
                    artwork_preloaded: false
                };
            });
            this.preloadArtwork(this.props.artwork_url);
        }
    }

    async componentDidMount() {
        this.preloadArtwork(this.props.artwork_url);
    }

    async preloadArtwork(url) {
        let img = new Image();
        // show artwork image
        img.onload = () => {
            this.setState((state, props) => {
                return {
                    artwork_preloaded: true
                };
            });
        }
        // show fallback image (sprite)
        img.onerror = () => {
            this.setState((state, props) => {
                return {
                    image_unavailable: true,
                    artwork_preloaded: true
                };
            });
        }
        img.src = url;
    }

    render() {
        let { image_unavailable, artwork_preloaded } = this.state;
        let { artwork_url, slug } = this.props;
        if (image_unavailable) artwork_url = 'pokemon_sprites/' + slug + '.png';

        return (
            <div className={'artwork ' + (artwork_preloaded ? 'loaded' : 'loading')}>
                <img src={artwork_preloaded ? artwork_url : 'loading.png'} alt="Artwork" loading="lazy" />
            </div>
        )
    }
}

export default Artwork;