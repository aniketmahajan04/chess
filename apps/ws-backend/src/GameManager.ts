import { WebSocket } from "ws";
import { Users } from "./SocketManager";
import { Game } from "./Game";
 
export class GameManager{
    private users: Users[];
    private games: Game[];
    private pendingGameId: string | null;


    constructor(){
        this.users = [];
        this.games = [];
        this.pendingGameId = null;
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
                this.games.push(game);
                this.pendingGameId = game.gameId;
                this.users.forEach((user) => {
                    if(user.userId === game.player1UserId){
                        user.socket.send(JSON.stringify({
                            type: "GAME_ADDED",
                            gameId: game.gameId
                        }))
                    }
                })
            }

            if(message.type === "MOVE"){
                const gameId = message.payload.gameId;
                const game = this.games.find((game) => gameId === game.gameId);
                if(game){
                    game.makeMove(user, message.payload.move);
                }
            }



        })
    }
}