import { WebSocket, WebSocketServer } from "ws";
import { Users } from "./SocketManager";
import { GameManager } from "./GameManager";

const wss = new WebSocketServer({ port: 8080 });
const gameManager = new GameManager();

wss.on("connection", function connection(ws: WebSocket) {
    ws.send("Connected");

    const user = new Users(ws, "ahdhsjkjs", "Aniket");
    gameManager.addUser(user);

    ws.on("close",() => {
        console.log("Disconnected");
    })
})