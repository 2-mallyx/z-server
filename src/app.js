const http = require('http');
const crypto = require('crypto');

const sql = require('./sql.js');

const server = http.createServer((req, res) => {
    console.log('Heartbeat request received.')

    if (req.url === '/') {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/plain');
        res.end('Hello, World!\n');
    } else if (req.url === '/api/auth') {
        console.log('Auth request received.')
        
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');

        if (req.headers['machineguid']) {
            console.log('Mainboard provided: ' + req.headers['machineguid']);
            try{
                sql.addEndpoint(req.headers['machineguid']).then(auth_token => {
                    console.log('Mainboard added to database.');
                    res.end(JSON.stringify({ 'token': auth_token }));
                }).catch((err) => {
                    console.error('add' + err.message);
                });
                
                console.log('Mainboard provided: ' + mainboard);
            } catch {}
        } else { res.end('error no mainboard provided'); }
    } else if (req.url === '/api/heartbeat') {
        console.log('Heartbeat request received.')
        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/plain');
        res.end('This is the about page.\n');
    } else {
        res.statusCode = 404;
        res.setHeader('Content-Type', 'text/plain');
        res.end('Page not found.\n');
    }
});

server.listen(80, () => {
    console.log('Server running at http://localhost:3000/');
});


//webseite
//auth
//put messages
//