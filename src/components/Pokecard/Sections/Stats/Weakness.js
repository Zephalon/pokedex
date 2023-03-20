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
        let structured = {};

        for (const [type, multiplier] of Object.entries(multipliers)) {
            if (!structured[multiplier]) structured[multiplier] = [];
            structured[multiplier].push(type);
        };
        delete structured[1];
        
        console.log(CodeBook.sortObj(structured));

        this.setState((state, props) => {
            return {
                weaknesses: CodeBook.sortObj(structured)
            };
        });
    }

    render() {
        let { weaknesses } = this.state;

        console.log(weaknesses);

        return (
            <div className="weaknesses">
                { weaknesses.map((weakness) =>
                    <div className="weakness" key={weakness.key}>
                        <div className="effectivness">
                            <span>{weakness.key}x</span>
                        </div>
                        <div className="types">
                            { weakness.content.map((type) =>
                                <Type unique={weakness} type={type} />
                            )}
                        </div>
                    </div>
                )}
            </div>
        )
    }
}

export default Weakness;