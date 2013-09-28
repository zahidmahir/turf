$(document).ready(function(){
    $("#hud").hide();
    var fromProjection = new OpenLayers.Projection("EPSG:4326");   // Transform from WGS 1984
    var toProjection = new OpenLayers.Projection("EPSG:900913"); // to Spherical Mercator Projection

    var my_style = {
      fill: true,
      fillColor: '#00aaff',
      fillOpacity: 0.5,
      strokeColor: '#333ff'
    };
    var enemy_style = {
      fill: true,
      fillColor: '#ff0000',
      fillOpacity: 0.5,
      strokeColor: '#cc1144'
    };
    var emptyStyle = {
      fill: false,
      strokeDashstyle: 'dash',
      fillOpacity: 0.1
    }

    function transform(lon, lat) {
      return new OpenLayers.LonLat(lon, lat).transform(fromProjection, toProjection);
    }

    // var map = new OpenLayers.Map('map');
    // var layer = new OpenLayers.Layer.OSM();

    var map = new OpenLayers.Map('map');
    var layer = new OpenLayers.Layer.WMS( "OpenLayers WMS", "http://vmap0.tiles.osgeo.org/wms/vmap0", {layers: 'basic'} );

    map.addLayer(layer);
    // map.setCenter(transform(-95, 40), 4, false, false);

    var geojson_format = new OpenLayers.Format.GeoJSON();

    function featureToGeoJSON(feature) {
      return geojson_format.read(feature);
    }
    // colored_vector.addFeatures(featureToGeoJSON(some_feature));

    var my_territory_vector = new OpenLayers.Layer.Vector();
    var enemy_territory_vector = new OpenLayers.Layer.Vector();

    var empty_territory_vector = new OpenLayers.Layer.Vector();

    map.addLayers([my_territory_vector, enemy_territory_vector, empty_territory_vector]);

    my_territory_vector.style = my_style;
    enemy_territory_vector.style = enemy_style;
    empty_territory_vector.style = empty_territory_vector;

    $.getJSON('http://zmhr.me/getAllGeo', function(res) {
      JSON.parse(res).rows.forEach(function(r) {
        console.log('adding', r.value);

        //daniel make this shit work

        enemy_territory_vector.addFeatures(featureToGeoJSON(r.value.geo_json));
      });
    });

  //fix the effing screen
/*  document.getElementById('map').style.height = (window.innerHeight)+"px";
  document.getElementById('map').style.width = (window.innerWidth)+"px";
  document.getElementById('hud').style.top = (window.innerHeight)*0.7;
  var owner = 'Red Team';
  var area = '10038';
  document.getElementById('info').innerHTML = 'OWNER: ' + owner + ' AREA: ' + area;
=======

  $("#hud").hide(); //hides HUD at startup
>>>>>>> 5a4fd6481a066e46458ef638b72f4dd8ef13a019

  //make all vars
  var map = new OpenLayers.Map('map', {theme: null});
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
  };

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
        else if(t.owner == 'me'){
          drawTerritory(t, cvBlue);
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
      else if(t.owner == 'me'){
        drawTerritory(t, cvBlue);
      }
      else{
        drawTerritory(t, cvRed);
      }
    });
  }

  getTerritories();

  console.log(territories);
*/
  //show/hide hud
  $("#toggleHUD").click(function(){
    $("#hud").toggle();
    if($("#triangle-left").length == 0) {
      $("#triangle-right").replaceWith("<div id=\"triangle-left\"></div>");
    }
    else {
      $("#triangle-left").replaceWith("<div id=\"triangle-right\"></div>");
    }
  });

});
