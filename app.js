var express = require("express");
var app = express();
var bodyParser = require('body-parser');
var campgrounds = [
            {name:"OOTY", image:"http://aventuraooty.com/files/resized/527053/850;638;ccde184cf83e3efcb6f5e175a29bee9fac2b4544.jpg"},
            {name:"KODAIKANAL", image:"http://1.bp.blogspot.com/-5mo9xz6w0lc/UgyNVDuEL_I/AAAAAAAABQE/rzfeP_YEwPY/s1600/p3.jpg"},
            {name:"YERCAUD", image:"https://media-cdn.tripadvisor.com/media/photo-s/03/3d/46/c7/getlstd-property-photo.jpg"}
                ];

//MIDDLEWARE//
app.use(bodyParser.urlencoded({extended:true}));
app.set(express.static('public'));
app.set('view engine', 'ejs');
//ROUTING//
app.get('/',function(req,res){
    res.send('This is the Home Page');
});

app.get('/campgrounds',function(req,res){
    res.render('campgrounds',{campgrounds:campgrounds});
});

app.get('/campgrounds/:id',function(req,res){
    var id = req.params.id;
    res.send('This is the Details of the '+id + ' campground');
});

app.post('/newcampgrounds',function(req,res){
    var name = req.body.name;
    var image = req.body.image;
    var newCampground = {name:name,image:image};
    campgrounds.push(newCampground);
    res.redirect('campgrounds');
});



//SERVER LISTENING//
app.listen(process.env.PORT,process.env.IP,function(){
    console.log('Server Started');
});