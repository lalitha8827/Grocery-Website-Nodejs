var mongojs=require('mongojs');
var link="mongodb+srv://lalitha:BhramarambikA@cluster0.fmr33.mongodb.net/mongodb?retryWrites=true&w=majority";
var dbs=mongojs(link,['list']);
var express = require('express')  
var ap = express()  
ap.use(express.static('public'))

ap.get('/submitlist',function(req,res){
	var d={
		email:req.query.email,
		item1:req.query.l1,
		item2:req.query.l2,
		item3:req.query.l3,
		item4:req.query.l4,
		item5:req.query.l5,
		item6:req.query.l6,
		item7:req.query.l7,
		item8:req.query.l8,
		item9:req.query.l9,
		item10:req.query.l10,
		item11:req.query.l11,
		item12:req.query.l12
	}
	dbs.list.find(d,function(err,docs){
		if(err){
			res.send("Something went wrong")
		}
		else{
			dbs.list.insert(d,function(err,docs){
					if(err){
						res.send("smtg went wrong,try later")
					}
					else{
						res.send("Successfully inserted")
					}
				})
		}
	})
})