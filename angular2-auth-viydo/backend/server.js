var logger          = require('morgan'),
    cors            = require('cors'),
    http            = require('http'),
    https            = require('https'),
    fs            = require('fs'),
    express         = require('express'),
    errorhandler    = require('errorhandler'),
    dotenv          = require('dotenv'),
    bodyParser      = require('body-parser');

var app = express();

dotenv.load();

// Parsers--Test Comment
// Parsers
// old version of line
// app.use(bodyParser.urlencoded());
// new version of line
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

app.use(function(err, req, res, next) {
  if (err.name === 'StatusError') {
    res.send(err.status, err.message);
  } else {
    next(err);
  }
});

if (process.env.NODE_ENV === 'development') {
  app.use(express.logger('dev'));
  app.use(errorhandler())
}

//app.use(require('./anonymous-routes'));
//app.use(require('./protected-routes'));
app.use(require('./user-routes'));
app.use(require('./room-routes'));

var port = process.env.PORT || 3001;

/*
http.createServer(app).listen(port, function (err) {
  console.log('listening in http://localhost:' + port);
});
*/


 https.createServer({
      key: fs.readFileSync('key.pem'),
      cert: fs.readFileSync('cert.pem')
    }, app).listen(port,192.168.148.2, function(err) {
       console.log('listening in https://localhost:' + port);
    });
