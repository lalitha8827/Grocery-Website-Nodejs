
var mongojs=require('mongojs');
var link="mongodb+srv://lalitha:BhramarambikA@cluster0.fmr33.mongodb.net/mongodb?retryWrites=true&w=majority";
var db=mongojs(link,['app','list']);


var express = require('express')  
var ap = express()  
ap.use(express.static('public'))

ap.set('view engine','ejs')

ap.get('/', function (req, res) {  
	res.sendFile(__dirname+"/public/index.html")  
})  
  
ap.get('/signupsubmit',function(req,res){
	var d={
		firstname:req.query.first_name,
		lastname:req.query.last_name,
		email:req.query.email,
		password:req.query.pwd,
		place:req.query.place
	}
	var dd={
		email:req.query.email,
	}
	db.app.find(dd,function(err,docs){
		if(err){
			res.send('something went wrong');
		}
		else{
			if(docs.length>0){
				res.sendFile(__dirname+"/public/already.html");
			}
			else{
				db.app.insert(d,function(err,docs){
					if(err){
						res.send("smtg went wrong,try later")
					}
					else{
						res.sendFile(__dirname+"/public/loginn.html")
					}
				})
			}
		}
	})
})

ap.get('/loginsubmit',function(req,res){
	var d={
		email:req.query.email,
		password:req.query.pswd
	}
	db.app.find(d,function(err,docs){
		if(err){
			res.send("Something went wrong")
		}
		//res.send(d)
		if(docs.length>0)
		{
			res.sendFile(__dirname+"/public/homepage.html")  
		}
		else{
			res.sendFile(__dirname+"/public/donthave.html")
		}
	})
})


ap.get('/submitlist',function(req,res){
	var d={
		name:req.query.name,
		phone:req.query.phone,
		address:req.query.address,
		item1:req.query.l1,
		item2:req.query.l2,
		item3:req.query.l3,
		item4:req.query.l4,
		item5:req.query.l5,
		item6:req.query.l6,
		item7:req.query.l7,
		item8:req.query.l8,
		item9:req.query.l9,
		item10:req.query.l10
	}
	
	db.list.insert(d,function(err,docs){
		if(err){
			res.send("smtg went wrong,try later")
		}
		else{
			res.sendFile(__dirname+"/public/thank.html")
		}
	})
})


ap.get('/dashboard',function(req,res){

	db.list.find({}, function(err,data){
		if (err) { 
			res.send('something went wrong')
		}
		else{
			//console.log(data.length)
			res.render('dashboard', {use:data})
		}
	})


})






ap.listen(3000, function () {  
console.log('Example app listening on port 3000!')  
})


/*if(data.length>0){
				db.list.find({}, function(err,dat){
					if(err){
						res.send('something went wrong')
					}
					else{
						console.log(dat)
						res.render('dashboard', {result:data,use:dat})
					}
				})

				
			}
			else{
				console.log(data.length);
				res.send('username & password is wrong')*/








