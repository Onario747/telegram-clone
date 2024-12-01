"use client";
import { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { AnimatePresence } from "framer-motion";
import toast from 'react-hot-toast';
import Login from "./Login/Login";
import Sidebar from "./Sidebar/Sidebar";
import ChatArea from "./Chat/ChatArea";
import { useWebSocket } from "../hooks/useWebSocket";
import styles from "./TelegramApp.module.css";
import Settings from "./Settings/Settings";

const BASE_URL = 'https://xelegram.onrender.com';

export default function TelegramApp() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [verificationCode, setVerificationCode] = useState("");
  const [sessionData, setSessionData] = useState(() => {
    if (typeof window !== 'undefined') {
      const savedSession = localStorage.getItem('telegramSession');
      return savedSession ? JSON.parse(savedSession) : null;
    }
    return null;
  });
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState({
    users: [],
    channels: [],
  });
  const [selectedChat, setSelectedChat] = useState(null);
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [onlineUsers, setOnlineUsers] = useState(new Set());
  const [loginStep, setLoginStep] = useState('phone');
  const [chatList, setChatList] = useState([]);
  const [messagesLoading, setMessagesLoading] = useState(false);
  const [hasMoreMessages, setHasMoreMessages] = useState(true);
  const [messageOffset, setMessageOffset] = useState(0);
  const MESSAGES_PER_PAGE = 50;
  const [showSettings, setShowSettings] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [showSidebar, setShowSidebar] = useState(true);

  useEffect(() => {
    const checkSession = async () => {
      const savedSession = localStorage.getItem('telegramSession');
      if (savedSession) {
        const parsedSession = JSON.parse(savedSession);
        
        try {
          const response = await axios.post(`${BASE_URL}/t/api/refresh`, {
            sessionString: parsedSession.sessionString
          });

          if (response.data.sessionString) {
            const updatedSession = {
              ...parsedSession,
              sessionString: response.data.sessionString
            };
            setSessionData(updatedSession);
            localStorage.setItem('telegramSession', JSON.stringify(updatedSession));
            setIsLoggedIn(true);
            
            await fetchChats();
          }
        } catch (error) {
          localStorage.removeItem('telegramSession');
          setSessionData(null);
          setIsLoggedIn(false);
        }
      }
    };

    checkSession();
  }, []);

  useEffect(() => {
    if (sessionData) {
      localStorage.setItem('telegramSession', JSON.stringify(sessionData));
    } else {
      localStorage.removeItem('telegramSession');
    }
  }, [sessionData]);

  const initiateLogin = async () => {
    const loadingToast = toast.loading('Sending verification code...');
    try {
      setLoading(true);
      const response = await axios.post(`${BASE_URL}/t/api/initiate`, { phoneNumber });
      
      if (response.data.response) {
        const { phoneCodeHash, sessionString } = response.data.response;
        setSessionData({ phoneCodeHash, sessionString });
        setLoginStep('code');
        toast.success('Verification code sent successfully!', { id: loadingToast });
      }
    } catch (error) {
      const errorMessage = error.response?.data?.error || 'Failed to send verification code';
      console.error('Login initiation failed:', errorMessage);
      toast.error(errorMessage, { id: loadingToast });
    } finally {
      setLoading(false);
    }
  };

  const verifyCode = async () => {
    const loadingToast = toast.loading('Verifying code...');
    try {
      setLoading(true);
      if (!sessionData) {
        throw new Error('Session data is missing');
      }

      const { phoneCodeHash, sessionString } = sessionData;
      const response = await axios.post(`${BASE_URL}/t/api/verify`, {
        phoneNumber,
        phoneCodeHash,
        sessionString,
        phoneCode: verificationCode
      });

      if (response.data.sessionString) {
        const newSessionData = {
          ...sessionData,
          sessionString: response.data.sessionString,
          phoneNumber
        };
        setSessionData(newSessionData);
        localStorage.setItem('telegramSession', JSON.stringify(newSessionData));
        setIsLoggedIn(true);
        toast.success('Successfully logged in!', { id: loadingToast });
        await fetchChats();
      }
    } catch (error) {
      const errorMessage = error.response?.data?.error || 'Verification failed';
      console.error('Verification failed:', errorMessage);
      toast.error(errorMessage, { id: loadingToast });
    } finally {
      setLoading(false);
    }
  };

  const searchUsers = async () => {
    if (!sessionData?.sessionString || !searchQuery.trim()) return;

    const loadingToast = toast.loading('Searching...');
    try {
      const [usersResponse, channelsResponse] = await Promise.all([
        axios.post(`${BASE_URL}/t/api/search`, {
          sessionString: sessionData.sessionString,
          searchQuery: searchQuery.trim()
        }),
        axios.post(`${BASE_URL}/t/api/channel/search`, {
          sessionString: sessionData.sessionString,
          searchQuery: searchQuery.trim()
        })
      ]);

      if (usersResponse.data.users || channelsResponse.data.channels) {
        setSearchResults({
          users: usersResponse.data.users || [],
          channels: channelsResponse.data.channels || []
        });
        
        const totalResults = (usersResponse.data.users?.length || 0) + 
                           (channelsResponse.data.channels?.length || 0);
        
        if (totalResults > 0) {
          toast.success(`Found ${totalResults} result${totalResults === 1 ? '' : 's'}`, { id: loadingToast });
        } else {
          toast.error('No results found', { id: loadingToast });
        }
      }
    } catch (error) {
      const shouldRetry = await handleApiError(error, 'Search failed');
      if (shouldRetry) {
        await searchUsers();
      } else {
        setSearchResults({ users: [], channels: [] });
      }
    }
  };

  const handleSendMessage = async (messageText) => {
    if (!selectedChat || !sessionData?.sessionString || !messageText.trim()) return;

    const loadingToast = toast.loading('Sending message...');
    try {
      let response;

      // Check if it's a channel or user chat
      if (selectedChat.type === 'Channel') {
        response = await axios.post(`${BASE_URL}/t/api/channel/message`, {
          sessionString: sessionData.sessionString,
          channelUsername: selectedChat.username,
          messageText: messageText.trim()
        });
      } else {
        response = await axios.post(`${BASE_URL}/t/api/user/message`, {
          sessionString: sessionData.sessionString,
          destination: selectedChat.username || selectedChat.phone,
          messageText: messageText.trim()
        });
      }

      if (response.data) {
        // Optionally update the messages list with the new message
        const newMessage = {
          id: Date.now(), // Temporary ID until we get real one
          message: messageText.trim(),
          date: Math.floor(Date.now() / 1000), // Current Unix timestamp
          fromId: null, // Indicates it's from current user
          peerId: {
            userId: selectedChat.id,
            className: selectedChat.type === 'Channel' ? 'PeerChannel' : 'PeerUser'
          }
        };

        setMessages(prevMessages => [...prevMessages, newMessage]);
        toast.success('Message sent!', { id: loadingToast });

        // Optionally refresh messages to get the actual message from server
        await fetchMessages(selectedChat);
      }
    } catch (error) {
      const shouldRetry = await handleApiError(error, 'Failed to send message');
      if (shouldRetry) {
        // Retry sending the message with refreshed session
        await handleSendMessage(messageText);
      }
    }
  };

  const handleSendFile = async (file) => {
    toast.error('File sending feature is coming soon!');
    console.log('File to be sent:', file);
  };

  const handleSendVoice = async (audioBlob) => {
    toast.error('Voice message feature is coming soon!');
    console.log('Voice message to be sent:', audioBlob);
  };

  const fetchChats = async () => {
    if (!sessionData?.sessionString) return;

    const loadingToast = toast.loading('Loading chats...');
    try {
      const response = await axios.post(`${BASE_URL}/t/api/chats`, {
        sessionString: sessionData.sessionString
      });

      if (response.data.chatList) {
        setChatList(response.data.chatList);
        toast.success('Chats loaded successfully', { id: loadingToast });
      }
    } catch (error) {
      handleApiError(error, 'Failed to load chats');
    }
  };

  const fetchMessages = async (chat, offset = 0) => {
    if (!sessionData?.sessionString || !chat) return;

    setMessagesLoading(true);
    const loadingToast = toast.loading('Loading messages...');

    try {
      let response;
      
      // Check chat type from the API response
      switch (chat.type) {
        case 'Channel':
          response = await axios.post(`${BASE_URL}/t/api/channel/messages`, {
            sessionString: sessionData.sessionString,
            channelUsername: chat.username,
            messageIds: [],
            limit: MESSAGES_PER_PAGE,
            offset: offset
          });
          break;

        case 'User':
          response = await axios.post(`${BASE_URL}/t/api/user/messages`, {
            sessionString: sessionData.sessionString,
            userUsername: chat.username,
            limit: MESSAGES_PER_PAGE,
            offset: offset
          });
          break;

        case 'ChatForbidden':
          toast.error('This chat is not accessible');
          setMessagesLoading(false);
          return;

        default:
          toast.error('Unsupported chat type');
          setMessagesLoading(false);
          return;
      }

      if (response?.data?.messages) {
        if (offset === 0) {
          setMessages(response.data.messages);
        } else {
          setMessages(prevMessages => [...prevMessages, ...response.data.messages]);
        }

        setHasMoreMessages(response.data.messages.length === MESSAGES_PER_PAGE);
        toast.success('Messages loaded', { id: loadingToast });
      }
    } catch (error) {
      const shouldRetry = await handleApiError(error, 'Failed to load messages');
      if (shouldRetry) {
        await fetchMessages(chat, offset);
      }
    } finally {
      setMessagesLoading(false);
    }
  };

  const loadMoreMessages = async () => {
    if (messagesLoading || !hasMoreMessages || !selectedChat) return;
    
    const nextOffset = messageOffset + MESSAGES_PER_PAGE;
    setMessageOffset(nextOffset);
    await fetchMessages(selectedChat, nextOffset);
  };

  const handleChatSelect = (chat) => {
    if (chat.type === 'ChatForbidden') {
      toast.error('This chat is not accessible');
      return;
    }

    setSelectedChat(chat);
    setMessages([]);
    setMessageOffset(0);
    setHasMoreMessages(true);
    fetchMessages(chat);

    if (isMobile) {
      setShowSidebar(false);
    }
  };

  // Add useEffect to handle message updates
  useEffect(() => {
    if (selectedChat) {
      setMessages([]);
      setMessageOffset(0);
      setHasMoreMessages(true);
      fetchMessages(selectedChat);
    }
  }, [selectedChat?.username]);

  const handleLogout = useCallback(() => {
    setIsLoggedIn(false);
    setSessionData(null);
    setMessages([]);
    setChatList([]);
    setSelectedChat(null);
    localStorage.removeItem('telegramSession');
    toast.success('Logged out successfully');
  }, []);

  const handleApiError = useCallback(async (error, errorMessage) => {
    if (error.response?.status === 401 && sessionData?.sessionString) {
      const refreshed = await refreshSession(sessionData.sessionString);
      if (refreshed) {
        return true;
      }
      handleLogout();
      toast.error('Session expired. Please log in again.');
    } else {
      toast.error(errorMessage);
    }
    return false;
  }, [sessionData?.sessionString, handleLogout]);

  // Add useEffect for mobile detection
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Add session refresh function
  const refreshSession = async (sessionString) => {
    try {
      const response = await axios.post(`${BASE_URL}/t/api/refresh`, {
        sessionString
      });

      if (response.data.sessionString) {
        setSessionData(prev => ({
          ...prev,
          sessionString: response.data.sessionString
        }));
        return true;
      }
      return false;
    } catch (error) {
      console.error('Session refresh failed:', error);
      return false;
    }
  };

  // Add periodic session refresh
  useEffect(() => {
    let refreshInterval;

    if (isLoggedIn && sessionData?.sessionString) {
      refreshInterval = setInterval(async () => {
        const refreshed = await refreshSession(sessionData.sessionString);
        if (!refreshed) {
          handleLogout();
          toast.error('Session expired. Please log in again.');
        }
      }, 30 * 60 * 1000); // 30 minutes
    }

    return () => {
      if (refreshInterval) {
        clearInterval(refreshInterval);
      }
    };
  }, [isLoggedIn, sessionData?.sessionString, handleLogout]);

  return (
    <>
      <div className={styles.container}>
        <AnimatePresence>
          {!isLoggedIn ? (
            <Login
              phoneNumber={phoneNumber}
              verificationCode={verificationCode}
              sessionData={sessionData}
              loading={loading}
              loginStep={loginStep}
              onPhoneNumberChange={setPhoneNumber}
              onVerificationCodeChange={setVerificationCode}
              onInitiateLogin={initiateLogin}
              onVerifyCode={verifyCode}
              onBackToPhone={() => setLoginStep('phone')}
            />
          ) : (
            <div className={styles.chatContainer}>
              <div className={`
                ${styles.sidebarMobile}
                ${!showSidebar && isMobile ? styles.sidebarHidden : ''}
              `}>
                <Sidebar
                  searchQuery={searchQuery}
                  searchResults={searchResults}
                  onlineUsers={onlineUsers}
                  chatList={chatList}
                  onSearchQueryChange={setSearchQuery}
                  onSearch={searchUsers}
                  onChatSelect={handleChatSelect}
                  onRefreshChats={fetchChats}
                  onMenuClick={() => setShowSettings(true)}
                  isMobile={isMobile}
                />
              </div>

              <div className={`
                ${styles.chatAreaMobile}
                ${(showSidebar && isMobile) ? styles.chatAreaHidden : ''}
              `}>
                <ChatArea
                  selectedChat={selectedChat}
                  messages={messages}
                  loading={messagesLoading}
                  hasMore={hasMoreMessages}
                  onLoadMore={loadMoreMessages}
                  onSendMessage={handleSendMessage}
                  onSendFile={handleSendFile}
                  onSendVoice={handleSendVoice}
                  onBackClick={() => setShowSidebar(true)}
                  onMenuClick={() => setShowSettings(true)}
                  isMobile={isMobile}
                  onReactToMessage={(messageId, reaction) => {
                    toast.error('Reactions are not implemented yet');
                  }}
                  onInitiateVideoCall={(chatId) => {
                    toast.error('Video calls are not implemented yet');
                  }}
                />
              </div>
            </div>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {showSettings && (
            <Settings
              onClose={() => setShowSettings(false)}
              onLogout={handleLogout}
            />
          )}
        </AnimatePresence>
      </div>
    </>
  );
}
