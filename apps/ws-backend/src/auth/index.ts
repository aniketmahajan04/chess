import { Users } from "../SocketManager";
import jwt from "jsonwebtoken";
import { WebSocket } from "ws";

export interface userJwtClaims {
    userId: string,
    name: string,
}

const JWT_SECRET = "your_secret_password";
if (!JWT_SECRET) {
    throw new Error("JWT_SECRET is not defined in environment variables");
}

export const extractAuthUser = (token: string, ws: WebSocket): Users => {
    try {

        const decoded = jwt.verify(token, JWT_SECRET) as userJwtClaims;
        return new Users(ws, decoded);
    } catch(error){
        console.error("JWT verification failed:", error);
        throw new Error("Invalid or expired token");
    }
}