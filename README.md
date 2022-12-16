# Pokédex

A simplified, custom Pokédex for small kids made with React.js. The interface is currently only available in german but can of course be modified.

## Scraping

This project uses the free data from Pokeapi.co wich is cached and transformed with a python script. The basic dataset and all sprites are already included but to update or modify it you can always re-scrape the API with Python.

    cd scraper
    python pokeapi.py

To avoid any legal issues the (possibly) copyrighted artwork is not included in this repository. I'm using the files from Pokewiki and you'll have to scrape it yourself. But fear not: just run the `artwork.py` script once to set everything up. If you skip this step, you'll only see the low-res fallback sprites.

    pip install beautifulsoup4
    cd scraper
    python artwork.py

## Development & Building

    npm start
... and...
    npm run build