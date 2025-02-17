import { WebSocket } from "ws";
import { Users } from "./SocketManager";
import { Game } from "./Game";
 
export class GameManager{
    private users: Users[];
    private game: Game[];


    constructor(){
        this.users = [];
        this.game = [];
    }

    addUser(user: Users) {
        this.users.push(user);
        console.log(user.id + user.name + user.socket + user.userId);
        this.addHandler(user);
    }

    private addHandler(user: Users){

    }
}