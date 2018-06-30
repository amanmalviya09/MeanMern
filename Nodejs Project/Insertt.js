var http= require('http');
var fs= require('fs');
var qs= require('querystring');
var bpay = require("./InsertBl");
var MongoClient = require("mongodb").MongoClient;
var eid;
var ename;
var ebpay;


http.createServer(function(req,res){
  if(req.method == "GET"){
      res.writeHead(200, {"Content-Type":"text/html"});
      fs.createReadStream("./project.html","UTF-8").pipe(res);
        }
        else if(req.method=="POST"){
            var body="";
            req.on("data", function(chunk){
                body+=chunk;
                console.log("data");
            });
            req.on("end", function(){
                var obj = qs.parse(body);
               eid = obj.Eid;
               ename=obj.Ename;
               ebpay = parseFloat(obj.Ebp);
               var insrt = new bpay.Employee(ebpay);
               var npay = insrt.calculatenetpay();
               
                res.writeHead(200, {"Content-Type": "Text/html"});
            res.end(`
                <!DocTYPE html>
                <html>
                <head>
                <title>Get converted value</title>
                </head>
                <body> 
                <form action="/" method="POST">
                <label>EMP ID </label>
                <input type="text" id="empID" value = ${eid} name="empID" readonly/>
         
                <label>Name</label>
                <input type="text" id="name" value = ${ename} name="name" readonly />
         
                <label>Basic Pay</label>
                <input type="text" id="basicpay" value = ${ebpay} name="basicpay" readonly/>
             
                <label> Net Pay</label>
                <input type="text" id="netpay" name= "netpay" value= ${npay} readonly />

                </form>
                </body> 
                </html>
            `);
        MongoClient.connect('mongodb://127.0.0.1:27017/sample', function(err, db){
            if(err){
            console.log(err);
             }
                db.collection('EmpD').insert({"EmpID": eid, "Name": ename, "BasicPay" : ebpay, "NetPay" : npay});
                db.close();
});
        });
        }
        }).listen(3000);
    console.log("form server starting on port 3000");



