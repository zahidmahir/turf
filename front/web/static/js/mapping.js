$(document).ready(function(){
  //fix the effing screen
  document.getElementById('map').style.height = (window.innerHeight)+"px";
  document.getElementById('map').style.width = (window.innerWidth)+"px";
  document.getElementById('hud').style.top = (window.innerHeight)*0.7;
  var owner = 'Red Team';
  var area = '10038';
  document.getElementById('info').innerHTML = 'OWNER: ' + owner + ' AREA: ' + area;

  //make all vars
  var map = new OpenLayers.Map('map');
  var layer = new OpenLayers.Layer.WMS( "OpenLayers WMS", "http://vmap0.tiles.osgeo.org/wms/vmap0", {layers: 'basic'} );
  var geojson_format = new OpenLayers.Format.GeoJSON();
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
    fillColor: '#888888',
    fillOpacity: 0.02,
    strokeColor: '#888888'
  }
  var cvRed = new OpenLayers.Layer.Vector();
  var cvBlue = new OpenLayers.Layer.Vector();
  var cvGreen = new OpenLayers.Layer.Vector();
  var cvYellow = new OpenLayers.Layer.Vector();
  var cvEmpty = new OpenLayers.Layer.Vector();
  var territories;

  //set values for vars
  map.addLayer(layer);
  map.setCenter(new OpenLayers.LonLat(-73.95, 40.75), 12);
  cvRed.style = redStyle;
  cvBlue.style = blueStyle;
  cvGreen.style = greenStyle;
  cvYellow.style = yellowStyle;
  cvEmpty.style = emptyStyle;

  function drawTerritory(t, cv){
    cv.addFeatures(geojson_format.read(t));
    map.addLayer(cv);
  }

  function getTerritories() {
    $.getJSON('http://www.zmhr.me/getAllGeo', function(res) {
      res = JSON.parse(res);
      res.rows.forEach(function(row){
        console.log(row.value);
        if(row.value.owner == undefined){
          drawTerritory(row.value.geo_json, cvEmpty);
        }
        else{
          drawTerritory(row.value.geo_json, cvRed);
        }
      })
    })
  }

  function init(){
    territories.forEach(function(t){
      if(t.owner = ''){
        drawTerritory(t, cvEmpty);
      }
      else{
        drawTerritory(t, cvRed);
      }
    });
  }

  getTerritories();
}
);