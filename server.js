const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');

const app = express();

const port = 3000;

const mongojs = require('mongojs');
const db = mongojs('clientkeeper',['clients']);

//Set Static folder 
app.use(express.static(path.join(__dirname,'public')));
app.use(bodyParser.json());

//Allow requests from Angular
app.use((req, res, next) => {
  // Website you wish to allow to connect
   res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');
   // Request methods you wish to allow
   res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
   // Request headers you wish to allow
   res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
   // Pass to next layer of middleware
   next();
});

app.get('/', function(req,res){
  res.send('Please use /api/clients');
});

app.get('/api/clients', (req, res, next) => {
  db.clients.find().sort({first_name:1}, (err, clients) => {
  	if(err) {
  	  res.send(err);
  	}
  	res.json(clients);
  });
});

app.post('/api/clients', (req, res, next) => {
  db.clients.insert(req.body, (err, client) => {
  	if(err){
  	  res.send(err);
  	}
  	res.json(client);
  });
});

app.listen(port, () => {
	console.log('Server started on port' + port);
})