import { WebSocket } from "ws";
import { socketManager, Users } from "./SocketManager";
import { Game } from "./Game";

import { 
    GAME_ADDED,
    GAME_ALERT,
    INIT_GAME,
    MOVE
    } from "./messages"
 
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
            if(message.type === INIT_GAME){
                if(this.pendingGameId){
                    const game = this.games.find((x) => { x.gameId === this.pendingGameId });
                    if(!game){
                        console.error("Pending game not found");
                        return;
                    }

                    if(user.userId === game.player1UserId){
                        socketManager.broadcast(
                            game.gameId,
                            JSON.stringify({
                                type: GAME_ALERT,
                                payload: {
                                    message: "Trying to connect with yourself!"
                                }
                            })
                        );
                        return;
                    }
                    socketManager.addUser(user, game.gameId);
                    //update second player to play
                    this.pendingGameId = null;
                } else{
                    const game = new Game(user.userId, null);

                    this.games.push(game);
                    this.pendingGameId = game.gameId;

                    socketManager.addUser(user, game.gameId);
                    socketManager.broadcast(
                        game.gameId,
                        JSON.stringify({
                            type: GAME_ADDED,
                            gameId: game.gameId
                        })
                    );
                }
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