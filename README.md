# Pokédex

A simple Pokédex for small kids made with React.js. It shows for all current species:
- Name
- Types
- Sprite & Artwork
- ID
- Genus & Flavor Text
- Evolutions
- Stats & Strength

The interface is currently only available in german but can of course be modified.

Here's a [preview](https://pokedex.addictivity.de).

## Scraping

### Data & Sprites

This project uses the free data from Pokeapi.co wich is cached and transformed with a python script. The basic dataset and all sprites (up to GEN8) are already included in the repository. If you need to update or modify the database you can always re-scrape the API with Python.

    cd scraper
    python pokeapi.py

### Official Artwork

The copyrighted artwork is not included in this repository. It is free to use for non-profitable projects but with Nintendo and Gamefreak you never know. I scraped the files from Pokewiki.de and you'll have to do it too. But fear not: just run the `artwork.py` script once to set everything up. If you skip this step, you'll only see the low-res fallback sprites.

    pip install beautifulsoup4
    cd scraper
    python artwork.py

You can of course also include images from other sources - just make sure you add them according to this scheme: `public/pokemon_artwork/[species_id].png`.

## Development & Building

    npm start
    npm run build