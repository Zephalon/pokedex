import React, { Component } from 'react';

class Stats extends Component {
    constructor(props) {
        super(props);
        this.state = {};

        this.stat_list = [
            {
                title: 'Kampfpunkte',
                title_short: 'KP',
                id: 'hp'
            },
            {
                title: 'Initiative',
                title_short: 'INIT',
                id: 'speed'
            },
            {
                title: 'Angriff',
                title_short: 'ANG',
                id: 'attack'
            },
            {
                title: 'Sp.-Angriff',
                title_short: 'Sp.A.',
                id: 'special-attack'
            },
            {
                title: 'Verteidigung',
                title_short: 'VER',
                id: 'defense'
            },
            {
                title: 'Sp.-Verteidigung',
                title_short: 'Sp.V.',
                id: 'special-defense'
            }
        ]
    }

    getStrength() {
        let { stats } = this.props;
        let strength = 0;

        if (stats) {
            strength = 0;
            stats = stats.map((entry) => {
                strength += entry.base_stat;
                return entry;
            })
        }

        return strength ? strength : '?';
    }

    getStatValue(key, return_questionmark = true) {
        let { stats } = this.props;
        let default_value = return_questionmark ? '?' : 0;

        if (!stats) return default_value;

        let entry = stats.filter(stat => stat.stat.name === key);

        return entry ? entry[0].base_stat : default_value;
    }

    render() {
        Object.entries(this.stat_list).forEach(entry =>
            console.log(entry)
        )

        return (
            <div className="stats">
                <div className="strength">
                    <span>{this.getStrength()}</span>
                </div>
                <div className="substats">
                    {this.stat_list.map((stat) =>
                        <div className="stat">
                            <div className="text">
                                <span className="title">{stat.title}:</span>
                                <span className="title-short">{stat.title_short}:</span>
                                <span className="value">{this.getStatValue(stat.id)}</span>
                            </div>
                            <span className="progress" style={{ width: ((this.getStatValue(stat.id, false) / 100) * 75) + '%' }}></span>
                        </div>
                    )}
                </div>
            </div>
        )
    }
}

export default Stats;