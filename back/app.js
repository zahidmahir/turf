var restify = require("restify"),
  request = require("request"),
  server = restify.createServer(),
  nano = require('nano')('http://127.0.0.1:5984'),
  turfs = nano.db.use('turfs');/*,
  zips = require('./zips.json');*/


// Acceptable Content-Types
server.use(restify.acceptParser(server.acceptable));
// Query paramter parser
server.use(restify.queryParser());
// Read HTTP request
server.use(restify.bodyParser({ mapParams: false }));

var server = restify.createServer();

/*zips.features.forEach(function(geo_json) {
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
});*/

function getGeoJSON(res) {
  // /turfs/_design/by_zip/_view/by_zip
  turfs.view('by_zip', 'by_zip', function(err, body) {
    if(err) {
      console.log('[ got error ]', err);
    } else {
      res.json(JSON.stringify(body));
    }
  });
}

server.get('/getAllGeo', function(req, res, next) {
  console.log('[ incoming request ]');
  getGeoJSON(res);
});

// server.get('/geo/:zip', function(req, res, next) {
//   console.log('[ incoming request on ' + req.params.zip + ']');
//   getGeoJSON(req.params.zip, res);
// });

server.listen(21, function() {
  console.log('%s listening at %s', server.name, server.url);
});
