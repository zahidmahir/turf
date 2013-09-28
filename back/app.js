var restify = require("restify"),
  request = require("request"),
  server = restify.createServer(),
  nano = require('nano')('http://127.0.0.1:5984'),
  turfs = nano.db.use('turfs'),
  routes = require('./routes');

server.use(restify.acceptParser(server.acceptable));

server.use(restify.queryParser());

server.use(restify.bodyParser({ mapParams: false }));

server.use(restify.CORS());

function getGeoJSON(res) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  // /turfs/_design/by_zip/_view/by_zip
  turfs.view('by_zip', 'by_zip', function(err, body) {
    if(err) {
      console.log('[ got error ]', err);
    } else {
      res.json(JSON.stringify(body));
    }
  });
};

function getGeoJSONByZip(res, zip) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  // /turfs/_design/by_zip/_view/by_zip
  turfs.view('by_zip', 'by_zip', { 'key' : zip }, function(err, body) {
    if(err) {
      console.log('[ got error ]', err);
    } else {
      res.json(JSON.stringify(body));
    }
  });
};

function atilla_the_hun() {
//potato_in_my_anus
}


server.get('/invade', function(req, res, next) {

});

server.get('/getGeo/:zip', function(req, res, next) {
  console.log("[ getGeo/" +req.params.zip + " request ]");
  getGeoJSONByZip(res, req.params.zip);
});

server.get('/getAllGeo', function(req, res, next) {
  console.log('[ incoming request ]');
  getGeoJSON(res);
});

server.listen(80, function() {
  console.log('%s listening at %s', server.name, server.url);
});
