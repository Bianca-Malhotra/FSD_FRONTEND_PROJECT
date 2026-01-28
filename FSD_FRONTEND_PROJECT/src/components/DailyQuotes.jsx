import React, { useEffect, useState } from 'react';
import { Card as MuiCard, CardContent, TextField, Button, Box, Typography, CircularProgress } from '@mui/material';
import styles from './DailyQuotes.module.scss';

function DailyQuotes() {
  const [quote, setQuote] = useState(null);
  const [author, setAuthor] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const fetchQuote = async () => {
    setLoading(true);
    setError('');
    try {
      // Try primary API
      try {
        const response = await fetch('https://api.quotable.io/random?minLength=100');
        if (!response.ok) throw new Error('API error');
        const data = await response.json();
        setQuote(data.content);
        setAuthor(data.author);
        return;
      } catch (primaryErr) {
        console.warn('Primary API failed, trying fallback...', primaryErr);
      }

      // Fallback quotes if API fails
      const fallbackQuotes = [
        { text: 'The only way to do great work is to love what you do.', author: 'Steve Jobs' },
        { text: 'Believe you can and you\'re halfway there.', author: 'Theodore Roosevelt' },
        { text: 'The future belongs to those who believe in the beauty of their dreams.', author: 'Eleanor Roosevelt' },
        { text: 'It is during our darkest moments that we must focus to see the light.', author: 'Aristotle' },
        { text: 'The best time to plant a tree was 20 years ago. The second best time is now.', author: 'Chinese Proverb' },
        { text: 'Your time is limited, so don\'t waste it living someone else\'s life.', author: 'Steve Jobs' },
        { text: 'Happiness is not something ready made. It comes from your own actions.', author: 'Dalai Lama' },
        { text: 'The only impossible journey is the one you never begin.', author: 'Tony Robbins' },
      ];

      const randomQuote = fallbackQuotes[Math.floor(Math.random() * fallbackQuotes.length)];
      setQuote(randomQuote.text);
      setAuthor(randomQuote.author);
    } catch (err) {
      setError('Could not load quote. Using offline quotes instead.');
      console.error('Quote fetch error:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchQuote();
  }, []);

  return (
    <MuiCard className={styles.quotesCard}>
      <CardContent>
        <Typography variant="h6" className={styles.title}>
          ✨ Daily Inspiration
        </Typography>

        {loading ? (
          <Box className={styles.loading}>
            <CircularProgress size={40} />
          </Box>
        ) : error ? (
          <Typography color="error" className={styles.error}>
            {error}
          </Typography>
        ) : quote ? (
          <Box className={styles.quoteBox}>
            <Typography variant="h6" className={styles.quoteText}>
              "{quote}"
            </Typography>
            <Typography variant="body2" className={styles.author}>
              — {author}
            </Typography>
          </Box>
        ) : null}

        <Button fullWidth variant="contained" onClick={fetchQuote} className={styles.refreshBtn}>
          🔄 New Quote
        </Button>
      </CardContent>
    </MuiCard>
  );
}

export default DailyQuotes;
