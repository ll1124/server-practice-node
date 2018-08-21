var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var Job = require('./model/jobdb');

module.exports.toRandomPage = function(req,res){
  Job.countDocuments().exec(function(err,count){
    var random = Math.floor(Math.random() * count);
    Job.findOne().skip(random).exec(function(err,problem){
      if(err){console.log(err);}
      res.render('jobrandom',{data:problem});
    });
  });
}
