import React, { Component } from 'react';
import getMultipliers from "../../../../classes/getMultipliers";
import Type from "../../../PokemonType";
import CodeBook from "../../../../classes/CodeBook";

class Weakness extends Component {
    constructor(props) {
        super(props);
        this.state = {
            weaknesses: []
        };
    }

    componentDidMount() {
        this.setMultipliers();
    }

    componentDidUpdate(prev_props) {
        if (prev_props.species.slug !== this.props.species.slug) {
            this.setMultipliers();
        }
    }

    setMultipliers() {
        if (!this.props.species) return;
        let multipliers = getMultipliers(this.props.species.types).defense;
        let structured = [];
    
        for (const [type, multiplier] of Object.entries(multipliers)) {
            if (multiplier !== 1) {
                structured.push({
                    type: type,
                    multiplier: multiplier
                });
            }
        };

        this.setState((state, props) => {
            return {
                weaknesses: CodeBook.sortArrBy(structured, 'multiplier').reverse()
            };
        });
    }

    render() {
        let { weaknesses } = this.state; 

        console.log(weaknesses);

        return (
            <div className="weaknesses">
                <div className="types">
                    { weaknesses.map((weakness) =>
                            <Type unique={weakness.type} type={weakness.type} tag={'×' + weakness.multiplier} />
                    )}
                </div>
            </div>
        )
    }
}

export default Weakness;