import { WebSocket } from "ws";
import { Users } from "./SocketManager";
 
export class GameManager{
    private users: Users[];


    constructor(){
        this.users = [];
    }

    addUser(user: Users) {
        const newUser = this.users.push(user);
    }
}