$(document).ready(function(){
  $("#hud").hide();
  // if (navigator.geolocation)
  // {
  //   navigator.geolocation.getCurrentPosition(showPosition);
  // }
  // else{alert("Geolocation is not supported by this browser.");}
  // function showPosition(position)
  // {
  //   lat=position.coords.latitude;
  //   lng=position.coords.longitude; 
  // }
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

    //map.setCenter(new OpenLayers.LonLat(lng, lat), 4, false, false);

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

  var power = 1;
  if (navigator.userAgent.toLowerCase().indexOf('windows') >= 0){
    power = 2;
  }
  console.log(navigator.userAgent);
  console.log(power);

var style = {
    fillColor: '#000',
    fillOpacity: 0.1,
    strokeWidth: 0
};

var lat= 0;
var lon= 0;
var vector = new OpenLayers.Layer.Vector('vector');
map.addLayers([layer, vector]);

map.setCenter(
    new OpenLayers.LonLat(-71.147, 42.472).transform(
        new OpenLayers.Projection("EPSG:4326"),
        map.getProjectionObject()
    ), 12
);

var pulsate = function(feature) {
    var point = feature.geometry.getCentroid(),
        bounds = feature.geometry.getBounds(),
        radius = Math.abs((bounds.right - bounds.left)/2),
        count = 0,
        grow = 'up';

    var resize = function(){
        if (count>16) {
            clearInterval(window.resizeInterval);
        }
        var interval = radius * 0.03;
        var ratio = interval/radius;
        switch(count) {
            case 4:
            case 12:
                grow = 'down'; break;
            case 8:
                grow = 'up'; break;
        }
        if (grow!=='up') {
            ratio = - Math.abs(ratio);
        }
        feature.geometry.resize(1+ratio, point);
        vector.drawFeature(feature);
        count++;
    };
    window.resizeInterval = window.setInterval(resize, 50, point, radius);
};

var geolocate = new OpenLayers.Control.Geolocate({
    bind: false,
    geolocationOptions: {
        enableHighAccuracy: false,
        maximumAge: 0,
        timeout: 7000
    }
});
map.addControl(geolocate);
var firstGeolocation = true;
geolocate.events.register("locationupdated",geolocate,function(e) {
    vector.removeAllFeatures();
    lat = e.point.x;
    lon = e.point.y;
    console.log(lat, lon);
    var circle = new OpenLayers.Feature.Vector(
        OpenLayers.Geometry.Polygon.createRegularPolygon(
            new OpenLayers.Geometry.Point(e.point.x, e.point.y),
            e.position.coords.accuracy/2,
            40,
            0
        ),
        {},
        style
    );
    vector.addFeatures([
        new OpenLayers.Feature.Vector(
            e.point,
            {},
            {
                graphicName: 'cross',
                strokeColor: '#f00',
                strokeWidth: 2,
                fillOpacity: 0,
                pointRadius: 10
            }
        ),
        circle
    ]);
    if (firstGeolocation) {
        map.setCenter(new OpenLayers.LonLat(lon, lat), 12, false, false);
        pulsate(circle);
        firstGeolocation = false;
        this.bind = true;
    }
});
geolocate.events.register("locationfailed",this,function() {
    OpenLayers.Console.log('Location detection failed');
});
    vector.removeAllFeatures();
    geolocate.deactivate();
    geolocate.watch = false;
    firstGeolocation = true;
    geolocate.activate();

    console.log(geolocate);

});


//getGeo/11355