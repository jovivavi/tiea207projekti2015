var request = require('request');
var myJSON = require('JSON');
var sql = require('mysql');
var lite = require('sqlite3').verbose();
var id ="";
var key ="";
var off = 0;
var testjson ="";
var fs = require('fs');
var db = new lite.Database('database');
 
fs.exists('DB', function (exists) {
  console.info('Creating database. This may take a while...');
    fs.readFile('test.sql', 'utf8', function (err, data) {
      if (err) throw err;
      db.exec(data, function (err) {
        if (err) throw err;
        console.info('Done.');
      });
    });
});

function getMyBody(url, callback) {
    request({
	url: url,
	async:false,
	json: true
    }, function (error, response, body) {
	if (error || response.statusCode !== 200) {
	    return callback(error || {statusCode: response.statusCode});
	}
	return callback(null, body);
    });
}

function kissa(){
getMyBody('https://external.api.yle.fi/v1/programs/items.json?app_id=' + id + '&app_key='+ key + '&category=5-131&availability=ondemand&mediaobject=video&type=TVProgram', function(err, body) {
    if (err) {
	console.log(err);
    } else {
        console.log(body.meta.count);
     var count = body.meta.count;
     var offset = 0;
     while(count > offset)
     {
	 
	     console.log("juuh");
	     listaa(offset);
	     offset = offset +100;
     }
	
      
    }
});
}

function listaa(off){
    getMyBody('https://external.api.yle.fi/v1/programs/items.json?app_id=' + id + '&app_key='+ key + '&category=5-131&availability=ondemand&mediaobject=video&type=TVProgram&offset='+off+ '&limit=' + 100, function(err, body) {
	if (err) {
	    console.log(err);
	} else {


            for(var i = 0; i < 100; i++){
                var smn = "";
                var iid = "";
		var orgt = "";

                try{
		    iid =  body.data[i].image.id;
                    smn = body.data[i].title.fi;
		    orgt = body.data[i].originalTitle.unknown;
                }
                catch(err){
                    //
                }
		try{
                    body.data[i].id;
		}
                catch(err){continue;}
                var oid = body.data[i].id;
		



		
		db.run('INSERT OR IGNORE INTO elokuvat (id,orginalnimi,suominimi,imgid) VALUES(?,?,?,?)',oid,orgt,smn,iid);
	    }




	}
    });}


kissa();
//db.close();