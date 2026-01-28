
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Container, Row, Col } from 'react-bootstrap';
import { Card as MuiCard, CardContent, Button, Box, Typography } from '@mui/material';
import { incrementMood, decrementMood, resetMood, setMood } from '../features/mood/moodSlice';
import MoodStats from '../components/MoodStats';
import MoodPrompt from '../components/MoodPrompt';
import MoodJournal from '../components/MoodJournal';
import WellnessTips from '../components/WellnessTips';
import MoodHistory from '../components/MoodHistory';
import DailyQuotes from '../components/DailyQuotes';
import DatePickerMood from '../components/DatePickerMood';
import Moodboard from '../components/Moodboard';
import styles from './Dashboard.module.scss';

function Dashboard() {
  const { currentMood, moodHistory } = useSelector((state) => state.mood);
  const dispatch = useDispatch();

  const getMoodEmoji = (mood) => {
    if (mood <= 2) return '😢';
    if (mood <= 4) return '😕';
    if (mood <= 6) return '😊';
    if (mood <= 8) return '😄';
    return '🤩';
  };

  const getMoodLabel = (mood) => {
    if (mood === 0) return 'Not set';
    if (mood <= 2) return 'Sad';
    if (mood <= 4) return 'Neutral';
    if (mood <= 6) return 'Happy';
    if (mood <= 8) return 'Very Happy';
    return 'Ecstatic';
  };

  const handleJournalSave = (data) => {
    dispatch(setMood({ value: currentMood, ...data }));
  };

  return (
    <Container className={styles.dashboard}>
      <Row className="mt-5 mb-4">
        <Col lg={8}>
          <Typography variant="h3" className={styles.title}>
            Dashboard
          </Typography>
        </Col>
      </Row>

      <Row className="mb-4">
        <Col lg={6} md={12} className="mb-4">
          <MuiCard className={styles.moodCard}>
            <CardContent>
              <Box className={styles.currentMoodBox}>
                <Typography variant="h6" className={styles.label}>
                  Current Mood
                </Typography>
                <Typography variant="h2" className={styles.emoji}>
                  {getMoodEmoji(currentMood)}
                </Typography>
                <Typography variant="h4" className={styles.moodScore}>
                  {currentMood}/10
                </Typography>
                <Typography variant="body1" className={styles.moodLabel}>
                  {getMoodLabel(currentMood)}
                </Typography>
              </Box>
            </CardContent>
          </MuiCard>
        </Col>

        <Col lg={6} md={12} className="mb-4">
          <MuiCard className={styles.controlsCard}>
            <CardContent>
              <Typography variant="h6" className={styles.label} style={{ marginBottom: '1.5rem' }}>
                Mood Controls
              </Typography>
              <Box className={styles.buttonGroup}>
                <Button
                  variant="contained"
                  className={styles.decrementBtn}
                  onClick={() => dispatch(decrementMood())}
                >
                  📉 Decrease
                </Button>
                <Button
                  variant="contained"
                  className={styles.incrementBtn}
                  onClick={() => dispatch(incrementMood())}
                >
                  📈 Increase
                </Button>
                <Button
                  variant="outlined"
                  className={styles.resetBtn}
                  onClick={() => dispatch(resetMood())}
                >
                  🔄 Reset
                </Button>
              </Box>
            </CardContent>
          </MuiCard>
        </Col>
      </Row>

      <Row>
        <Col lg={12}>
          <MoodStats />
        </Col>
      </Row>

      <Row>
        <Col lg={12}>
          <MoodPrompt />
        </Col>
      </Row>

      <Row>
        <Col lg={12}>
          <MoodJournal onSave={handleJournalSave} />
        </Col>
      </Row>

      <Row>
        <Col lg={12}>
          <WellnessTips currentMood={currentMood} />
        </Col>
      </Row>

      <Row>
        <Col lg={12}>
          <MoodHistory moodHistory={moodHistory} />
        </Col>
      </Row>

      <Row>
        <Col lg={12}>
          <DailyQuotes />
        </Col>
      </Row>

      <Row>
        <Col lg={12}>
          <DatePickerMood />
        </Col>
      </Row>

      <Row>
        <Col lg={12}>
          <Moodboard />
        </Col>
      </Row>
    </Container>
  );
}

export default Dashboard;
