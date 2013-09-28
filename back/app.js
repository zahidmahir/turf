var restify = require("restify"),
  request = require("request"),
  server = restify.createServer(),
  nano = require('nano')('http://dev:5984'),
  turfs = nano.db.use('turfs');/*,
  zips = require('./zips.json');*/

var server = restify.createServer();

zips.features.forEach(function(geo_json) {
  geo_json.owner = "";
  delete geo_json.properties.OBJECTID;
  delete geo_json.id;
  var t = {
    'geo_json' : geo_json,
    'zip' : geo_json.properties.postalCode
  }
  turfs.insert(t, function(error, body) {
    if(error) {
      console.log('[insert error]', error);
    }
  });
});

function getGeoJSON(zip, res) {
  // /turfs/_design/by_zip/_view/by_zip
  turfs.view('/by_zip', '/by_zip', function(err, body) {
    if(err) {
      console.log('[get error]', err);
    } else {
      // body.rows.forEach(function(turf) {
      //   console.log(JSON.stringify(turf));
      // });
      send(JSON.stringify(body), res);
    }
  });
}

function send(_json, res) {
  res.json(_json);
}

server.get('/geo', function(req, res, next) {
  getGeoJSON(11355, res);
});

// server.get('/hello/:name', respond);
// server.head('/hello/:name', respond);

server.listen(3000, function() {
  console.log('%s listening at %s', server.name, server.url);
});
