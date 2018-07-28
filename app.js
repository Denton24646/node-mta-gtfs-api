var GtfsRealtimeBindings = require('gtfs-realtime-bindings');
var request = require('request');
var apiKeys = require('./config');

var requestSettings = {
  method: 'GET',
  url: 'http://datamine.mta.info/mta_esi.php?key=' + apiKeys.mta + '&feed_id=2',
  encoding: null
};

var LTRAINSTATUS = 'Normal';

request(requestSettings, function (error, response, body) {
  if (!error && response.statusCode == 200) {
    var feed = GtfsRealtimeBindings.FeedMessage.decode(body);
    feed.entity.forEach(function(entity) {
        //console.log('alert: '+ entity.alert);
        //console.log(typeof entity.alert);
    });
    for (i in feed.entity) {
        if (feed.entity.alert !== undefined) {
            //console.log("Status: Delay");
            LTRAINSTATUS = 'Delayed';
            break;
        }
    }
    console.log("%s", LTRAINSTATUS);
    return LTRAINSTATUS;
  } else {
      LTRAINSTATUS = "Unknown";
      return LTRAINSTATUS;
  }
});