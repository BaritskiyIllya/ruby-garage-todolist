var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mysql = require('mysql');
var connection = require('express-myconnection');
var app = express();
const router = require('./routes');
var cors = require('cors');

var corsOptions = {
  origin: 'http://localhost:4200',
  optionsSuccessStatus: 200
};

app.use(cors(corsOptions));

app.use(express.json());

app.use(connection(mysql, {
	host: 'us-cdbr-iron-east-03.cleardb.net',
	user: 'b8ff0e6aaaeff9',
	password: '880ab1b9',
	port: 3306,
	database: 'heroku_3b7ee0a1609ff85'
}, 'pool') //single
);

app.use(express.static(__dirname + '/public'));
app.use('/', router);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Our app is running on port ${ PORT }`);
});
