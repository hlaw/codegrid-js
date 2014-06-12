var map;
var hash;
var popup = L.popup();
var grid;

function initmap() {
    // set up the map
    map = new L.Map('map');

    // create the tile layer with correct attribution
    var osmUrl='http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
    var osmAttrib='Map data © <a href="http://openstreetmap.org">OpenStreetMap</a> contributors';
    var osm = new L.TileLayer(osmUrl, {minZoom: 0, maxZoom: 17, attribution: osmAttrib});		

    // start the map 
    //
    map.setView(new L.LatLng(22.506, 114.051),15);
    map.addLayer(osm);
    hash = L.hash(map);
    L.control.scale().addTo(map);

    grid = codegrid.CodeGrid();
    map.on ('click', onMapClick);
    map.on ('mousemove', L.Util.limitExecByInterval(onMapMove,5));    
    document.getElementById("text").innerHTML = "Click on map to query.";
}

function onMapClick (e) {
    grid.getCode (e.latlng.lat, e.latlng.lng, function (err, code) {
        var msg;
        if (err) {
            msg = err;
        } else {
            msg = "You clicked on: " + code;
        }
        popup.setLatLng (e.latlng)
             .setContent (msg)
             .openOn(map);
    });
}


function onMapMove (e) {
    grid.getCode (e.latlng.lat, e.latlng.lng, function (err, code) {
        var msg;
        if (err) {
            msg = err;
        } else {
            msg = "You are on: " + code;
        }
        document.getElementById("text").innerHTML = msg;
    });
}
