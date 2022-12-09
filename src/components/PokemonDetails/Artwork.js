import React, { Component } from 'react';

class Artwork extends Component {
    constructor(props) {
        super(props);
        this.state = {
            artwork_preloaded: false
        };
    }

    async componentDidMount() {
        this.preloadArtwork(this.props.artwork_url);
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
        let { artwork_url, name } = this.props;
        let { artwork_preloaded } = this.state;

        return (
            <div className="artwork">
                <img src={artwork_preloaded ? artwork_url : 'loading.png'} alt={'Artwork ' + name} loading="lazy" />
            </div>
        )
    }
}

export default Artwork;