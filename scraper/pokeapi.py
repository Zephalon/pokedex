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
        print('Could not save sprite.')

    # also save species if this is the default pokemon
    if (pokemon_data['is_default']):
        species_data = requests.get(pokemon_data['species']['url']).json()
        with open('../public/data/species/' + species_data['name'] + '.json', 'w') as f:
            json.dump(species_data, f)

        try:
            evolution_data = requests.get(species_data['evolution_chain']['url']).json()
            with open('../public/data/evolutions/' + species_data['name'] + '.json', 'w') as f:
                json.dump(evolution_data, f)
        except:
            print('Could not save evolution chain.')

        name_de = [row for row in species_data['names'] if row['language']['name'] == 'de']
        types = []
        for type in pokemon_data['types']:
            types.append(type['type']['name']);

        species = {
            'id': species_data['id'],
            'slug': species_data['name'],
            'name': name_de[0]['name'],
            'pokemon': pokemon_data['name'],
            'types': types
        }

        species_list.append(species)

with open('../src/species.json', 'w') as f:
    json.dump(species_list, f)