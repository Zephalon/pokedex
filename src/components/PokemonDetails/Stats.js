import React, { Component } from 'react';
import stat_lookup from "../../stat_lookup.json";

class Stats extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    loadingAnimation() {
        return (
            <div className="loading_animation">
                <img src='loading.png' alt='Loading...' loading="lazy" />
            </div>
        );
    }

    statList() {
        let { stats } = this.props;

        let strength = 0;
        stats = stats.map((entry) => {
            strength += entry.base_stat;
            return entry;
        })

        return (
            <ul className="stat_list">
                <li>
                    <span className="name stat-strength">Stärke</span>
                    <span className="value">{strength}</span>
                </li>
                {stats.map((entry) =>
                    <li key={entry.stat.name}>
                        <span className={'name stat-' + entry.stat.name}>{stat_lookup[entry.stat.name]}</span>
                        <span className="value">{entry.base_stat}</span>
                    </li>
                )}
            </ul>
        );
    }

    render() {
        let { stats } = this.props;

        return (
            <div className="stats">
                {!stats ? this.loadingAnimation() : this.statList()}
            </div>
        )
    }
}

export default Stats;