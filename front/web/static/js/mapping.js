var lat=0;
var lng=0;
$(document).ready(function(){
  $("#hud").hide();
  if (navigator.geolocation)
  {
    navigator.geolocation.getCurrentPosition(showPosition);
  }
  else{alert("Geolocation is not supported by this browser.");}
  function showPosition(position)
  {
    lat=position.coords.latitude;
    lng=position.coords.longitude; 
  }
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
      strokeDashstyle: 'dash',
      fillOpacity: 0.1,
      strokeColor: '#fff'
    };


    var map = new OpenLayers.Map('map', {
      projection: fromProjection,
      displayProjection: toProjection
    });

    var layer = new OpenLayers.Layer.WMS( "OpenLayers WMS", "http://vmap0.tiles.osgeo.org/wms/vmap0", {layers: 'basic'} );
    map.addLayer(layer);

    map.setCenter(new OpenLayers.LonLat(lng, lat), 4, false, false);

    function transform(lon, lat) {
      return new OpenLayers.LonLat(lon, lat).transform(fromProjection, toProjection);
    }

    var geojson_format = new OpenLayers.Format.GeoJSON();

    function featureToGeoJSON(feature) {
      return geojson_format.read(feature);
    }

    var my_territory_vector = new OpenLayers.Layer.Vector();

    map.addLayers([my_territory_vector]);

    var enemies = [
      new OpenLayers.Layer.Vector(),
      new OpenLayers.Layer.Vector(),
      new OpenLayers.Layer.Vector(),
      new OpenLayers.Layer.Vector(),
      new OpenLayers.Layer.Vector(),
      new OpenLayers.Layer.Vector(),
      new OpenLayers.Layer.Vector(),
      new OpenLayers.Layer.Vector(),
      new OpenLayers.Layer.Vector(),
      new OpenLayers.Layer.Vector()
    ];

    enemies.forEach(function(e_v) {
      e_v.style = generateStyle();
    });

    map.addLayers(enemies)

    function getRandomEnemy() {
      return enemies[Math.floor(Math.random()*10)];
    }

    function generateStyle() {
      return {
        fill: true,
        fillColor: '#'+Math.floor(Math.random()*16777215).toString(16),
        fillOpacity: 0.5,
        strokeColor: '#'+Math.floor(Math.random()*16777215).toString(16)
      }
    }

    my_territory_vector.style = my_style;

    $.getJSON('http://zmhr.me/getAllGeo', function(res) {
      JSON.parse(res).rows.forEach(function(r) {
        var e = getRandomEnemy();
        e.addFeatures(geojson_format.read(r.value.geo_json));
        console.log('coloring', e, r.value.zip);
      });
    });


  $("#hud").hide(); //hides HUD at startup

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
