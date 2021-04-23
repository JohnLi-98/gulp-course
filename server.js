const StaticServer = require("static-server");

// Create a server with StaticServer(), which takes in a few options. First the rootPath, which 
// tells the server which directory is the root. The next is the port, which tells the server which
// port to run on.
const server = new StaticServer({
    rootPath: "./public/",
    port: 3000
});

// Starts the server, but need to pass a callback function when it starts as an argument.
server.start(() => {
    console.log("server started on port " + server.port);
})