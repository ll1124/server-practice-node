var http = require('http');
var express = require('express');
var bodyParser = require('body-parser');
var path = require('path')
var ejs = require('ejs');
var mongoose = require('mongoose');

var testServer = express();
require('events').EventEmitter.defaultMaxListeners = Infinity;

testServer.use(bodyParser.urlencoded({extended:true})); // bodyParser을 이용하기 위한 코드
testServer.set('views', __dirname+'/views'); // project의 directory name이 views인 폴더내부의 파일을 보겠다는 의미
testServer.set('view engine','ejs'); // .ejs파일을 보는 view engine을 사용한다는 코드

var uri = process.env.MONGO_URI;
var db = mongoose.connection;
db.on('error', console.error);
db.once('open',function(){
  console.log("Connected to mongod server");
});
mongoose.connect(uri,{ useNewUrlParser: true }).catch(e=> {
  console.error(e.message);
});

testServer.use('/TSMcss', express.static(__dirname+'/public/stylesheets/jobmain.css')); //  /TSMcss의 css파일을 jobmain.css로 설정하는 코드
testServer.use('/TSAcss', express.static(__dirname+'/public/stylesheets/jobadd.css')); //  /TSAcss의 css파일을 jobadd.css로 설정하는 코드
testServer.use('/TSRcss', express.static(__dirname+'/public/stylesheets/jobrandom.css')); //  /TSRcss의 css파일을 jobrandom.css로 설정하는 코드

var toJob = require('./routes/toJob');
testServer.use('/',toJob);

var toAdd = require('./routes/toAdd');
testServer.get('/toAddPage',toAdd.toAddPage);
testServer.post('/abbdata',toAdd.adddata);

var toRandom = require('./routes/toRandom');
testServer.get('/toRandomPage', toRandom.toRandomPage);

http.createServer(testServer).listen(process.env.POST||8282,function(){
  console.log('Server Running at http://localhost:8282/');
});
