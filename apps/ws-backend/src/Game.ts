import { Chess, Move } from "chess.js";
import { randomUUID } from "crypto";
import { Users } from "./SocketManager";


export class Game {
    public gameId: string;
    public player1UserId: string;
    public player2UserId: string | null;
    public chessBoard: Chess;

    constructor(player1UserId: string, player2UserId: string | null, gameId?: string){
        this.player1UserId = player1UserId;
        this.player2UserId = player2UserId;
        this.gameId = gameId ?? randomUUID();
        this.chessBoard = new Chess();
    }

    makeMove(
        user: Users,
        move: Move
    ){
        if(this.chessBoard.turn() === "w" && user.userId !== this.player1UserId){
            return;
        }

        if(this.chessBoard.turn() === "b" && user.userId !== this.player2UserId){
            return;
        }

        this.chessBoard.move({
            from: move.from,
            to: move.to
        })
    }
}