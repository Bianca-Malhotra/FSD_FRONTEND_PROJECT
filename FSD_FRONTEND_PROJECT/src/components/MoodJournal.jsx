import React, { useState } from 'react';
import { Card as MuiCard, CardContent, TextField, Chip, Box, Button, Typography } from '@mui/material';
import styles from './MoodJournal.module.scss';

const MOOD_TAGS = ['Work', 'Personal', 'Health', 'Family', 'Sleep', 'Exercise', 'Stress', 'Happy'];

function MoodJournal({ onSave }) {
  const [notes, setNotes] = useState('');
  const [selectedTags, setSelectedTags] = useState([]);

  const handleTagToggle = (tag) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  };

  const handleSave = () => {
    if (notes.trim() || selectedTags.length > 0) {
      onSave({ notes, tags: selectedTags });
      setNotes('');
      setSelectedTags([]);
    }
  };

  return (
    <MuiCard className={styles.journalCard}>
      <CardContent>
        <Typography variant="h6" className={styles.title}>
          📝 Mood Journal
        </Typography>
        
        <TextField
          fullWidth
          multiline
          rows={3}
          placeholder="What's on your mind? What triggered this mood?"
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          className={styles.textField}
          variant="outlined"
        />

        <Typography variant="body2" className={styles.tagLabel}>
          🏷️ Add Tags (optional)
        </Typography>
        <Box className={styles.tagContainer}>
          {MOOD_TAGS.map((tag) => (
            <Chip
              key={tag}
              label={tag}
              onClick={() => handleTagToggle(tag)}
              className={selectedTags.includes(tag) ? styles.tagSelected : styles.tag}
              variant={selectedTags.includes(tag) ? 'filled' : 'outlined'}
            />
          ))}
        </Box>

        <Button
          fullWidth
          variant="contained"
          className={styles.saveBtn}
          onClick={handleSave}
        >
          Save Entry
        </Button>
      </CardContent>
    </MuiCard>
  );
}

export default MoodJournal;
