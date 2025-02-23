import { Chess, Move } from "chess.js";
import { randomUUID } from "crypto";
import { socketManager, Users } from "./SocketManager";
import { INIT_GAME } from "./messages";
import { db } from "./db";


export class Game {
    public gameId: string;
    public player1UserId: string;
    public player2UserId: string | null;
    public chessBoard: Chess;
    public startTime = new Date(Date.now());

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

    async getSecondPlayer(player2UserId: string){
        this.player2UserId = player2UserId;

        // find player 2 in db // find user in db

        try{
            // call createGameDb function
        } catch(error){
            console.error(error);
            return;
        }

        // const WhitePlayer = user.find((user) => user.id === this.player1UserId);
        // const BlackPlayer = user.find((user) => user.id === this.player2UserId);

        // socketManager.broadcast(
        //     this.gameId,
        //     JSON.stringify({
        //         type: INIT_GAME,
        //         payload: {
        //             gameId: this.gameId,
        //             WhitePlayer: {
        //                 name: WhitePlayer.name,
        //                 id: this.player1UserId,
        //             },
        //             BlackPlayer: {
        //                 name: BlackPlayer.name,
        //                 id: this.player2UserId 
        //             },
        //             fen: this.chessBoard.fen(),
        //             moves: []
        //         },
        //     }),
        // );

    }

    async createGameInDb(){
        this.startTime = new Date(Date.now());
        //count last move time

        const game = await db.game.create({
            data: {
                id: this.gameId,
                status: 'IN_PROGRESS',
                startedAt: this.startTime,
                currentFen: 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1',
                whitePlayer: {
                    connect: {
                        id: this.player1UserId
                    },
                },
                blackPlayer: {
                    connect: {
                        id: this.player2UserId ?? ''
                    }
                },
            },
            include : {
                whitePlayer: true,
                blackPlayer: true
            }
        });
        this.gameId = game.id;
    }



}