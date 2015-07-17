var sys = require("sys"),
    my_http = require("http"),
    url = require('url'),
    path = require('path');

my_http.createServer(function(request,response){
    console.log('called');
    response.writeHeader(200, {"Content-Type": "text/plain"});
    var fullPath = path.join(process.cwd(), url.parse(request.url).pathname);
    var msg = "Hello \n" + fullPath;
    response.write(msg);
    response.end();
}).listen(8080);
console.log("Server Running on 8080");
