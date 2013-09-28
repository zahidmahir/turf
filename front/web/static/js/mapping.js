$(document).ready(function(){
<<<<<<< HEAD
=======
  //fix the effing screen
  // document.getElementById('map').style.height = (window.innerHeight)+"px";
  // document.getElementById('map').style.width = (window.innerWidth)+"px";
  // document.getElementById('hud').style.top = (window.innerHeight)*0.7;
  $("#hud").hide(); //hides HUD at startup
  var owner = 'Red Team';
  var area = '10038';
//  document.getElementById('info').innerHTML = 'OWNER: ' + owner + ' AREA: ' + area;
>>>>>>> 36c6ecf8601e6b908d1f6099075f3fde9ed5a674

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
<<<<<<< HEAD
    fillColor: '#888888',
    fillOpacity: 0.02,
    strokeColor: '#888888'
  }
=======
    strokeColor: '#444444'
  };
>>>>>>> 36c6ecf8601e6b908d1f6099075f3fde9ed5a674
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
<<<<<<< HEAD
}
);
=======
  console.log(territories);
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
>>>>>>> 36c6ecf8601e6b908d1f6099075f3fde9ed5a674
