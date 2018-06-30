var http = require("http");
var fs = require("fs");
var qs = require("querystring")
var MongoClient = require("mongodb").MongoClient;
var Id;

http.createServer(function(req,res){
console.log(req.method);
if(req.method == "GET"){
res.writeHead(200, {"Content-Type" : "text/html"})
fs.createReadStream("./projectfind.html", "UTF-8").pipe(res);
}
else if (req.method == "POST"){
var body = "";
req.on("data",function(chunk){
body += chunk;
console.log("data");
});

req.on("end", function(){
var obj = qs.parse(body);
Id = obj.empID;
MongoClient.connect('mongodb://127.0.0.1:27017/sample', function(err, db){
if(err){
console.log(err);
}
else{
db.collection('EmpD').remove({"EmpID": Id}, function(err, result){
if(err) throw err;
res.writeHead(200, {"Content-Type" : "text/html"})
res.end("Deleted");
});
db.close();
}
});
});
}
}).listen(3000);
console.log("form server listening on port 3000");
