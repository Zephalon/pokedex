import requests
import json
from bs4 import BeautifulSoup

TARGET = 'https://www.pokewiki.de'
SCRAPE_ICONS = True
SCRAPE_ARTWORK = True

pokemon_list = []

page = requests.get(TARGET + '/Pok%C3%A9mon-Liste')

soup = BeautifulSoup(page.content, 'html.parser')
pokemon = soup.find_all('tr')

# scrape pokemon list
monster_id = 1

for mid, monster in enumerate(pokemon):
    fields = monster.find_all('td')
    pokemon_data = {
        'id': monster_id
    }

    if (len(fields) == 0):
        continue

    for fid, field in enumerate(fields):
        # ICON
        if (fid == 1):
            if (SCRAPE_ICONS):
                icon_url = field.find('img').attrs['src']
                print('Saving Icon: ' + icon_url)
                response = requests.get(TARGET + '/' + icon_url)
                open('../public/pokemon_icons/' + str(monster_id) + '.png', 'wb').write(response.content)

        # NAME
        if (fid == 2):
            pokemon_data['name'] = field.text
            pokemon_data['original_url'] =  field.find('a').attrs['href']

        # TYPES
        if (fid == 8):
            pokemon_data['types'] = []
            for types in field.find_all('a'):
                pokemon_data['types'].append(types.attrs['title'])

    pokemon_list.append(pokemon_data)
    monster_id += 1

with open('../src/pokemon.json', 'w') as f:
    json.dump(pokemon_list, f)

print('=== Found ' + str(len(pokemon_list)) + ' Pokemon ===')

# scrape pokemon data
for mid, monster in enumerate(pokemon_list):
    print('Scraping Pokemon #' + str(monster['id']))

    page = requests.get(TARGET + monster['original_url'])
    soup = BeautifulSoup(page.content, 'html.parser')

    statistics = soup.find('table', {'class': 'right'})

    if (SCRAPE_ARTWORK):
        # get main artwork
        main_artwork = statistics.find_all('img')[1]
        source = main_artwork.attrs['src'].split('.png/')[0]
        artwork_url = source.replace('/thumb', '') + '.png'
        print('Saving Artwork: ' + artwork_url)
        response = requests.get(TARGET + '/' + artwork_url)
        open('../public/pokemon_artwork/' + str(monster['id']) + '.png', 'wb').write(response.content)
