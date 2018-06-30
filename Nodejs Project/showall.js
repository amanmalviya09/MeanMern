var MongoClient= require("mongodb").MongoClient;

MongoClient.connect('mongodb://127.0.0.1:27017/sample', function(err, db){
if(err){
console.log(err);
}
db.collection('EmpD').find().toArray(function(err, result){
if(err) throw err;
console.log(result);
});
db.close();
});
