
import React from 'react';
import { Container, Button, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { Card as MuiCard, CardContent, Typography, Box } from '@mui/material';
import MoodPrompt from '../components/MoodPrompt';
import styles from '../styles/HomePage.module.scss';

function HomePage() {
  return (
    <>
      <section className={styles.hero}>
        <Container>
          <Row className="align-items-center">
            <Col lg={6}>
              <h1 className={styles.heroTitle}>Welcome to MoodCanvas 🎨</h1>
              <p className={styles.heroSubtitle}>
                Express your mood, track your emotional journey, and prepare for your career with data-driven insights.
              </p>
              <Link to="/dashboard">
                <Button variant="primary" size="lg" className={styles.ctaButton}>
                  Get Started
                </Button>
              </Link>
            </Col>
            <Col lg={6}>
              <Box className={styles.heroImage}>
                <Typography variant="h1">📊</Typography>
              </Box>
            </Col>
          </Row>
        </Container>
      </section>

      <Container className={styles.container}>
        <section className={styles.featuresSection}>
          <h2 className={styles.sectionTitle}>Why MoodCanvas?</h2>
          <Row className="g-4">
            <Col md={4}>
              <MuiCard className={styles.featureCard}>
                <CardContent>
                  <Typography variant="h5" component="div" className={styles.featureIcon}>
                    🎯
                  </Typography>
                  <Typography variant="h6" className={styles.featureTitle}>
                    Track Emotions
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    Log your daily mood and gain insights into your emotional patterns.
                  </Typography>
                </CardContent>
              </MuiCard>
            </Col>
            <Col md={4}>
              <MuiCard className={styles.featureCard}>
                <CardContent>
                  <Typography variant="h5" component="div" className={styles.featureIcon}>
                    📈
                  </Typography>
                  <Typography variant="h6" className={styles.featureTitle}>
                    Visualize Progress
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    See beautiful charts and analytics of your mood trends over time.
                  </Typography>
                </CardContent>
              </MuiCard>
            </Col>
            <Col md={4}>
              <MuiCard className={styles.featureCard}>
                <CardContent>
                  <Typography variant="h5" component="div" className={styles.featureIcon}>
                    💼
                  </Typography>
                  <Typography variant="h6" className={styles.featureTitle}>
                    Career Ready
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    Prepare yourself for your next career step with well-being tracking.
                  </Typography>
                </CardContent>
              </MuiCard>
            </Col>
          </Row>
        </section>

        <MoodPrompt />
      </Container>
    </>
  );
}

export default HomePage;
