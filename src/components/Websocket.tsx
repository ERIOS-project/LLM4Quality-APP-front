import { useState } from "react";
import { Button } from "@mui/material";
import { useEffect } from "react";
import { getUserToken } from "../authConfig";

export default function Websocket() {
    const [ws, setWs] = useState<WebSocket | null>(null);

    const initializeWebSocket = async () => {
        const websocketUrl = `${import.meta.env.VITE_API_URL}/ws`;
        const socket = new WebSocket(websocketUrl);
        const token = await getUserToken();

        socket.onopen = () => {
            socket.send(JSON.stringify({ token: token }));
            console.log("WebSocket connection opened");
        };

        socket.onmessage = (event) => {
            console.log("WebSocket message received:", event.data);
        };

        socket.onerror = (error) => {
            console.error("WebSocket error:", error);
        };

        socket.onclose = () => {
            console.log("WebSocket connection closed");
        };

        setWs(socket);
    };

    const handleButtonClick = () => {
        initializeWebSocket();
    };

    // Cleanup on component unmount
    useEffect(() => {
        return () => {
            if (ws) {
                ws.close();
            }
        };
    }, [ws]);

    return (
        <div>
            <Button variant="contained" color="primary" onClick={handleButtonClick}>
                Websocket
            </Button>
        </div>
    );
}