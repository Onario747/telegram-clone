"use client";
import { useState, useRef } from "react";
import { IoMic, IoStop } from "react-icons/io5";
import styles from "./VoiceRecorder.module.css";

export function VoiceRecorder({ isRecording, onStartRecording, onStopRecording }) {
  const mediaRecorder = useRef(null);
  const chunks = useRef([]);
  const [duration, setDuration] = useState(0);
  const timerRef = useRef(null);

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      mediaRecorder.current = new MediaRecorder(stream);
      
      mediaRecorder.current.ondataavailable = (e) => {
        chunks.current.push(e.data);
      };

      mediaRecorder.current.onstop = () => {
        const blob = new Blob(chunks.current, { type: "audio/webm" });
        chunks.current = [];
        onStopRecording(blob);
        stream.getTracks().forEach(track => track.stop());
        clearInterval(timerRef.current);
        setDuration(0);
      };

      mediaRecorder.current.start();
      onStartRecording();
      
      timerRef.current = setInterval(() => {
        setDuration(prev => prev + 1);
      }, 1000);
    } catch (error) {
      console.error("Error accessing microphone:", error);
    }
  };

  const stopRecording = () => {
    if (mediaRecorder.current?.state === "recording") {
      mediaRecorder.current.stop();
    }
  };

  const formatDuration = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  return (
    <div className={styles.voiceRecorder}>
      <button
        className={`${styles.recordButton} ${isRecording ? styles.recording : ""}`}
        onClick={isRecording ? stopRecording : startRecording}
      >
        {isRecording ? <IoStop /> : <IoMic />}
      </button>
      {isRecording && (
        <span className={styles.duration}>{formatDuration(duration)}</span>
      )}
    </div>
  );
} 