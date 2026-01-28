import React from 'react';
import { Card as MuiCard, CardContent, Typography, Box, Button } from '@mui/material';
import styles from './WellnessTips.module.scss';

const WELLNESS_RECOMMENDATIONS = {
  1: {
    emoji: '😢',
    mood: 'Sad',
    tips: [
      '💬 Talk to someone you trust',
      '🚶 Take a walk outside',
      '📞 Call a friend or family member',
      '🎵 Listen to uplifting music',
      '🧘 Try a 5-minute meditation',
    ],
    activities: ['Journaling', 'Therapy', 'Comedy movie', 'Pet cuddles'],
  },
  3: {
    emoji: '😕',
    mood: 'Neutral',
    tips: [
      '☕ Grab a coffee or tea',
      '🎮 Do something you enjoy',
      '💪 Exercise or stretch',
      '📚 Read something interesting',
      '🎨 Try a creative activity',
    ],
    activities: ['Hobby time', 'Light exercise', 'Learning', 'Social chat'],
  },
  5: {
    emoji: '😊',
    mood: 'Happy',
    tips: [
      '✍️ Write down 3 things you\'re grateful for',
      '🤝 Share joy with others',
      '📸 Take a happy memory photo',
      '🎉 Celebrate small wins',
      '💝 Do something kind for someone',
    ],
    activities: ['Celebration', 'Social time', 'Gratitude', 'Creative work'],
  },
  7: {
    emoji: '😄',
    mood: 'Very Happy',
    tips: [
      '🎯 Tackle a challenging task',
      '🌟 Set new goals',
      '📣 Share your happiness',
      '🎊 Plan something fun',
      '💪 Use this energy productively',
    ],
    activities: ['New project', 'Planning', 'Social gathering', 'Fitness'],
  },
  10: {
    emoji: '🤩',
    mood: 'Ecstatic',
    tips: [
      '🎉 Celebrate this moment',
      '📢 Spread positivity',
      '🏆 Accomplish something big',
      '💯 Push your limits',
      '🌈 Soak in this joy',
    ],
    activities: ['Major achievement', 'Party', 'Adventure', 'Peak experience'],
  },
};

function getMoodRecommendation(moodValue) {
  const keys = [1, 3, 5, 7, 10];
  const closest = keys.reduce((prev, curr) =>
    Math.abs(curr - moodValue) < Math.abs(prev - moodValue) ? curr : prev
  );
  return WELLNESS_RECOMMENDATIONS[closest];
}

function WellnessTips({ currentMood }) {
  const recommendation = getMoodRecommendation(currentMood);

  if (!recommendation) return null;

  return (
    <MuiCard className={styles.wellnessCard}>
      <CardContent>
        <Box className={styles.header}>
          <Typography variant="h5" className={styles.emoji}>
            {recommendation.emoji}
          </Typography>
          <Box>
            <Typography variant="h6" className={styles.moodTitle}>
              You're feeling {recommendation.mood}
            </Typography>
            <Typography variant="body2" className={styles.subtitle}>
              Here's what might help
            </Typography>
          </Box>
        </Box>

        <Box className={styles.section}>
          <Typography variant="subtitle1" className={styles.sectionTitle}>
            💡 Wellness Tips
          </Typography>
          <Box className={styles.tipsList}>
            {recommendation.tips.map((tip, idx) => (
              <Typography key={idx} variant="body2" className={styles.tipItem}>
                {tip}
              </Typography>
            ))}
          </Box>
        </Box>

        <Box className={styles.section}>
          <Typography variant="subtitle1" className={styles.sectionTitle}>
            🎯 Suggested Activities
          </Typography>
          <Box className={styles.activityButtons}>
            {recommendation.activities.map((activity, idx) => (
              <Button key={idx} variant="outlined" className={styles.activityBtn}>
                {activity}
              </Button>
            ))}
          </Box>
        </Box>
      </CardContent>
    </MuiCard>
  );
}

export default WellnessTips;
