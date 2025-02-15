import { WebSocket } from "ws";
import { randomUUID } from 'crypto';


export class Users{
    public socket: WebSocket;
    public id: string;
    public name: string;
    public userId: string;

    constructor(socket: WebSocket, userId: string, name: string){
        this.socket = socket;
        this.userId = userId
        this.id = randomUUID();
        this.name = name;
    }
}