import React, { useState } from 'react';
import { Card as MuiCard, CardContent, Typography, Box, Chip, Collapse, IconButton } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import styles from './MoodHistory.module.scss';

function MoodHistory({ moodHistory }) {
  const [expandedIndex, setExpandedIndex] = useState(null);

  const getMoodEmoji = (value) => {
    if (value <= 2) return '😢';
    if (value <= 4) return '😕';
    if (value <= 6) return '😊';
    if (value <= 8) return '😄';
    return '🤩';
  };

  const getMoodLabel = (value) => {
    if (value <= 2) return 'Sad';
    if (value <= 4) return 'Neutral';
    if (value <= 6) return 'Happy';
    if (value <= 8) return 'Very Happy';
    return 'Ecstatic';
  };

  const formatTime = (isoString) => {
    const date = new Date(isoString);
    return date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
  };

  const formatDate = (isoString) => {
    const date = new Date(isoString);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  const recentEntries = moodHistory.slice(-10).reverse();

  return (
    <MuiCard className={styles.historyCard}>
      <CardContent>
        <Typography variant="h6" className={styles.title}>
          📋 Mood History
        </Typography>

        {recentEntries.length === 0 ? (
          <Typography variant="body2" color="textSecondary" className={styles.empty}>
            No mood entries yet. Start logging your mood!
          </Typography>
        ) : (
          <Box className={styles.entriesList}>
            {recentEntries.map((entry, idx) => (
              <MuiCard key={idx} className={styles.entryCard}>
                <CardContent className={styles.entryContent}>
                  <Box className={styles.entryHeader}>
                    <Box className={styles.moodInfo}>
                      <Typography className={styles.emoji}>
                        {getMoodEmoji(entry.value)}
                      </Typography>
                      <Box>
                        <Typography variant="subtitle2" className={styles.entryMoodScore}>
                          {entry.value}/10 - {getMoodLabel(entry.value)}
                        </Typography>
                        <Typography variant="caption" className={styles.entryTime}>
                          {formatDate(entry.timestamp)} at {formatTime(entry.timestamp)}
                        </Typography>
                      </Box>
                    </Box>
                    {entry.notes && (
                      <IconButton
                        onClick={() => setExpandedIndex(expandedIndex === idx ? null : idx)}
                        className={styles.expandBtn}
                        size="small"
                      >
                        <ExpandMoreIcon />
                      </IconButton>
                    )}
                  </Box>

                  {entry.tags && entry.tags.length > 0 && (
                    <Box className={styles.tagsBox}>
                      {entry.tags.map((tag, tagIdx) => (
                        <Chip key={tagIdx} label={tag} size="small" className={styles.tag} />
                      ))}
                    </Box>
                  )}

                  <Collapse in={expandedIndex === idx}>
                    <Typography variant="body2" className={styles.notes}>
                      {entry.notes}
                    </Typography>
                  </Collapse>
                </CardContent>
              </MuiCard>
            ))}
          </Box>
        )}
      </CardContent>
    </MuiCard>
  );
}

export default MoodHistory;
