var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var Job = require('./model/jobdb');

module.exports.toAddPage = function(req,res){
  res.render('jobadd');
}

module.exports.adddata = function(req,res){
  var question = req.body.question;
  var subject = req.body.subject;
  var frequency = req.body.frequency;
  var answer = req.body.answer;
  var nodata = '';
  var job = new Job({"question":question,"subject":subject,"frequency":frequency,"answer":answer});
  if (question!=nodata && frequency!=nodata && answer!=nodata) {
    job.save(function(err,silence){
      if (err) {console.log(err);}
      res.send({result:true});
    });
  } else {
    res.send({result:false});
  }
}
