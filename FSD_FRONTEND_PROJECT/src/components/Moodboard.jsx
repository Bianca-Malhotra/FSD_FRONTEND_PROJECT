import React, { useState, useCallback, useEffect } from 'react';
import { Card as MuiCard, CardContent, Typography, Box, Button, ImageList, ImageListItem, Dialog, TextField, Alert } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import useLocalStorage from '../hooks/useLocalStorage';
import styles from './Moodboard.module.scss';

function Moodboard() {
  const { saveMoodboard, loadMoodboard } = useLocalStorage();
  const [images, setImages] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [imageUrl, setImageUrl] = useState('');
  const [caption, setCaption] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  // Load images on mount
  useEffect(() => {
    const loadImages = async () => {
      try {
        const saved = loadMoodboard();
        console.log('Loaded moodboard images:', saved);
        setImages(Array.isArray(saved) ? saved : []);
      } catch (err) {
        console.error('Failed to load moodboard:', err);
        setImages([]);
      }
    };
    loadImages();
  }, [loadMoodboard]);

  const handleAddImage = useCallback(() => {
    if (!imageUrl.trim()) {
      setErrorMsg('Please enter an image URL');
      return;
    }
    
    const newImage = {
      id: Date.now(),
      url: imageUrl.trim(),
      caption: caption || 'Untitled',
      addedDate: new Date().toLocaleDateString(),
    };
    
    setImages((prevImages) => {
      const updated = [...prevImages, newImage];
      console.log('Saving images:', updated);
      saveMoodboard(updated);
      return updated;
    });
    
    setImageUrl('');
    setCaption('');
    setErrorMsg('');
    setOpenDialog(false);
  }, [imageUrl, caption, saveMoodboard]);

  const handleAddSampleImage = useCallback(() => {
    const sampleImage = {
      id: Date.now(),
      url: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=400&fit=crop',
      caption: 'Sample: Peaceful Mountains',
      addedDate: new Date().toLocaleDateString(),
    };
    
    setImages((prevImages) => {
      const updated = [...prevImages, sampleImage];
      console.log('Saving sample image:', updated);
      saveMoodboard(updated);
      return updated;
    });
  }, [saveMoodboard]);

  const handleDeleteImage = useCallback((id) => {
    setImages((prevImages) => {
      const updated = prevImages.filter((img) => img.id !== id);
      console.log('Deleting image, remaining:', updated);
      saveMoodboard(updated);
      return updated;
    });
  }, [saveMoodboard]);

  // Handle keyboard shortcuts for closing dialog
  useEffect(() => {
    const handleKeyPress = (e) => {
      if ((e.key === 'Escape' || (e.ctrlKey && e.key === 'c')) && openDialog) {
        setOpenDialog(false);
        setErrorMsg('');
      }
    };

    document.addEventListener('keydown', handleKeyPress);
    return () => document.removeEventListener('keydown', handleKeyPress);
  }, [openDialog]);

  return (
    <MuiCard className={styles.moodboardCard}>
      <CardContent>
        <Box className={styles.header}>
          <Typography variant="h6" className={styles.title}>
            🖼️ My Moodboard
          </Typography>
          <Box className={styles.headerButtons}>
            <Button variant="outlined" size="small" onClick={handleAddSampleImage} className={styles.sampleBtn}>
              📸 Sample
            </Button>
            <Button variant="contained" onClick={() => setOpenDialog(true)} className={styles.addBtn}>
              + ADD IMAGE
            </Button>
          </Box>
        </Box>

        {images.length === 0 ? (
          <Box className={styles.emptyState}>
            <Typography variant="body2" color="textSecondary" className={styles.empty}>
              No images yet. Start building your moodboard! 🎨
            </Typography>
            <Typography variant="caption" color="textSecondary">
              Tip: Click "📸 Sample" to see an example, or add your own image URL
            </Typography>
          </Box>
        ) : (
          <ImageList cols={{ xs: 1, sm: 2, md: 3 }} gap={16} className={styles.imageList}>
            {images.map((item) => (
              <ImageListItem key={item.id} className={styles.imageItem}>
                <Box className={styles.imageWrapper}>
                  <img src={item.url} alt={item.caption} className={styles.image} onError={(e) => {
                    e.target.src = 'https://via.placeholder.com/300x300?text=Image+Error';
                  }} />
                  <Box className={styles.overlay}>
                    <Typography variant="body2" className={styles.caption}>
                      {item.caption}
                    </Typography>
                    <Typography variant="caption" className={styles.date}>
                      {item.addedDate}
                    </Typography>
                    <Button
                      size="small"
                      color="error"
                      startIcon={<DeleteIcon />}
                      onClick={() => handleDeleteImage(item.id)}
                      className={styles.deleteBtn}
                    >
                      Delete
                    </Button>
                  </Box>
                </Box>
              </ImageListItem>
            ))}
          </ImageList>
        )}

        <Dialog open={openDialog} onClose={() => setOpenDialog(false)} maxWidth="sm" fullWidth>
          <CardContent className={styles.dialogContent}>
            <Typography variant="h6" className={styles.dialogTitle}>
              Add Image to Moodboard
            </Typography>
            
            {errorMsg && (
              <Alert severity="error" onClose={() => setErrorMsg('')} style={{ marginBottom: '1rem' }}>
                {errorMsg}
              </Alert>
            )}
            
            <TextField
              fullWidth
              label="Image URL"
              placeholder="https://example.com/image.jpg"
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
              margin="normal"
              helperText="Use direct image URLs (e.g., from Unsplash: unsplash.com)"
            />
            <TextField
              fullWidth
              label="Caption"
              placeholder="What mood does this capture?"
              value={caption}
              onChange={(e) => setCaption(e.target.value)}
              margin="normal"
              multiline
              rows={2}
            />
            <Box className={styles.dialogActions}>
              <Button onClick={() => setOpenDialog(false)}>Cancel</Button>
              <Button variant="contained" onClick={handleAddImage} className={styles.confirmBtn}>
                Add to Moodboard
              </Button>
            </Box>
          </CardContent>
        </Dialog>
      </CardContent>
    </MuiCard>
  );
}

export default Moodboard;
