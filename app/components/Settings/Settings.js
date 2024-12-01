"use client";
import { motion } from 'framer-motion';
import { FiX, FiUser, FiSettings, FiMoon, FiSun, FiHelpCircle, FiInfo, FiSave } from 'react-icons/fi';
import { useTheme } from '../../context/ThemeContext';
import styles from './Settings.module.css';

export default function Settings({ onClose, onLogout }) {
  const { isDarkMode, toggleTheme } = useTheme();

  const menuItems = [
    {
      icon: <FiUser size={20} />,
      label: 'Profile',
      onClick: () => console.log('Profile clicked')
    },
    {
      icon: <FiSettings size={20} />,
      label: 'General Settings',
      onClick: () => console.log('Settings clicked')
    },
    {
      icon: isDarkMode ? <FiSun size={20} /> : <FiMoon size={20} />,
      label: 'Theme',
      onClick: toggleTheme
    },
    {
      icon: <FiHelpCircle size={20} />,
      label: 'Help',
      onClick: () => console.log('Help clicked')
    },
    {
      icon: <FiInfo size={20} />,
      label: 'About',
      onClick: () => console.log('About clicked')
    },
    {
      icon: <FiSave size={20} />,
      label: 'Saved Messages',
      onClick: () => console.log('Saved Messages clicked')
    }
  ];

  return (
    <motion.div 
      className={styles.settingsPanel}
      initial={{ x: '-100%' }}
      animate={{ x: 0 }}
      exit={{ x: '-100%' }}
      transition={{ type: 'tween', duration: 0.3 }}
    >
      <div className={styles.settingsHeader}>
        <h2>Settings</h2>
        <button onClick={onClose}>
          <FiX size={24} />
        </button>
      </div>

      <div className={styles.settingsContent}>
        {menuItems.map((item, index) => (
          <button 
            key={index}
            className={styles.settingsItem}
            onClick={item.onClick}
          >
            {item.icon}
            <span>{item.label}</span>
          </button>
        ))}

        <button 
          className={`${styles.settingsItem} ${styles.logoutButton}`}
          onClick={onLogout}
        >
          Logout
        </button>
      </div>
    </motion.div>
  );
}