import React, { Component } from 'react';

class EvolutionItem extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    open() {
        window.location.hash = '#' + this.props.species.slug;
    }

    render() {
        let { species } = this.props;
        let trigger = false;

        if (species.evolution_details) {
            trigger = '★';

            if (species.evolution_details.trigger.name === 'level-up' && species.evolution_details.min_level) {
                trigger = 'LV' + species.evolution_details.min_level;
            }

            if (species.evolution_details.trigger.name === 'trade') {
                trigger = '↹';
            }

            if (species.evolution_details.trigger.name === 'use-item') {
                trigger = '◆';
            }
        }

        return (
            <div className="evolution" onClick={this.open.bind(this)}>
                <div className={'trigger ' + (trigger ? 'can-evolve' : 'no-evolution')}>
                    <span>{trigger}</span>
                </div>
                <div className="icon">
                    <img src={'pokemon_sprites/' + species.slug + '.png'} alt={'Icon ' + species.name} loading="lazy" />
                    <div className={'icon-background type-' + species.types.join('-')}></div>
                </div>
                <div className="name">
                    <span>{species.name}</span>
                </div>
            </div>
        )
    }
}

export default EvolutionItem;