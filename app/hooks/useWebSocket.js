"use client";
import { useEffect, useRef } from "react";

export function useWebSocket(sessionString, handlers) {
  const ws = useRef(null);

  useEffect(() => {
    if (!sessionString) return;

    const wsUrl = `${process.env.NEXT_PUBLIC_WS_URL || 'ws://localhost:3001'}/ws/${sessionString}`;
    ws.current = new WebSocket(wsUrl);

    ws.current.onopen = () => {
      console.log('WebSocket connected');
    };

    ws.current.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        
        switch (data.type) {
          case 'message':
            handlers.onMessage?.(data.payload);
            break;
          case 'userStatus':
            handlers.onUserStatus?.(data.payload);
            break;
          case 'reaction':
            handlers.onReaction?.(data.payload);
            break;
          case 'typing':
            handlers.onTyping?.(data.payload);
            break;
          default:
            console.log('Unknown message type:', data.type);
        }
      } catch (error) {
        console.error('Error processing WebSocket message:', error);
      }
    };

    ws.current.onerror = (error) => {
      console.error('WebSocket error:', error);
    };

    ws.current.onclose = () => {
      console.log('WebSocket disconnected');
    };

    return () => {
      if (ws.current) {
        ws.current.close();
      }
    };
  }, [sessionString, handlers]);

  const sendMessage = (type, payload) => {
    if (ws.current?.readyState === WebSocket.OPEN) {
      ws.current.send(JSON.stringify({ type, payload }));
    }
  };

  return {
    sendMessage,
    isConnected: ws.current?.readyState === WebSocket.OPEN
  };
}