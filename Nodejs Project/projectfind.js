var http = require("http");
var fs = require("fs");
var qs = require("querystring")
var MongoClient = require("mongodb").MongoClient;



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
        db.collection('EmpD').find({"EmpID": Id}).toArray(function(err, result){
        if(err) throw err;
        
        console.log(result[0])
        
        ename = result[0].Name;
        basicPay = result[0].BasicPay;
        netPay = result[0].NetPay;
        
        console.log("name ="+ename);
        res.writeHead(200, {"Content-Type" : "text/html"})
        res.end(`
        <html>
        <head>
        <title>Employee</title> 
        </head>
        <body>
        <h1>Fill Employee Details</h1>
        <form action = "/" method = "post">
        <label>Employee ID</label>
        <input type = "text" id = "eid" name = "EmployeeID" value = ${Id} readonly/>
        <label>Name</label>
        <input type = "text" id = "name" name = "Name" value = ${ename} readonly/>
        <label>Basic Pay</label>
        <input type = "text" id = "basicpay" name = "BasicPay" value = ${basicPay} readonly/>
        <label>Net Pay</label>
        <input type = "text" id = "basicpay" name = "BasicPay" value = ${netPay} readonly/>
        </form>
        </body>
        </html>
        `);
        });
        db.close();
        }
        });
        });
        }
        }).listen(3000);
        console.log("form server listening on port 3000");
    