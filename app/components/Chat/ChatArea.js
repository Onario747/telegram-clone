"use client";
import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { useTheme } from "../../context/ThemeContext";
import MessageBubble from "./MessageBubble";
import { MessageInput } from "./MessageInput";
import { ChatHeader } from "./ChatHeader";
import { FileUpload } from "../../components/shared/FileUpload";
import { VoiceRecorder } from "../../components/shared/VoiceRecorder";
import { VideoCall } from "../../components/shared/VideoCall";
import styles from "./ChatArea.module.css";

export default function ChatArea({
  selectedChat,
  messages,
  loading,
  hasMore,
  onLoadMore,
  onSendMessage,
  onSendFile,
  onSendVoice,
  onBackClick,
  onMenuClick,
  isMobile,
  onReactToMessage,
  onInitiateVideoCall
}) {
  const { isDarkMode } = useTheme();
  const [message, setMessage] = useState("");
  const [isRecording, setIsRecording] = useState(false);
  const [isInVideoCall, setIsInVideoCall] = useState(false);
  const messagesEndRef = useRef(null);
  const messagesContainerRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleScroll = (e) => {
    const { scrollTop } = e.target;
    
    if (scrollTop < 100 && hasMore && !loading) {
      onLoadMore();
    }
  };

  if (!selectedChat) {
    return (
      <div className={`${styles.noChatSelected} ${isDarkMode ? styles.dark : styles.light}`}>
        <div className={styles.noChatContent}>
          <h2>Select a chat to start messaging</h2>
          <p>Choose from your existing conversations or start a new one</p>
        </div>
      </div>
    );
  }

  return (
    <div className={`${styles.chatArea} ${isDarkMode ? styles.dark : styles.light}`}>
      <ChatHeader 
        chat={selectedChat}
        onBackClick={onBackClick}
        onMenuClick={onMenuClick}
        isMobile={isMobile}
      />
      
      <div 
        className={styles.messagesContainer}
        ref={messagesContainerRef}
        onScroll={handleScroll}
      >
        {loading && (
          <div className={styles.loadingIndicator}>
            Loading messages...
          </div>
        )}
        {messages.map((message) => (
          <MessageBubble
            key={message.id}
            message={message}
            onReact={onReactToMessage}
          />
        ))}
        <div ref={messagesEndRef} />
      </div>
      
      <div className={styles.inputArea}>
        <FileUpload onFileSelect={onSendFile} />
        
        <MessageInput
          value={message}
          onChange={setMessage}
          onSend={() => {
            if (message.trim()) {
              onSendMessage(message);
              setMessage("");
            }
          }}
        />
        
        <VoiceRecorder
          isRecording={isRecording}
          onStartRecording={() => setIsRecording(true)}
          onStopRecording={(audioBlob) => {
            setIsRecording(false);
            onSendVoice(audioBlob);
          }}
        />
      </div>

      {isInVideoCall && (
        <VideoCall
          chatId={selectedChat.id}
          onEnd={() => setIsInVideoCall(false)}
        />
      )}
    </div>
  );
}