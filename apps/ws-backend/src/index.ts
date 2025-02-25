import { WebSocket, WebSocketServer } from "ws";
import { GameManager } from "./GameManager";
import url from 'url';
import { extractAuthUser } from "./auth";

const wss = new WebSocketServer({ port: 8080 });
const gameManager = new GameManager();

wss.on("connection", function connection(ws: WebSocket, req) {
    ws.send("Connected");

    //@ts-ignore
    const token: string = url.parse(req.url, true).query.token;
    const user = extractAuthUser(token, ws);

    gameManager.addUser(user);

    ws.on("close",() => {
        console.log("Disconnected");
    });
});