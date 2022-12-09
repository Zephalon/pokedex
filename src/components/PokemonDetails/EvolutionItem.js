import React, { Component } from 'react';

class EvolutionItem extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        let { evolution } = this.props;

        return (
            <div key={evolution.species.name} className="evolution">
                <div className="icon">
                    <img src={'pokemon_sprites/' + evolution.species.name + '.png'} alt={'Icon ' + evolution.species.name} loading="lazy" />
                </div>
                <div className="name">
                    {evolution.species.name}
                </div>
            </div>
        )
    }
}

export default EvolutionItem;