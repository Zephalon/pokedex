import React, { Component } from 'react';

class Stats extends Component {
    constructor(props) {
        super(props);
        this.state = {};

        this.stat_list = [
            {
                title: 'Kampfpunkte',
                id: 'hp'
            },
            {
                title: 'Initiative',
                id: 'speed'
            },
            {
                title: 'Angriff',
                id: 'attack'
            },
            {
                title: 'Sp.-Angriff',
                id: 'special-attack'
            },
            {
                title: 'Verteidigung',
                id: 'defense'
            },
            {
                title: 'Sp.-Verteidigung',
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

    getStatValue(key) {
        let { stats } = this.props;

        if (!stats) return '?';

        let entry = stats.filter(stat => stat.stat.name === key);

        return entry ? entry[0].base_stat : '?';
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
                            <span className="title">{stat.title}:</span>
                            <span className="value">{this.getStatValue(stat.id)}</span>
                            <span className="progress" style={{ width: ((this.getStatValue(stat.id) / 100) * 75) + '%' }}></span>
                        </div>
                    )}
                </div>
            </div>
        )
    }
}

export default Stats;