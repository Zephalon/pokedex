# Pokédex

A simplified, custom Pokédex for small kids made with React.js. The interface is currently only German but can of course be modified.

## Scraping

This projects uses the data from Pokeapi.co. The basic Pokédex-data and all sprites are already in included, but to update or modify it you can always re-scrape the API with Python.

    cd scraper
    python pokeapi.py

To avoid any legal issues the (possibly) copyrighted artwork is not included in this repository. This project uses the content from Pokewiki and I'll have to scrape it yourself - just run the `artwork.py` script once to set everything up. If you skip this step, you'll only see the low-res fallback sprites.

    pip install beautifulsoup4
    cd scraper
    python artwork.py

## Development & Building

    npm start
... and...
    npm run build