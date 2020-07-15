const http = require('http')
const app = require('./backend/app');
const path = require("path")
const express = require('express');

const onError = error => {
    if (error.syscall !== "listen") {
        throw error;
    }
    const bind = typeof addr === "string" ? "pipe " + addr : "port " + port;

    switch (error.code) {
        case "EACCES":
            console.error(bind + " requires elevated privilegas");
            process.exit(1);
        case "EADDRINUSE":
            console.error(bind + " is already  in use");
            process.exit(1);
            break;
        default:
            throw error;
    }

}

const onListening = () => {
    const addr = server.address();
    const bind = typeof addr === "string" ? "pipe " + addr : "port " + port;
}

var port = process.env.PORT || 5000;

app.set('port', port);

const server = http.createServer(app);

server.on("error", onError);
server.on("listening", onListening);

app.use(express.static(path.join(__dirname, '/dist/mercedes')))
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '/dist/mercedes', 'index.html'))
})

server.listen(port, () => { console.log("Running...") });
