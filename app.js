var express = require("express");
var app = express();
var bodyParser = require('body-parser');

//MIDDLEWARE//
app.use(bodyParser.urlencoded({extended:true}));
app.set(express.static('public'));
app.set('view engine', 'ejs');
//ROUTING//
app.get('/',function(req,res){
    res.send('This is the Home Page');
});

app.get('/campgrounds',function(req,res){
    res.send('Welcome to Campgrounds Page')
});



//SERVER LISTENING//
app.listen(process.env.PORT,process.env.IP,function(){
    console.log('Server Started');
});