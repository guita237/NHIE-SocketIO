// SocketProvider.tsx
import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { io, Socket } from "socket.io-client";
import { APP_CONFIG } from "../config/appConfig.ts";

interface SocketContextProps {
    children: ReactNode;
}

export const SocketContext = createContext<Socket | null>(null);

const SocketProvider: React.FC<SocketContextProps> = ({ children }) => {
    const [socket, setSocket] = useState<Socket | null>(null);

    useEffect(() => {
        const socketUrl = APP_CONFIG.SOCKET_URL || window.location.origin;

        const newSocket = io(socketUrl, {
            // Options importantes
            withCredentials: true,
            transports: ["websocket", "polling"],
            reconnection: true,
            reconnectionAttempts: 5,
            reconnectionDelay: 1000,
            autoConnect: true,
            path: "/socket.io/"
        });

        // Debug listeners
        newSocket.on("connect", () => {
            console.log("Socket connected:", newSocket.id);
        });

        newSocket.on("connect_error", (error) => {
            console.error("Socket connection error:", error);
        });

        newSocket.on("disconnect", (reason) => {
            console.log("Socket disconnected:", reason);
        });

        setSocket(newSocket);

        return () => {
            newSocket.disconnect();
        };
    }, []);

    return (
        <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
    );
};

const useSocket = (): Socket | null => {
    const context = useContext(SocketContext);
    if (!context) {
        console.log("Socket context not available yet");
    }
    return context;
};

export { SocketProvider, useSocket };