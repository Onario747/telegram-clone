"use client";
import { useRef } from "react";
import { IoAttach } from "react-icons/io5";
import styles from "./FileUpload.module.css";

export function FileUpload({ onFileSelect }) {
  const fileInputRef = useRef(null);

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  const handleChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      onFileSelect(file);
    }
  };

  return (
    <div className={styles.fileUpload}>
      <button onClick={handleClick} className={styles.uploadButton}>
        <IoAttach />
      </button>
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleChange}
        style={{ display: "none" }}
        accept="image/*,audio/*,video/*,application/*"
      />
    </div>
  );
} 