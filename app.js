var express 		= require('express'),  
bodyParser 			= require('body-parser'),
minify      		= require('express-minify'),
ajax 						= require('./lib/ajax'),
bhlibs    			= require('bhlibs'),
Datastore     	= require('nedb'),
http      			= require('http');

var Config = global.Config = require('./config').config;

var app = express();
app.use(require('morgan')('dev'));

app.set('view engine', 'jade');
app.use(express.static(__dirname + '/static'));
app.use(i18n.handle);

app.use(bodyParser.json({ type: 'application/*+json' }));
app.use(bodyParser.urlencoded({ extended: false }));

i18n.registerAppHelper(app);


app.get('/', function(req, res){
  res.status(404).send('not yet');
});

app.all('/prvtws/:job',ajax.dojob);


require('fs').mkdir(__dirname+'/data',function(){
  var sozluk = global.sozluk = new Datastore({ filename: __dirname+'/data/konular.nedb', autoload: true });
  var cevap  = global.cevap  = new Datastore({ filename: __dirname+'/data/gelismeler.nedb', autoload: true });
  http.createServer(app).listen(Config.serverport, function(){
    var date= new Date();
    console.log("\033[41m\033[33m >> "+date+" : "+pjson.name+'_'+pjson.version+" listening on port " + Config.serverport+"\033[0m");
  });  
});



