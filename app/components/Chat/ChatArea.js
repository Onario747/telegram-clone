"use client";
import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "../../context/ThemeContext";
import axios from "axios";
import toast from "react-hot-toast";
import MessageBubble from "./MessageBubble";
import { MessageInput } from "./MessageInput";
import { ChatHeader } from "./ChatHeader";
import { FileUpload } from "../../components/shared/FileUpload";
import { VoiceRecorder } from "../../components/shared/VoiceRecorder";
import { VideoCall } from "../../components/shared/VideoCall";
import UserProfile from "../User/UserProfile";
import styles from "./ChatArea.module.css";
import { ChatMenu } from "./ChatMenu";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

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
  onInitiateVideoCall,
  sessionString,
  onChatUpdate,
}) {
  const { isDarkMode } = useTheme();
  const [message, setMessage] = useState("");
  const [isRecording, setIsRecording] = useState(false);
  const [isInVideoCall, setIsInVideoCall] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [isJoining, setIsJoining] = useState(false);
  const [isMember, setIsMember] = useState(selectedChat?.isMember !== false);
  const [canPost, setCanPost] = useState(true);
  const messagesEndRef = useRef(null);
  const messagesContainerRef = useRef(null);

  const [showMenu, setShowMenu] = useState(false);
  const [menuPosition, setMenuPosition] = useState(null);

  const handleMenuClick = (e) => {
    e.stopPropagation();
    const rect = e.currentTarget.getBoundingClientRect();
    setMenuPosition({
      top: `${rect.bottom + 5}px`, // Added small gap
      right: `${window.innerWidth - rect.right}px`,
    });
    setShowMenu((prev) => !prev);
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (showMenu) {
        setShowMenu(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [showMenu]);

  const handleBlockUser = async () => {
    if (!sessionString || !selectedChat?.username) return;

    const loadingToast = toast.loading("Blocking user...");

    try {
      const response = await axios.post(`${BASE_URL}/t/api/chats/block`, {
        sessionString,
        usernameOrUserId: selectedChat.username,
      });

      if (response.data) {
        toast.success("User blocked successfully", { id: loadingToast });
        onBackClick(); // Go back to chat list
      }
    } catch (error) {
      console.error("Failed to block user:", error);
      toast.error(error.response?.data?.error || "Failed to block user", {
        id: loadingToast,
      });
    }
    setShowMenu(false);
  };

  const handleLeaveChannel = async () => {
    if (!sessionString || !selectedChat?.username) return;

    const loadingToast = toast.loading("Leaving channel...");

    try {
      const response = await axios.post(`${BASE_URL}/t/api/channel/leave`, {
        sessionString,
        groupUsername: selectedChat.username,
      });

      if (response.data) {
        toast.success("Left channel successfully", { id: loadingToast });
        onBackClick(); // Go back to chat list
      }
    } catch (error) {
      console.error("Failed to leave channel:", error);
      toast.error(error.response?.data?.error || "Failed to leave channel", {
        id: loadingToast,
      });
    }
    setShowMenu(false);
  };

  useEffect(() => {
    if (selectedChat?.type === "Channel") {
      setIsMember(selectedChat.isMember !== false);
      setCanPost(selectedChat.canPost !== false);
    } else {
      setIsMember(true);
      setCanPost(true);
    }
  }, [selectedChat]);

  const handleJoinChannel = async () => {
    if (!sessionString || !selectedChat?.username) return;

    setIsJoining(true);
    const loadingToast = toast.loading("Joining channel...");

    try {
      const response = await axios.post(`${BASE_URL}/t/api/channel/join`, {
        sessionString,
        groupUsername: selectedChat.username,
      });

      if (response.data) {
        setIsMember(true);
        setCanPost(true);
        toast.success("Successfully joined channel!", { id: loadingToast });
      }
    } catch (error) {
      console.error("Failed to join channel:", error);
      toast.error(error.response?.data?.error || "Failed to join channel", {
        id: loadingToast,
      });
    } finally {
      setIsJoining(false);
    }
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
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

  const getInitial = (text) => {
    if (!text) return "?";
    return text.charAt(0).toUpperCase();
  };

  const renderMessageArea = () => {
    if (loading) {
      return <div className={styles.loadingIndicator}>Loading messages...</div>;
    }

    // Check if messages array is empty or undefined
    if (
      !messages ||
      messages.length === 0 ||
      !messages.some((msg) => msg.message)
    ) {
      return (
        <div className={styles.noMessagesContainer}>
          <div className={styles.noMessagesContent}>
            <h3>Start a conversation</h3>
            <p>Say hello to {selectedChat.title || selectedChat.username}</p>
            <button
              className={styles.startChatButton}
              onClick={() => {
                const textarea = document.querySelector("textarea");
                if (textarea) {
                  textarea.focus();
                  textarea.value = "Hi! 👋";
                  setMessage("Hi! 👋");
                }
              }}
            >
              Send Message
            </button>
          </div>
        </div>
      );
    }

    return messages
      .filter((message) => message.message) // Only show messages with text
      .sort((a, b) => a.date - b.date)
      .map((message) => (
        <MessageBubble
          key={message.id}
          message={message}
          onReact={onReactToMessage}
        />
      ));
  };

  if (!selectedChat) {
    return (
      <div
        className={`${styles.noChatSelected} ${
          isDarkMode ? styles.dark : styles.light
        }`}
      >
        <div className={styles.noChatContent}>
          <h2>Select a chat to start messaging</h2>
          <p>Choose from your existing conversations or start a new one</p>
        </div>
      </div>
    );
  }

  return (
    <div
      className={`${styles.chatArea} ${
        isDarkMode ? styles.dark : styles.light
      }`}
    >
      <ChatHeader
        chat={{
          ...selectedChat,
          username: selectedChat.username || selectedChat.title || "Unknown",
          initial: getInitial(selectedChat.username || selectedChat.title),
        }}
        onBackClick={onBackClick}
        onMenuClick={handleMenuClick}
        isMobile={isMobile}
        onProfileClick={() => setShowProfile(true)}
      />

      {showMenu && (
        <ChatMenu
          chat={selectedChat}
          onClose={() => setShowMenu(false)}
          onBlock={handleBlockUser}
          onLeave={handleLeaveChannel}
          position={menuPosition}
        />
      )}

      <div
        className={styles.messagesContainer}
        ref={messagesContainerRef}
        onScroll={handleScroll}
      >
        {renderMessageArea()}
        <div ref={messagesEndRef} />
      </div>

      <div className={styles.inputArea}>
        {selectedChat.type === "Channel" && !isMember ? (
          <button
            className={styles.joinButton}
            onClick={handleJoinChannel}
            disabled={isJoining}
          >
            {isJoining ? "Joining..." : "Join Channel"}
          </button>
        ) : !canPost ? (
          <div className={styles.noPostingPermission}>
            You don't have permission to post in this channel
          </div>
        ) : (
          <>
            <FileUpload onFileSelect={onSendFile} />
            <MessageInput
              value={message}
              onChange={setMessage}
              onSend={() => {
                if (message.trim()) {
                  onSendMessage(message).catch((error) => {
                    if (
                      error.response?.data?.error?.includes(
                        "CHAT_ADMIN_REQUIRED"
                      )
                    ) {
                      setCanPost(false);
                      toast.error(
                        "You need to be an admin to post in this channel"
                      );
                    } else {
                      toast.error("Failed to send message");
                    }
                  });
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
          </>
        )}
      </div>

      {isInVideoCall && (
        <VideoCall
          chatId={selectedChat.id}
          onEnd={() => setIsInVideoCall(false)}
        />
      )}

      <AnimatePresence>
        {showProfile && (
          <UserProfile
            user={selectedChat}
            onClose={() => setShowProfile(false)}
            sessionString={sessionString}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
