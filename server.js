var express = require('express'),
  app = express(),
  port = process.env.PORT || 3000,
  mongoose = require('mongoose'),
  Record = require('./api/models/esmadAPIModel'),
  bodyParser = require('body-parser');
  
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/esmad_session',  { useNewUrlParser: true }); 

app.use(bodyParser.json());

var routes = require('./api/routes/esmadAPIRoutes'); 
routes(app);

app.listen(port);

console.log('Esmad API Session RESTful API server started on localhost on port: ' + port);