var express = require('express');
var toJob = express.Router();

toJob.get('/',function(req,res){
  res.render('job');
});
module.exports = toJob;
