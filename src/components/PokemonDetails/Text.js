import React, { Component } from 'react';

class Text extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        let { text } = this.props;

        return (
            <div className="text">
                { !text ? 'Lade...' : text[0]['flavor_text'] }
            </div>
        )
    }
}

export default Text;