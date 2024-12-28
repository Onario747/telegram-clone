"use client";
import { motion } from "framer-motion";
import { useTheme } from "../../context/ThemeContext";
import styles from "./Login.module.css";
import Image from "next/image";

export default function Login({
  phoneNumber,
  verificationCode,
  sessionData,
  loading,
  loginStep,
  onPhoneNumberChange,
  onVerificationCodeChange,
  onInitiateLogin,
  onVerifyCode,
  onBackToPhone
}) {
  const { isDarkMode } = useTheme();

  const handlePhoneChange = (e) => {
    const value = e.target.value.replace(/[^\d\s+]/g, '');
    onPhoneNumberChange(value);
  };

  const handleVerificationCodeChange = (e) => {
    const value = e.target.value.replace(/\D/g, '');
    onVerificationCodeChange(value);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className={`${styles.loginContainer} ${
        isDarkMode ? styles.dark : styles.light
      }`}
    >
      <div className={styles.loginHeader}>
        <Image
          src="/telegram-logo.svg"
          alt="Telegram Logo"
          className={styles.logo}
          width={120}
          height={120}
          priority
        />
        <h1>Sign in to Telegram</h1>
        <p>Please confirm your country code and enter your phone number.</p>
      </div>

      {loginStep === 'phone' ? (
        <div className={styles.phoneStep}>
          <h2>Enter your phone number</h2>
          <div className={styles.inputGroup}>
            <input
              type="tel"
              value={phoneNumber}
              onChange={handlePhoneChange}
              placeholder="+1 234 567 8900"
              disabled={loading}
              className={styles.phoneInput}
              maxLength={15}
            />
          </div>
          <button
            onClick={onInitiateLogin}
            disabled={loading || !phoneNumber || phoneNumber.length < 10}
            className={styles.submitButton}
          >
            {loading ? 'Sending...' : 'Send Code'}
          </button>
        </div>
      ) : (
        <div className={styles.codeStep}>
          <h2>Enter verification code</h2>
          <div className={styles.inputGroup}>
            <input
              type="text"
              value={verificationCode}
              onChange={handleVerificationCodeChange}
              placeholder="Enter code"
              disabled={loading}
              className={styles.phoneInput}
              maxLength={5}
            />
          </div>
          <p className={styles.phoneNumber}>
            Code sent to {phoneNumber}
          </p>
          <div className={styles.buttonGroup}>
            <button 
              onClick={onBackToPhone}
              disabled={loading}
              className={styles.backButton}
            >
              Back
            </button>
            <button 
              onClick={onVerifyCode}
              disabled={loading || !verificationCode}
              className={styles.submitButton}
            >
              {loading ? 'Verifying...' : 'Verify'}
            </button>
          </div>
        </div>
      )}
    </motion.div>
  );
}