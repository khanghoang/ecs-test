var express = require('express');
var app = express();
var externalip = require('external-ip')();
var os = require('os');
var ifaces = os.networkInterfaces();

app.get('/', function (req, res, next) {
  var host = server.address().address;
  var port = server.address().port;

  Object.keys(ifaces).forEach(function (ifname) {
    var alias = 0;

    ifaces[ifname].forEach(function (iface) {
      if ('IPv4' !== iface.family || iface.internal !== false) {
        // skip over internal (i.e. 127.0.0.1) and non-ipv4 addresses
        return;
      }

      if (alias >= 1) {
        // this single interface has multiple ipv4 addresses
        console.log(ifname + ':' + alias, iface.address);
      } else {
        // this interface has only one ipv4 adress
        console.log(ifname, iface.address);
      }
      ++alias;
    });
  });

  externalip(function(err, ip) {
    res.send('Hello World! at host ' + host + ' port ' + port +'  public ip at ' + ip);
  })


});

var server = app.listen(3000, function () {
  var host = server.address().address;
  var port = server.address().port;

  console.log('Example app listening at http://%s:%s', host, port);
});
