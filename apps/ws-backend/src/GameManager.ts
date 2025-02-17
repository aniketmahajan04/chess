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
        this.addHandler(user);
    }

    removeUser(socket: WebSocket){
        // const user = this.users.find( x => user?.socket === socket);
        // if(!user){
        //     console.log("user not found");
        //     return;
        // }

        this.users = this.users.filter((user) => user.socket !== socket);

        //implement a function to remove socket of user
        // implement a function to remove game of this socket 
    }

    private addHandler(user: Users){
        user.socket.on("message", (data) => {
            const message = JSON.parse(data.toString());
            if(message.type === "INIT_GAME"){
                const game = new Game(user.userId, null);
            }

            if(message.type === "MOVE"){
                const gameId = message.payload.gameId();
                const game = this.game.filter((game) => gameId === game.gameId);
                if(game){
                    game.makeMove(user, message.payload.move)
                }
            }



        })
    }
}