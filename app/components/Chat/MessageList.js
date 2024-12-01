"use client";
import { useRef, useEffect } from "react";
import { Message } from "./Message";
import styles from "./MessageList.module.css";

export function MessageList({ messages, onReact }) {
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className={styles.messageArea}>
      {messages.map((message) => (
        <Message
          key={message.id}
          message={message}
          onReact={onReact}
        />
      ))}
      <div ref={bottomRef} />
    </div>
  );
}