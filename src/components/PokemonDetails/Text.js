import React, { Component } from 'react';

class Text extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        let { species_data } = this.props;
        let type_description, flavor_text;

        // get flavored text
        if (species_data) {
            let result_td = species_data['genera'].filter(text => text.language.name === 'de');
            type_description = result_td.length ? result_td[0].genus + '. ' : '';

            let result_ft = species_data['flavor_text_entries'].filter(text => text.language.name === 'de');
            flavor_text = result_ft.length ? result_ft[0].flavor_text : 'Keine Beschreibung verfügbar.';
        }

        return (
            <div className="details-text">
                <span>#{species_data.id}</span> {!species_data ? 'Lade...' : ''}
                <strong>{type_description}</strong> {flavor_text}
            </div>
        )
    }
}

export default Text;