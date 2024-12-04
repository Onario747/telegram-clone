import { useRef, useEffect } from "react";
import styles from "./ChatArea.module.css";

export function ChatMenu({ chat, onClose, onBlock, onLeave, position }) {
  const menuRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        onClose();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [onClose]);

  return (
    <div
      ref={menuRef}
      className={styles.chatMenu}
      style={{
        position: "absolute",
        top: position?.top || "60px",
        right: position?.right || "10px",
      }}
    >
      {chat.type === "Channel" ? (
        <button onClick={onLeave} className={styles.menuItem}>
          Leave Channel
        </button>
      ) : (
        <button onClick={onBlock} className={styles.menuItem}>
          Block User
        </button>
      )}
    </div>
  );
}
