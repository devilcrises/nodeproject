// var http = require('http');
// var uc = require('upper-case');

// http.createServer(function(req,res){
//     res.writeHead(200,{'content-type':'text/html'});
//     res.write(uc.upperCase('hello kanishk sharma'));
//     res.end();
// }).listen(9090);
/* */
// var fs = require('fs');

// var  readStreamline = fs.createReadStream('./demotextfile.txt');

// readStreamline.on('open',function(){
//      console.log('files is opening');
// });

var events = require('events');

var eventEmitter = new  events.EventEmitter();

var myEventhandler = function(){
    console.log('I hear you');
}
eventEmitter.on('screen',myEventhandler);

eventEmitter.emit('screen');

