import requests
import json

API = 'https://pokeapi.co/api/v2/'

pokemon_list = requests.get(API + 'pokemon?limit=2000&offset=0').json()['results']
species_list = []

for fid, pokemon in enumerate(pokemon_list):
    print('Scraping #' + str(fid + 1) + ' (' + pokemon['name'] + ')')

    # scrape and save pokemon data
    pokemon_data = requests.get(pokemon['url']).json()
    with open('../public/data/pokemon/' + pokemon_data['name'] + '.json', 'w') as f:
        json.dump(pokemon_data, f)
    
    try:
        sprite_default = requests.get(pokemon_data['sprites']['front_default'])
        open('../public/pokemon_sprites/' + pokemon_data['name'] + '.png', 'wb').write(sprite_default.content)
    except:
        print('Could not save pokemon sprite.')

    # also save species if this is the default pokemon
    if (pokemon_data['is_default']):
        # save species data
        species_data = requests.get(pokemon_data['species']['url']).json()
        with open('../public/data/species/' + species_data['name'] + '.json', 'w') as f:
            json.dump(species_data, f)

        # get evolution chain
        if (species_data['evolution_chain']):
            try:
                evolution_data = requests.get(species_data['evolution_chain']['url']).json()
                with open('../public/data/evolutions/' + str(evolution_data['id']) + '.json', 'w') as f:
                    json.dump(evolution_data, f)
            except:
                print('Could not save evolution chain.')

        # save sprite
        if (species_data['name'] != pokemon['name']):
            try:
                sprite_default = requests.get(pokemon_data['sprites']['front_default'])
                open('../public/pokemon_sprites/' + species_data['name'] + '.png', 'wb').write(sprite_default.content)
            except:
                print('Could not save species sprite.')

        # create custom json files with all species
        name_de = [row for row in species_data['names'] if row['language']['name'] == 'de']
        types = []
        for type in pokemon_data['types']:
            types.append(type['type']['name']);

        species = {
            'id': species_data['id'],
            'slug': species_data['name'],
            'name': name_de[0]['name'],
            'pokemon': pokemon_data['name'],
            'types': types,
            'evolution_id': evolution_data['id'] if evolution_data else False
        }

        species_list.append(species)

with open('../src/species.json', 'w') as f:
    json.dump(species_list, f)