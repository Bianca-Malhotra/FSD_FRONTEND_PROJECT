import React, { useState } from 'react';
import { Card as MuiCard, CardContent, TextField, Button, Typography, Box, Rating } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { setMood } from '../features/mood/moodSlice';
import styles from './DatePickerMood.module.scss';

function DatePickerMood() {
  const dispatch = useDispatch();
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [moodValue, setMoodValue] = useState(5);
  const [notes, setNotes] = useState('');
  const moodHistory = useSelector((state) => state.mood.moodHistory);

  const getMoodLabel = (value) => {
    const labels = {
      1: '😢 Sad',
      2: '😞 Down',
      3: '😕 Neutral',
      4: '🙂 Content',
      5: '😊 Happy',
      6: '😄 Very Happy',
      7: '🤩 Excited',
      8: '🚀 Energized',
      9: '✨ Amazing',
      10: '🤩 Ecstatic',
    };
    return labels[value] || `Mood: ${value}`;
  };

  const handleSaveMood = () => {
    dispatch(setMood({
      value: moodValue,
      notes: notes,
      tags: ['Historical'],
      customDate: selectedDate,
    }));
    alert('Mood saved for ' + new Date(selectedDate).toLocaleDateString());
    setNotes('');
  };

  // Check if mood already exists for this date
  const existingMood = moodHistory.find(
    (m) => new Date(m.timestamp).toLocaleDateString() === new Date(selectedDate).toLocaleDateString()
  );

  return (
    <MuiCard className={styles.datePickerCard}>
      <CardContent>
        <Typography variant="h6" className={styles.title}>
          📅 Track Mood by Date
        </Typography>

        <Box className={styles.container}>
          <Box className={styles.formSection}>
            <TextField
              type="date"
              label="Select Date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              InputLabelProps={{ shrink: true }}
              fullWidth
              margin="normal"
            />

            <Box className={styles.ratingSection}>
              <Typography variant="body2" className={styles.ratingLabel}>
                How were you feeling?
              </Typography>
              <Box className={styles.ratingDisplay}>
                <Rating
                  value={moodValue}
                  onChange={(e, newValue) => setMoodValue(newValue)}
                  max={10}
                  size="large"
                />
              </Box>
              <Typography variant="body1" className={styles.moodLabel}>
                {getMoodLabel(moodValue)}
              </Typography>
            </Box>

            <TextField
              fullWidth
              label="Notes (optional)"
              placeholder="How was your day? What happened?"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              multiline
              rows={3}
              margin="normal"
            />

            <Button
              fullWidth
              variant="contained"
              onClick={handleSaveMood}
              className={styles.saveBtn}
            >
              💾 Save Mood for {new Date(selectedDate).toLocaleDateString()}
            </Button>
          </Box>

          {existingMood && (
            <Box className={styles.existingMoodBox}>
              <Typography variant="body2" className={styles.existingLabel}>
                📝 Already logged for this date:
              </Typography>
              <Typography variant="h6" className={styles.existingValue}>
                {getMoodLabel(existingMood.value)}
              </Typography>
              {existingMood.notes && (
                <Typography variant="body2" className={styles.existingNotes}>
                  "{existingMood.notes}"
                </Typography>
              )}
            </Box>
          )}
        </Box>
      </CardContent>
    </MuiCard>
  );
}

export default DatePickerMood;
