var express     = require("express");
var app         = express();
var bodyParser  = require('body-parser');
var mongoose    = require('mongoose');

//MIDDLEWARE//
app.use(bodyParser.urlencoded({extended:true}));
app.set(express.static('public'));
app.set('view engine', 'ejs');

//DB & SCHEMA
mongoose.connect('mongodb://localhost/yelp_camp');
var campgroundSchema = new mongoose.Schema({
    name:'string',
    image:'string'
});
var campground = mongoose.model('campground',campgroundSchema);
      /*  campground.create({
            name:'KODAIKANAL',
            image:'http://1.bp.blogspot.com/-5mo9xz6w0lc/UgyNVDuEL_I/AAAAAAAABQE/rzfeP_YEwPY/s1600/p3.jpg'
        },function(err,campground){
            if(err){
                console.log(err);
            }else{
                console.log(campground);
            }
        });
*/
//ROUTING//
app.get('/',function(req,res){
    res.render('home');
});

app.get('/campgrounds',function(req,res){
    //res.render('campgrounds',{campgrounds:campgrounds});
    campground.find({},function(err,campgrounds){
        if(err){
            console.log(err);
        }else{
           res.render('campgrounds',{campgrounds:campgrounds}); 
        }
    });
});

app.get('/campgrounds/:id',function(req,res){
    var id = req.params.id;
    res.send('This is the Details of the '+id + ' campground');
});

app.post('/newcampgrounds',function(req,res){
    var name = req.body.name;
    var image = req.body.image;
    var newCampground = {name:name,image:image};
    campground.create(newCampground,function(err,newcamp){
        if(err){
            console.log('err');
        }else{
            res.redirect('campgrounds');
        };
    });
    
});

app.get('/newcampground',function(req,res){
    res.render('new');
});

//SERVER LISTENING//
app.listen(process.env.PORT,process.env.IP,function(){
    console.log('Server Started');
});