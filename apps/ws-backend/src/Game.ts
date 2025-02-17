import { Chess } from "chess.js";
import { randomUUID } from "crypto";


export class Game {
    public gameId: string;
    public player1UserId: string;
    public player2UserId: string | null;
    public chessBoard: Chess;

    constructor(player1UserId: string, player2UserId: string, gameId: string){
        this.player1UserId = player1UserId;
        this.player2UserId = player2UserId;
        this.gameId = gameId ?? randomUUID();
        this.chessBoard = new Chess();
        console.log("Game is initialize");
    }
}