"use client";
import { useState, useRef } from "react";
import { motion } from "framer-motion";
import { FiArrowLeft, FiCheck, FiCamera } from "react-icons/fi";
import axios from "axios";
import toast from "react-hot-toast";
import styles from "./EditProfile.module.css";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

export default function EditProfile({
  user,
  onClose,
  sessionString,
  onUpdate,
}) {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    firstName: user?.firstName || "",
    lastName: user?.lastName || "",
    username: user?.username || "",
    bio: user?.bio || "",
  });

  const fileInputRef = useRef(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const getInitial = (text) => {
    if (!text) return "?";
    return text.charAt(0).toUpperCase();
  };

  const getChangedFields = () => {
    const changedFields = {};
    Object.keys(formData).forEach(key => {
      if (formData[key] !== (user[key] || "")) {
        changedFields[key] = formData[key];
      }
    });
    return changedFields;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const loadingToast = toast.loading("Updating profile...");

    try {
      const changedFields = getChangedFields();
      
      if (Object.keys(changedFields).length === 0) {
        toast.success("No changes to update", { id: loadingToast });
        onClose();
        return;
      }

      const response = await axios.put(`${BASE_URL}/t/api/user/edit`, {
        sessionString,
        ...changedFields,
      });

      if (response.data?.result) {
        if (response.data.result.username !== user.username) {
          localStorage.setItem('telegramUserName', response.data.result.username);
        }

        toast.success("Profile updated successfully!", { id: loadingToast });
        
        onUpdate?.({
          ...user,
          ...response.data.result,
          firstName: response.data.result.firstName || '',
          lastName: response.data.result.lastName || '',
          username: response.data.result.username || '',
          bio: response.data.result.bio || '',
          profilePhoto: user.profilePhoto
        });
        
        onClose();
      }
    } catch (error) {
      console.error("Failed to update profile:", error);
      toast.error(
        error.response?.data?.error || "Failed to update profile", 
        { id: loadingToast }
      );
    } finally {
      setLoading(false);
    }
  };

  const handlePhotoUpload = async (event) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      toast.error('Please select an image file');
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      toast.error('Image size should be less than 5MB');
      return;
    }

    const loadingToast = toast.loading('Uploading profile photo...');

    try {
      const formData = new FormData();
      formData.append('sessionString', sessionString);
      formData.append('file', file);

      const response = await axios.put(`${BASE_URL}/t/api/user/edit/image`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (response.data) {
        toast.success('Profile photo updated!', { id: loadingToast });
        onUpdate?.({
          ...user,
          profilePhoto: URL.createObjectURL(file),
        });
      }
    } catch (error) {
      console.error('Failed to upload photo:', error);
      toast.error(
        error.response?.data?.error || 'Failed to upload photo',
        { id: loadingToast }
      );
    }
  };

  return (
    <motion.div
      className={styles.editProfilePanel}
      initial={{ x: "100%" }}
      animate={{ x: 0 }}
      exit={{ x: "100%" }}
      transition={{ type: "tween", duration: 0.3 }}
    >
      <div className={styles.header}>
        <button
          className={styles.backButton}
          onClick={onClose}
          disabled={loading}
        >
          <FiArrowLeft size={24} />
        </button>
        <h2>Edit Profile</h2>
        <button
          className={styles.saveButton}
          onClick={handleSubmit}
          disabled={loading}
        >
          <FiCheck size={24} />
        </button>
      </div>

      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.photoSection}>
          <div className={styles.photoContainer}>
            {user?.profilePhoto ? (
              <img
                src={user.profilePhoto}
                alt={formData.username || "Profile"}
                className={styles.profilePhoto}
              />
            ) : (
              <div className={styles.profilePhotoPlaceholder}>
                {getInitial(formData.username)}
              </div>
            )}
            <button 
              type="button" 
              className={styles.uploadOverlay}
              onClick={() => fileInputRef.current?.click()}
            >
              <FiCamera size={24} />
            </button>
          </div>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handlePhotoUpload}
            style={{ display: 'none' }}
          />
          <button 
            type="button" 
            className={styles.changePhotoButton}
            onClick={() => fileInputRef.current?.click()}
          >
            Change Profile Photo
          </button>
        </div>

        <div className={styles.inputGroup}>
          <label>First Name</label>
          <input
            type="text"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            placeholder="First Name"
          />
        </div>

        <div className={styles.inputGroup}>
          <label>Last Name</label>
          <input
            type="text"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            placeholder="Last Name"
          />
        </div>

        <div className={styles.inputGroup}>
          <label>Username</label>
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            placeholder="Username"
          />
          <span className={styles.hint}>
            You can choose a username on Telegram. If you do, other people will
            be able to find you by this username and contact you without needing
            your phone number.
          </span>
        </div>

        <div className={styles.inputGroup}>
          <label>Bio</label>
          <textarea
            name="bio"
            value={formData.bio}
            onChange={handleChange}
            placeholder="Add a few words about yourself"
            maxLength={70}
          />
          <span className={styles.hint}>
            Any details such as age, occupation or city. Example: 23 y.o.
            designer from San Francisco.
          </span>
        </div>
      </form>
    </motion.div>
  );
}
