import * as http from "http";
import App from "./app";

require('dotenv').config({silent:true})

const port = process.env.PORT || 8000;

App.set("port", port);
const server = http.createServer(App);
server.listen(port);

server.on("listening", function (): void {
    try {
        const addr = server.address();
        const bind = (typeof addr === "string") ? `pipe ${addr}` : `port ${addr!.port}`;
        console.log(`Listening on ${bind}`);
    } catch (err) {
        console.log('Error listening to server (check index.ts):' + err);
    }
});

module.exports = App;



