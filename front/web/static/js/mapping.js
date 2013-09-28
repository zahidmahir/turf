$(document).ready(function(){
  var map = new OpenLayers.Map('map');
  var layer = new OpenLayers.Layer.WMS( "OpenLayers WMS", "http://vmap0.tiles.osgeo.org/wms/vmap0", {layers: 'basic'} );
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
  var cvRed = new OpenLayers.Layer.Vector();
  var cvBlue = new OpenLayers.Layer.Vector();
  var cvGreen = new OpenLayers.Layer.Vector();
  var cvYellow = new OpenLayers.Layer.Vector();
  var cvEmpty = new OpenLayers.Layer.Vector();
  var territories;
  map.addLayer(layer);
  map.setCenter(new OpenLayers.LonLat(-73.95, 40.75), 12);
  cvRed.style = redStyle;
  cvBlue.style = blueStyle;
  cvGreen.style = greenStyle;
  cvYellow.style = yellowStyle;
  cvEmpty.style = emptyStyle;

  function init(){

  }

  function drawTerritory(t, cv){
    console.log('t: ', t);
    cv.addFeatures(geojson_format.read(t));
    map.addLayer(cv);
  }

  // function getTerritories(){
    
  //   $.getJSON
  //     res
  //       foreach r in res
  //         drawTerritory(r)
  // }
}
);