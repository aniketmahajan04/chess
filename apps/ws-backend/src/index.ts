import { WebSocketServer } from "ws";

const wss = new WebSocketServer({ port: 8080 });

wss.on("connection", function connection(ws) {
    ws.send("Connected");

    ws.on("close", function close(ws) {
        console.log("Disconnected");
    })
})