console.log('im a faggot')
var fromProjection = new OpenLayers.Projection("EPSG:4326");   // Transform from WGS 1984
var toProjection = new OpenLayers.Projection("EPSG:900913"); // to Spherical Mercator Projection
function transform(lon, lat) {
    return new OpenLayers.LonLat(lon, lat).transform(fromProjection, toProjection);
}

var redStyle = {
  fill: true,
  fillColor: '#FF0000',
  fillOpacity: 0.4,
  strokeColor: '#FF0000'
};
var greenStyle = {
  fill: true,
  fillColor: '#00FF22',
  fillOpacity: 0.4,
  strokeColor: '#00FF22'
};
var blueStyle = {
  fill: true,
  fillColor: '#0000FF',
  fillOpacity: 0.4,
  strokeColor: '#0000FF'
};
var yellowStyle = {
  fill: true,
  fillColor: '#FFFF00',
  fillOpacity: 0.4,
  strokeColor: '#FFFF00'
};
var emptyStyle = {
  fill: false,
  strokeColor: '#444444'
}

var territories;

function init(){

}

function drawTerritory(t){

}

function getTerritories(){
  $.getJSON
    res
      foreach r in res
        drawTerritory(r)
}