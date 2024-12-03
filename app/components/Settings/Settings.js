"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  FiX,
  FiUser,
  FiSettings,
  FiMoon,
  FiSun,
  FiHelpCircle,
  FiInfo,
  FiSave,
  FiEdit2,
  FiArrowLeft,
} from "react-icons/fi";
import { useTheme } from "../../context/ThemeContext";
import axios from "axios";
import toast from "react-hot-toast";
import styles from "./Settings.module.css";
import EditProfile from "../User/EditProfile";
import { AnimatePresence } from "framer-motion";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

export default function Settings({
  onClose,
  onLogout,
  sessionString,
  username,
}) {
  const { isDarkMode, toggleTheme } = useTheme();
  const [userInfo, setUserInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const response = await axios.post(`${BASE_URL}/t/api/user/info`, {
          sessionString,
          userUsername: username,
        });

        if (response.data) {
          setUserInfo(response.data);
        }
      } catch (error) {
        toast.error("Failed to load user information");
        console.error("Error fetching user info:", error);
      } finally {
        setLoading(false);
      }
    };

    if (username && sessionString) {
      fetchUserInfo();
    }
  }, [username, sessionString]);

  const handleProfileUpdate = (updatedData) => {
    setUserInfo(updatedData);
  };

  // Enhanced animation variants
  const overlayVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.3,
        when: "beforeChildren",
      },
    },
    exit: {
      opacity: 0,
      transition: {
        duration: 0.2,
        when: "afterChildren",
      },
    },
  };

  const panelVariants = {
    hidden: {
      x: "-100%",
      opacity: 0,
      transition: {
        type: "tween",
        duration: 0.3,
      },
    },
    visible: {
      x: 0,
      opacity: 1,
      transition: {
        type: "tween",
        duration: 0.3,
        ease: "easeOut",
      },
    },
    exit: {
      x: "-100%",
      opacity: 0,
      transition: {
        type: "tween",
        duration: 0.2,
        ease: "easeIn",
      },
    },
  };

  // Add animation variants for settings items
  const settingsItemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (index) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: index * 0.1,
        duration: 0.3,
      },
    }),
  };

  return (
    <motion.div
      className={styles.settingsOverlay}
      variants={overlayVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
    >
      <motion.div className={styles.settingsPanel} variants={panelVariants}>
        <div className={styles.settingsHeader}>
          <button className={styles.backButton} onClick={onClose}>
            <FiArrowLeft size={24} />
          </button>
          <h2>Settings</h2>
        </div>

        <div className={styles.settingsContent}>
          {loading ? (
            <div className={styles.loading}>Loading profile...</div>
          ) : userInfo ? (
            <div className={styles.profileSection}>
              <div className={styles.profileHeader}>
                {userInfo.profilePhoto ? (
                  <img
                    src={userInfo.profilePhoto}
                    alt={userInfo.username}
                    className={styles.profileImage}
                  />
                ) : (
                  <div className={styles.profileImagePlaceholder}>
                    {userInfo.firstName?.[0] || userInfo.username[0]}
                  </div>
                )}
                <button 
                  className={styles.editPhotoButton}
                  onClick={() => setIsEditing(true)}
                >
                  <FiEdit2 size={20} />
                </button>
              </div>

              <div className={styles.profileInfo}>
                <div className={styles.infoGroup}>
                  <h3>Name</h3>
                  <p>{`${userInfo.firstName || ""} ${userInfo.lastName || ""}`}</p>
                </div>

                <div className={styles.infoGroup}>
                  <h3>Username</h3>
                  <p>@KuCoinAlicia</p>
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
              </div>
            </div>
          ) : (
            <div className={styles.error}>Failed to load profile</div>
          )}

          <div className={styles.settingsGroup}>
            <motion.button
              className={styles.settingsItem}
              onClick={() => setIsEditing(true)}
            >
              <FiUser size={20} />
              <span>Edit Profile</span>
            </motion.button>

            <motion.button
              className={styles.settingsItem}
              onClick={toggleTheme}
            >
              {isDarkMode ? <FiSun size={20} /> : <FiMoon size={20} />}
              <span>Theme</span>
            </motion.button>

            <motion.button
              className={styles.settingsItem}
              variants={settingsItemVariants}
              initial="hidden"
              animate="visible"
              custom={1}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <FiHelpCircle size={20} />
              <span>Help</span>
            </motion.button>

            <motion.button
              className={styles.settingsItem}
              variants={settingsItemVariants}
              initial="hidden"
              animate="visible"
              custom={2}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <FiInfo size={20} />
              <span>About</span>
            </motion.button>
          </div>

          <motion.button
            className={`${styles.settingsItem} ${styles.logoutButton}`}
            onClick={onLogout}
          >
            Logout
          </motion.button>
        </div>

        <AnimatePresence>
          {isEditing && userInfo && (
            <EditProfile
              user={userInfo}
              onClose={() => setIsEditing(false)}
              sessionString={sessionString}
              onUpdate={handleProfileUpdate}
            />
          )}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  );
}
