import React, { useState, useEffect } from 'react';
import { Navbar as BootstrapNavbar, Nav, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Slider, Box, Switch } from '@mui/material';
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import { setMood } from '../features/mood/moodSlice';
import styles from './Navbar.module.scss';

function Navbar() {
  const dispatch = useDispatch();
  const currentMood = useSelector((state) => state.mood.currentMood);
  const [showMoodToggle, setShowMoodToggle] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(localStorage.getItem('theme') === 'dark');

  // Apply theme on mount and when theme changes
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.setAttribute('data-theme', 'dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.setAttribute('data-theme', 'light');
      localStorage.setItem('theme', 'light');
    }
  }, [isDarkMode]);

  // Handle Escape key to close dropdown
  useEffect(() => {
    const handleKeyPress = (e) => {
      if (e.key === 'Escape' || (e.ctrlKey && e.key === 'c')) {
        setShowMoodToggle(false);
      }
    };

    if (showMoodToggle) {
      document.addEventListener('keydown', handleKeyPress);
      return () => document.removeEventListener('keydown', handleKeyPress);
    }
  }, [showMoodToggle]);

  const getMoodEmoji = (mood) => {
    if (mood === 0) return '😶';
    if (mood <= 2) return '😢';
    if (mood <= 4) return '😕';
    if (mood <= 6) return '😊';
    if (mood <= 8) return '😄';
    return '🤩';
  };

  const handleMoodChange = (event, newValue) => {
    dispatch(setMood({ value: newValue, notes: '', tags: [] }));
  };

  const handleThemeToggle = (e) => {
    setIsDarkMode(e.target.checked);
  };

  return (
    <BootstrapNavbar bg="dark" expand="lg" sticky="top" className={styles.navbar}>
      <Container>
        <BootstrapNavbar.Brand as={Link} to="/" className={styles.brand}>
          🎨 MoodCanvas
        </BootstrapNavbar.Brand>
        <BootstrapNavbar.Toggle aria-controls="basic-navbar-nav" />
        <BootstrapNavbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <Nav.Link as={Link} to="/" className={styles.navLink}>
              Home
            </Nav.Link>
            <Nav.Link as={Link} to="/dashboard" className={styles.navLink}>
              Dashboard
            </Nav.Link>
            
            <div className={styles.moodToggleContainer}>
              <button 
                className={styles.moodToggleBtn}
                onClick={() => setShowMoodToggle(!showMoodToggle)}
                title="Click to adjust mood"
              >
                <span className={styles.moodEmoji}>{getMoodEmoji(currentMood)}</span>
                <span className={styles.moodValue}>{currentMood}/10</span>
              </button>
              
              {showMoodToggle && (
                <Box className={styles.moodSliderContainer}>
                  <Slider
                    value={currentMood}
                    onChange={handleMoodChange}
                    min={0}
                    max={10}
                    step={1}
                    marks={[
                      { value: 0, label: '😶' },
                      { value: 5, label: '😊' },
                      { value: 10, label: '🤩' }
                    ]}
                    valueLabelDisplay="on"
                    valueLabelFormat={(value) => `${value}/10`}
                    className={styles.slider}
                  />
                </Box>
              )}
            </div>

            <Box className={styles.themeToggleContainer}>
              <LightModeIcon fontSize="small" className={styles.themeIcon} />
              <Switch 
                checked={isDarkMode}
                onChange={handleThemeToggle}
                size="small"
                sx={{
                  '& .MuiSwitch-switchBase.Mui-checked': {
                    color: '#64b5f6',
                  },
                  '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
                    backgroundColor: '#64b5f6',
                  },
                }}
              />
              <DarkModeIcon fontSize="small" className={styles.themeIcon} />
            </Box>
          </Nav>
        </BootstrapNavbar.Collapse>
      </Container>
    </BootstrapNavbar>
  );
}

export default Navbar;
