// Modules:
var express = require('express');
var bodyParser = require('body-parser');
var mongo = require('mongodb');
var mongoClient = require('mongodb').MongoClient;
var assert = require('assert');

var port = 5010;
var dbName = "shopeasy";
var collectionName = "item_data";
var dbUrl = "mongodb://localhost:27017/"+dbName;

// Initialize:
var app = express();
app.use(express.static(__dirname + "/public"));
app.use(bodyParser.json());

// Server check
app.listen(port);
console.log("Server running on port 5010");

// Database transactions:

var getAllRecords = function(){
    resultArray = [];
    var response = 0;
    mongoClient.connect(dbUrl, function(err, database) {
        console.log("Connected to "+dbUrl);
        assert.equal(null,err);
        var myDb = database.db(dbName);
        var cursor = myDb.collection(collectionName).find();

        cursor.forEach(
            function(doc, err){
                assert.equal(null,err);
                resultArray.push(doc);
            },
            function(){
                database.close();
                response = resultArray;
                return response;
            }
        );
        // console.log(resultArray);
        
        // myDb.collection(collectionName).insertOne(item, function(error, result){
        //     assert.equal(null,error);
        //     console.log("Item inserted");
        //     response = item;
        // });
    });
    return response;
};

var insert = function(item){

    var response = 0;
    mongoClient.connect(dbUrl, function(err, database) {
        console.log("Connected to "+dbUrl);
        assert.equal(null,err);
        var myDb = database.db(dbName);
        myDb.collection(collectionName).insertOne(item, function(error, result){
            assert.equal(null,error);
            console.log("Item inserted");
            response = item;
        });
        database.close();
    });
    return response;
}
// HTTP request handlers 
app.get('/shopeasy',function(req,res){
    console.log("GET req received");
    var response = getAllRecords();
    res.json(response);
});

app.post('/shopeasy',function(req,res){
    console.log("POST req received");
    var response = insert(req.body);
    res.json(response);
});

app.put('/shopeasy',function(req,res){
    res.json("hello"+req.body);
});

app.delete('/shopeasy',function(req,res){
    res.json("hello"+req.body);
});