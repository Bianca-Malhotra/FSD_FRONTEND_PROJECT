import React from 'react';
import { useSelector } from 'react-redux';
import { Card as MuiCard, CardContent, Typography, Box, LinearProgress, Grid } from '@mui/material';
import styles from './MoodStats.module.scss';

function MoodStats() {
  const { moodHistory, moodStats, currentMood } = useSelector((state) => state.mood);

  const recentMoods = moodHistory.slice(-7);

  return (
    <div className={styles.statsContainer}>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6} md={3}>
          <MuiCard className={styles.statCard}>
            <CardContent>
              <Typography color="textSecondary" gutterBottom>
                Current Mood
              </Typography>
              <Typography variant="h4" className={styles.statValue}>
                {currentMood}/10
              </Typography>
              <LinearProgress
                variant="determinate"
                value={currentMood * 10}
                className={styles.statProgress}
              />
            </CardContent>
          </MuiCard>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <MuiCard className={styles.statCard}>
            <CardContent>
              <Typography color="textSecondary" gutterBottom>
                Average Mood
              </Typography>
              <Typography variant="h4" className={styles.statValue}>
                {Number.isFinite(moodStats.average) ? moodStats.average : 0}
              </Typography>
              <Typography variant="caption" color="textSecondary">
                Last {moodHistory.length} entries
              </Typography>
            </CardContent>
          </MuiCard>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <MuiCard className={styles.statCard}>
            <CardContent>
              <Typography color="textSecondary" gutterBottom>
                Total Entries
              </Typography>
              <Typography variant="h4" className={styles.statValue}>
                {moodHistory.length}
              </Typography>
            </CardContent>
          </MuiCard>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <MuiCard className={styles.statCard}>
            <CardContent>
              <Typography color="textSecondary" gutterBottom>
                Total Score
              </Typography>
              <Typography variant="h4" className={styles.statValue}>
                {Number.isFinite(moodStats.total) ? moodStats.total : 0}
              </Typography>
            </CardContent>
          </MuiCard>
        </Grid>
      </Grid>

      {recentMoods.length > 0 && (
        <MuiCard className={styles.historyCard}>
          <CardContent>
            <Typography variant="h6" className={styles.historyTitle}>
              Last 7 Mood Entries
            </Typography>
            <Box className={styles.chartContainer}>
              {recentMoods.map((entry, index) => (
                <div key={index} className={styles.barItem}>
                  <div className={styles.barWrapper}>
                    <div
                      className={styles.bar}
                      style={{
                        height: `${entry.value * 10}%`,
                        backgroundColor: entry.value <= 3 ? '#ff6b6b' : entry.value <= 6 ? '#ffd700' : '#51cf66',
                      }}
                    />
                  </div>
                  <Typography variant="caption" className={styles.label}>
                    {entry.value}
                  </Typography>
                </div>
              ))}
            </Box>
          </CardContent>
        </MuiCard>
      )}
    </div>
  );
}

export default MoodStats;
