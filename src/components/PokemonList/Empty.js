import React, { Component } from 'react';

class Empty extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <div className="pokemon-list-empty">
                Es wurde kein passendes Pokémon gefunden.
            </div>
        )
    }
}

export default Empty;