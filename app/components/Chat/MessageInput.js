"use client";
import { IoSend, IoHappy } from "react-icons/io5";
import styles from "./MessageInput.module.css";

export function MessageInput({ value, onChange, onSend }) {
  return (
    <div className={styles.messageInput}>
      <button className={styles.emojiButton}>
        <IoHappy />
      </button>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Type a message..."
        className={styles.input}
        onKeyUp={(e) => e.key === "Enter" && onSend()}
      />
      <button onClick={onSend} className={styles.sendButton}>
        <IoSend />
      </button>
    </div>
  );
}