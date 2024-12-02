"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiX, FiPhone, FiMail, FiInfo } from "react-icons/fi";
import axios from "axios";
import toast from "react-hot-toast";
import styles from "./UserProfile.module.css";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

export default function UserProfile({ user, onClose, sessionString }) {
  const [userInfo, setUserInfo] = useState(null);
  const [loading, setLoading] = useState(true);

  const formatProfilePhoto = (base64String) => {
    if (base64String.startsWith('data:')) {
      return base64String;
    }
    return `data:image/jpeg;base64,${base64String}`;
  };

  useEffect(() => {
    const fetchInfo = async () => {
      try {
        let response;

        if (user.type === "Channel") {
          response = await axios.post(`${BASE_URL}/t/api/channel/info`, {
            sessionString,
            channelUsername: user.username,
          });

          if (response.data) {
            setUserInfo({
              ...response.data,
              type: "Channel",
            });
          }
        } else {
          response = await axios.post(`${BASE_URL}/t/api/user/info`, {
            sessionString,
            userUsername: user.username,
          });

          if (response.data) {
            setUserInfo(response.data);
          }
        }
      } catch (error) {
        toast.error("Failed to load information");
        console.error("Error fetching info:", error);
      } finally {
        setLoading(false);
      }
    };

    if (user.username && sessionString) {
      fetchInfo();
    }
  }, [user.username, sessionString, user.type]);

  return (
    <motion.div
      className={styles.profilePanel}
      initial={{ x: "100%" }}
      animate={{ x: 0 }}
      exit={{ x: "100%" }}
      transition={{ type: "tween", duration: 0.3 }}
    >
      <button className={styles.closeButton} onClick={onClose}>
        <FiX size={24} />
      </button>

      <div className={styles.profileHeader}>
        {user.profilePhoto ? (
          <img
            src={formatProfilePhoto(user.profilePhoto)}
            alt={user.username}
            className={styles.profileImage}
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = "";
              e.target.style.display = "none";
              const placeholder = document.createElement("div");
              placeholder.className = styles.profileImagePlaceholder;
              placeholder.textContent = user.username[0].toUpperCase();
              e.target.parentNode.appendChild(placeholder);
            }}
          />
        ) : (
          <div className={styles.profileImagePlaceholder}>
            {user.username[0].toUpperCase()}
          </div>
        )}
        <h2>
          {user.firstName} {user.lastName}
        </h2>
        <p className={styles.username}>@{user.username}</p>
      </div>

      {loading ? (
        <div className={styles.loading}>Loading information...</div>
      ) : userInfo ? (
        <div className={styles.profileInfo}>
          {userInfo.type === "Channel" ? (
            <>
              <div className={styles.infoGroup}>
                <h3>Channel Name</h3>
                <p>{userInfo.title}</p>
              </div>
              {userInfo.about && (
                <div className={styles.infoGroup}>
                  <h3>Description</h3>
                  <p>{userInfo.about}</p>
                </div>
              )}
              {userInfo.participantsCount !== undefined && (
                <div className={styles.infoGroup}>
                  <h3>Members</h3>
                  <p>{userInfo.participantsCount}</p>
                </div>
              )}
            </>
          ) : (
            <>
              <div className={styles.infoGroup}>
                <h3>Name</h3>
                <p>{`${userInfo.firstName || ""} ${
                  userInfo.lastName || ""
                }`}</p>
              </div>
              {userInfo.bio && (
                <div className={styles.infoGroup}>
                  <h3>Bio</h3>
                  <p>{userInfo.bio}</p>
                </div>
              )}
              {userInfo.phone && (
                <div className={styles.infoGroup}>
                  <h3>Phone</h3>
                  <p>{userInfo.phone}</p>
                </div>
              )}
              <div className={styles.infoGroup}>
                <h3>Username</h3>
                <p>@{userInfo.username}</p>
              </div>
            </>
          )}
        </div>
      ) : (
        <div className={styles.error}>Failed to load information</div>
      )}

      <div className={styles.actions}>
        <button className={styles.actionButton}>Send Message</button>
        <button className={styles.actionButton}>Share Contact</button>
      </div>
    </motion.div>
  );
}
