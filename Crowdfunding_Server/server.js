var http = require('http');
var path = require('path');

var express = require('express');
var cors = require('cors')

var { hellomsg, fetchDeployedCampaigns, getSummary} = require('./server/smart-contract/api');


var router = express();
var server = http.createServer(router);
router.use(cors())

router.use(express.static(path.resolve(__dirname, 'client')));

console.log('Booting up the server! Please wait until finished...')
server.listen(process.env.PORT || 5000, process.env.IP || "0.0.0.0", function(){
  var addr = server.address();
  console.log("All ready! Server listening at", addr.address + ":" + addr.port);
});


router.get('/hello',function(req,res) {
    res.send({'name':'Chetna'});
});

router.get('/getCampaings',function(req,res) {
  fetchDeployedCampaigns().then((value) => {
    console.log(value);
    res.send(value);
    console.log("Got api response");
  });

});

router.get('/getCampaignSummary',function(req,res) {
  getSummary().then((value) => {
    console.log(value);
    res.send(value);
    console.log("Got api response");
  });

});