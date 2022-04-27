var http = require('http');
var path = require('path');

var express = require('express');
var cors = require('cors');
const bodyParser = require('body-parser');

var { fetchDeployedCampaigns, getSummary, createCampaign,createKYCRequest,approveKYCRequest,rejectKYCRequest,addAddressToFundRaiser,fetchKYCRequests,getDeployedCampaignsDetails,getRolesOfUser,addAddressToFundApprover,contribute} = require('./server/smart-contract/api');


var router = express();
var server = http.createServer(router);
router.use(cors());
// parse application/x-www-form-urlencoded
router.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
router.use(bodyParser.json());
router.use(express.static(path.resolve(__dirname, 'client')));

console.log('Booting up the server! Please wait until finished...')
server.listen(process.env.PORT || 5000, process.env.IP || "0.0.0.0", function(){
  var addr = server.address();
  console.log("All ready! Server listening at", addr.address + ":" + addr.port);
});


router.get('/hello',function(req,res) {
    res.send({'name':'Crowdfunding Project Landing!!'});
});

router.post('/getRolesOfUser',function(req,res) {
  console.log("Called getRolesOfUser");
  console.log(req.body);
  getRolesOfUser(req.body.user_address).then((value) => {
    console.log(value);
    res.send(value);
    console.log("Got api response : getRolesOfUser");
  });
});

router.post('/createKYCRequest',function(req,res) {
  console.log("Called Create createKYCRequest");
  createKYCRequest(req.body.first_Name,req.body.last_Name,req.body.email,req.body.phone,req.body.doc_type,req.body.role_applied_for).then((value) => {
    console.log(value);
    res.send({'message':'KYC Request created successfully'});
    console.log("Got api response : createKYCRequest");
  });

});

router.post('/approveKYCRequest',function(req,res) {
  console.log("Called Create approveKYCRequest");
  approveKYCRequest(req.body.user_address,req.body.role_applied_for).then((value) => {
    console.log(value);
    res.send({'message':'KYC Request Approved.'});
    console.log("Got api response : approveKYCRequest");
  });
});

router.post('/rejectKYCRequest',function(req,res) {
  console.log("Called Create rejectKYCRequest");
  rejectKYCRequest(req.body.user_address,req.body.role_applied_for).then((value) => {
    console.log(value);
    res.send({'message':'KYC Request Rejected.'});
    console.log("Got api response : rejectKYCRequest");
  });
});

router.get('/fetchKYCRequests',function(req,res) {
  console.log("Called fetchKYCRequests");
  console.log(req.query)
  fetchKYCRequests().then((value) => {
    console.log(value);
    res.send(value);
    console.log("Got api response : fetchKYCRequests");
  });
});

router.post('/addAddressToFundRaiser',function(req,res) {
  console.log("Called addAddressToFundRaiser");
  addAddressToFundRaiser(req.body.user_address).then((value) => {
    res.send({'message':'Address added successfully'});
    console.log("Got api response : addAddressToFundRaiser");
  });
});

router.post('/addAddressToFundApprover',function(req,res) {
  console.log("Called addAddressToFundApprover");
  addAddressToFundApprover(req.body.user_address).then((value) => {
    res.send({'message':'Address added successfully'});
    console.log("Got api response : addAddressToFundApprover");
  });
});



router.post('/postCampaigns',function(req,res) {
  console.log("Called Create Campaign");
  createCampaign(req.body.cname,req.body.cdesc,req.body.cimage).then((value) => {
    console.log(value);
    res.send({'message':'Campaign created successfully'});
    console.log("Got api response : postCampaigns");
  });
});

router.get('/getCampaigns',function(req,res) {
  fetchDeployedCampaigns().then((value) => {
    console.log(value);
    res.send(value);
    console.log("Got api response");
  });
});

router.get('/getCampaignSummary',function(req,res) {
  getSummary(req.body.caddr).then((value) => {
    console.log(value);
    res.send(value);
    console.log("Got api response");
  });
});

router.post('/contribute',function(req,res) {
  console.log("Calling contribute api");
  contribute(req.body.caddr,req.body.amount).then((value) => {
    console.log(value);
    res.send({'message':'Contribution to campaign done successfully'});
    console.log("Got api response Contribute");
  });
});

router.get('/getDeployedCampaignsDetails',function(req,res) {
  console.log("Called getDeployedCampaignsDetails");
  getDeployedCampaignsDetails().then((value) => {
    console.log(value);
    res.send(value);
    console.log("Got api response : getDeployedCampaignsDetails");
  });
});

