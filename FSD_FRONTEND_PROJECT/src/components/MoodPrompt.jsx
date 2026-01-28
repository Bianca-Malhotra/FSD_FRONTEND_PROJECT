import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Card as MuiCard, CardContent, Typography, Box, LinearProgress } from '@mui/material';
import { setMood } from '../features/mood/moodSlice';
import MoodCard from './MoodCard';
import styles from './MoodPrompt.module.scss';

const MOOD_OPTIONS = [
  { emoji: '😢', name: 'Sad', value: 1, description: 'Feeling down' },
  { emoji: '😕', name: 'Neutral', value: 3, description: 'Just okay' },
  { emoji: '😊', name: 'Happy', value: 5, description: 'Feeling good' },
  { emoji: '😄', name: 'Very Happy', value: 7, description: 'Excellent!' },
  { emoji: '🤩', name: 'Ecstatic', value: 10, description: 'Amazing!' },
];

function MoodPrompt() {
  const dispatch = useDispatch();
  const currentMood = useSelector((state) => state.mood.currentMood);

  const handleMoodSelect = (value) => {
    dispatch(setMood({ value, notes: '', tags: [] }));
  };

  return (
    <div className={styles.promptContainer}>
      <MuiCard className={styles.card}>
        <CardContent>
          <Typography variant="h5" className={styles.title}>
            How are you feeling today?
          </Typography>
          <Typography variant="body2" className={styles.subtitle}>
            Share your current mood to track your emotional well-being
          </Typography>

          {currentMood > 0 && (
            <Box className={styles.moodDisplay}>
              <Typography variant="body1">Current Mood Score: {currentMood}/10</Typography>
              <LinearProgress variant="determinate" value={currentMood * 10} className={styles.progress} />
            </Box>
          )}

          <Box className={styles.gridContainer}>
            {MOOD_OPTIONS.map((mood) => (
              <div key={mood.value} onClick={() => handleMoodSelect(mood.value)}>
                <MoodCard
                  mood={mood.name}
                  emoji={mood.emoji}
                  description={mood.description}
                  onSelect={() => handleMoodSelect(mood.value)}
                />
              </div>
            ))}
          </Box>
        </CardContent>
      </MuiCard>
    </div>
  );
}

export default MoodPrompt;
