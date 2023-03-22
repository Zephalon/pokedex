import all_types from '../data/all_types.json'

export default function getMultipliers(types) {
    let multipliers = {
        defense: {},
        attack: {}
    };

    types.forEach((type) => {
        const damage_relations = all_types[type].damage_relations;
        const severities = {
            no_damage: 0,
            half_damage: 0.5,
            double_damage: 2
        };

        // set defense and attack
        for (const [attr_id, attr_value] of Object.entries(multipliers)) {
            let dmg_source = attr_id === 'defense' ? 'from' : 'to';

            // setup: everything to 1
            for (const [at_id, at_value] of Object.entries(all_types)) {
                if (multipliers[attr_id][at_id] === undefined) multipliers[attr_id][at_id] = 1;
            }

            // select severities
            for (const [severity, multiplier] of Object.entries(severities)) {
                // select severity entries
                damage_relations[`${severity}_${dmg_source}`].forEach((dr_type) => {
                    multipliers[attr_id][dr_type.name] = multipliers[attr_id][dr_type.name] * multiplier;
                });
            };
        }
    });

    console.log(multipliers);

    return multipliers;
}