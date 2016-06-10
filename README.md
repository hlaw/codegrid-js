# codegrid.js - Javascript function to query country code

```codegrid.js``` is a simple javascript library for efficiently retrieving country code from lat-lng coordinates of a point.  The data is encoded in a set of compressed utf-grid json files.

The source can be easily configured and adapted as needed.

```demo/demo.html``` is a sample webpage using the library (with leaflet.js).  A live demo is at http://codegrid-osmhk.rhcloud.com

## Features

* No application server needed (other than static web serving for browser use). No dependencies on external geocoding services.

* Compact data size - under present configuration, country code is resolved at grain level of zoom 17 tiles (several hundred meters). JSON files covering the planet take up 13M, and <1.3M after compression by gzip.

* JS code has no external dependencies for browser use (native JSON assumed).

* Flexibility - sub-country divisions can be incorporated by custom geojson files.

* Node.js use with local files access supported.

## Usage

### Browser use

Download ```codegrid.js```

Load the code in HTML

```html
<script type="text/javascript" src="[path]/codegrid.js"></script>
```

This will create a global object called ```codegrid```.

Initializing:

```js
grid = codegrid.CodeGrid();
```
or
```js
grid = codegrid.CodeGrid(url_to_tiles_directory, JSON_worldgrid);
```

Calling:

```js
grid.getCode (lat, lng, callback (error, code) {...} )
```

Result is passed as ```code``` to the callback. ```error``` contains the error string if error, or null if success.

Note: 
* Under this usage the function could only retrieve the data files through a web server. Placing the files at a local directory and providing a local path for access would not work.
* The default relative url directory of ```../tiles/``` is used if no path is specified during initialization.  Please use a trailing '/' for the directory path.
* The calling program can preload the file ```tiles/worldgrid.json``` as a JSON object and pass it for initialization.  Otherwise, this file will be requested from the web server on initialization.
* See ```demo/demo1.html``` and ```demo/demo2.html``` for usage examples.  The latter uses RequireJS to call the library within ```demo2.js```.


### Node.js use

```
npm install git://github.com/hlaw/codegrid-js.git
```

In Javascript:

```js
var codegrid = require('codegrid-js');
```

Under Node.js, codegrid will use ```fs``` to read the tiles directory locally from the installed module. There should be no need to specify any parameter for initialization.  The usage is otherwise the same as in the browser. 


## Data structure

Concept -

* Similar to UTF Grid : https://github.com/mapbox/utfgrid-spec (Note: The json files used are grouped and compressed, and do not meet the specifications)

Under the present schema -

* At the top level, the world is coded into a 512*512 utf-grid, providing a resolution at zoom level 9 (z9) tiles.

* _When and only when_ there is ambiguity (2 or more countries in the same z9 tile), the next level grid (resolution at z13) is generated.

* Similarly, a further level at zoom level 17 is generated.  Tiles with ambiguity are set to the country at the center point.

* To save space, in case one country takes up only part of a tile, and the rest of it is open sea, the entire tile is set to the country.

* A number of tiles contain highly repetitive data (same country in a grid row, or repeating patterns).  While gzip could save much of the network bandwidth during transit, tiles without compression would still take up much memory when loaded.  The utf grids are therefore compressed in JSON representation, cutting down roughly 80% in size.

* utf-grid tile data derived from Openstreetmap data with some manual fixes, separately using a set of Python scripts - http://github.com/hlaw/codegrid


## License

* Country Code Data in the tiles directory produced from Openstreetmap (http://www.openstreetmap.org). Data under Openstreetmap are available under ODbL.  

* JS code and demo: WTFPL (http://en.wikipedia.org/wiki/WTFPL)


## Github page

* http://github.com/hlaw/codegrid-js


## Author

* hlaw

