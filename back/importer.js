
zips.features.forEach(function(geo_json) {
  geo_json.owner = "";
  delete geo_json.properties.OBJECTID;
  delete geo_json.id;
  var t = {
    'owner' : '',
    'geo_json' : geo_json,
    'zip' : geo_json.properties.postalCode,
    'random' : Math.random()
  }
  turfs.insert(t, function(error, body) {
    if(error) {
      console.log('[insert error]', error);
    }
  });
});
