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