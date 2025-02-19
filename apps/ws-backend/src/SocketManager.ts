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

class SocketManager {
    private static instance: SocketManager;

    private interestedSockets: Map<string, Users[]>;
    private userRoomMapping: Map<string, string>;

    private constructor(){
        this.interestedSockets = new Map<string, Users[]>();
        this.userRoomMapping = new Map<string, string>();
    }

    static getInstance(){
        if(SocketManager.instance){
            return SocketManager.instance;
        }

        SocketManager.instance = new SocketManager();
        return SocketManager.instance
    }

    addUser(user: Users, roomId: string){
        this.interestedSockets.set(roomId, [
            ...(this.interestedSockets.get(roomId) || []),
            user
        ])
        this.userRoomMapping.set(user.userId, roomId);
    }

    broadcast(roomId: string, message: string){
        const users = this.interestedSockets.get(roomId);
        if(!users){
            console.error("User not found");
            return;
        }

        users.forEach((user) => {
            user.socket.send(message);
        });
    }

    removeUser(user: Users){
        const roomId = this.userRoomMapping.get(user.userId);
        if(!roomId){
            console.error("User not interesting in any room?");
            return;
        }

        const room = this.interestedSockets.get(roomId) || [];
        const remainingUsers = room.filter(u => {
            u.userId !== user.userId
        });

        this.interestedSockets.set(
            roomId,
            remainingUsers
        )

        if(this.interestedSockets.get(roomId)?.length === 0){
            this.interestedSockets.delete(roomId);
        }

        this.userRoomMapping.delete(user.userId);

    }
}

export const socketManager = SocketManager.getInstance();