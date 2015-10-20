var http = require('http');
var React = require('react');
var express = require('express');
var app = express();
var browserify = require('browserify');  
var ReactDOMServer = require('react-dom/server'),
    DOM = React.DOM, body = DOM.body, div = DOM.div, script = DOM.script;

var Kehys = require('./views/index.jsx');
app.get('/',function(req,res){
 
res.setHeader('Content-Type', 'text/html');
  res.end(React.renderToStaticMarkup(
    React.DOM.body(
      null,
      React.DOM.div({ id: 'app',dangerouslySetInnerHTML: {__html: React.renderToString(React.createElement(Kehys))}}),
      React.DOM.script({'id': 'initial-data','type': 'text/plain'}),
      React.DOM.script({src: '/bundle.js'}))
  ));

});

app.use('/bundle.js', function(req, res) {  
  res.setHeader('content-type', 'application/javascript');
  browserify('./app.js', {
    debug: true
  })
  .transform('reactify')
  .bundle()
  .pipe(res);
});

var server = app.listen(3333, function() {  
  var addr = server.address();
  console.log('Listening @ http://%s:%d', addr.address, addr.port);
});