import React from 'react';
import { Card as MuiCard, CardContent, CardActions, Button, Typography, Box } from '@mui/material';
import styles from './MoodCard.module.scss';

function MoodCard({ mood, emoji, description, onSelect }) {
  return (
    <div className={styles.cardWrapper}>
      <MuiCard className={styles.card} onClick={() => onSelect && onSelect(mood)}>
        <CardContent className={styles.cardContent}>
          <Box className={styles.emojiBox}>{emoji}</Box>
          <Typography variant="h6" component="div" className={styles.moodTitle}>
            {mood}
          </Typography>
          <Typography variant="body2" color="textSecondary" className={styles.description}>
            {description}
          </Typography>
        </CardContent>
        {onSelect && (
          <CardActions>
            <Button size="small" variant="contained" fullWidth className={styles.selectBtn}>
              Log Mood
            </Button>
          </CardActions>
        )}
      </MuiCard>
    </div>
  );
}

export default MoodCard;
