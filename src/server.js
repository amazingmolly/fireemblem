/*!
 *
 *      npm install http-server http-proxy
 *      node server
 *
 */

var url = require('url'),
    http = require('http'),
    httpServer = require('http-server'),
    httpProxy = require('http-proxy');


// targets
var frontend = ['ai', 'artifact', 'audio', 'core', 'io', 'loader', 'scene', 'surface', 'game'],
    backend = { module: 'backend', root: 'http://localhost:25001' },
    port = 15000;


Array.prototype.collect = function(transform) {
    var list = [];
    this.forEach(function(it){
        list.push(transform(it));
    });
    return list;
};

var servers = frontend.collect(function(it) {
    port++;
    return {
        host: 'localhost',
        module: it,
        port: port,
        root: 'http://localhost:' + port.toString(),
    };
});


servers.forEach(function(it) {
    httpServer.createServer({
        root: it.module,
        showDir: 'false'
    }).listen(it.port);

    console.log('listen ' + it.module + ' -> ' + it.root);
});


// 
// Create a proxy server with custom application logic 
// 
var proxy = httpProxy.createProxyServer({});

// 
// Create your custom server and just call `proxy.web()` to proxy 
// a web request to the target passed in the options 
// also you can use `proxy.ws()` to proxy a websockets request 
// 
var server = http.createServer(function(req, res) {

    // probe the frontend
    if (req.method === 'GET') {
        var probe = 0,
            success = false;
        servers.forEach(function(it) {
            //console.log('ready to ping -> ' + it);

            var host = it;
            http.request({
                host: host.host,
                port: host.port,
                method: 'HEAD',
                path: req.url
            }, function(pres) {
                probe++;
                //pres.end();
                if (success) {
                    //console.log('request [' + req.url + '] was handled before -> ' + host);
                    return;
                } else if (pres.statusCode === 200) {
                    success = true;
                    console.log(host.root + req.url + ' [' + host.module + ']');
                    proxy.web(req, res, {
                        target: host.root
                    });
                } else if (probe === servers.length) {
                    console.log(backend.root + req.url + ' [' + backend.module + ']');
                    proxy.web(req, res, {
                        target: backend.root
                    });
                } else {
                    //console.log('what? -> ' + probe);
                }
            }).end();
        });

        //console.log('leaving [GET] request to -> ' + req.url);
    } else {
        console.log(backend.root + req.url + ' [' + backend.module + ']');
        proxy.web(req, res, {
            target: backend.root
        });
    }

    //console.log('leaving request to -> ' + req.url);
});


console.log("listening on port 5050")
server.listen(5050);



// 
// fake backend
// 
http.createServer(function(req, res) {
    res.writeHead(200, {
        'Content-Type': 'text/plain'
    });
    res.write('fake backend' + '\n' + JSON.stringify(req.headers, true, 2));
    res.end();
}).listen(25001);