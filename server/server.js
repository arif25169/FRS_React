const express = require('express'),
  app = express(),
  bodyParser = require('body-parser'),
  path = require('path'),
  server = require('http').Server(app),
  mongoose = require('mongoose')
let ajax = require('superagent');
var request = require('superagent-relative');


const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');
const webpackConfig = require('../webpack.config.js');
const webpackCompiler = webpack(webpackConfig);

app.use(webpackHotMiddleware(webpackCompiler));
app.use(webpackDevMiddleware(webpackCompiler, {
    noInfo: true,
    publicPath: webpackConfig.output.publicPath,
    stats: {colors: true}
}));

//for mongodb-docker connection
let mongo = {
  host:'127.0.0.1',
  port:27017,
  usr:'mongo',
  pwd: 'mongo',
  masterDB:'jothi',
};

//@ TODO use mongo username & password in constructing the URL if given
mongo['mongoURL'] = ('mongodb://' + mongo.host + ':' + mongo.port + '/' + mongo.masterDB);

mongoose.connect(mongo['mongoURL']);

mongoose.connection.on('connected',function(){
     console.log("successfully connected");
})
// mongoose.connect.on('open',function(res){
//   if(res){
//     console.log("opened")
//   }
//   else
//   console.log("connected")
// })
//allowing server to access client folder
 app.use(express.static(path.join(__dirname, '../', 'client')));
  app.use(bodyParser());
 //
 // app.get('/', function(req, res) {
 //   console.log("got a request");
 //   res.sendFile(path.join(__dirname, "../", "client/index.html"));
 // });

//routing ''/users' route to server/users folder..only the route starts with /users/ssomename can access this folder
 app.use('/users',require(path.join(__dirname, './users')));
 app.use('/admin',require(path.join(__dirname,'./admin')));


app.get('*', function(req, res) {
  res.sendFile(path.resolve(__dirname, '..', 'client', 'index.html'));
})



server.listen(3000, function() {
  console.log('server started on  3000');
});
