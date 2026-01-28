import { useEffect } from 'react';
import { useSelector } from 'react-redux';

const STORAGE_KEYS = {
  MOOD_DATA: 'moodcanvas_mood_data',
  MOODBOARD: 'moodcanvas_moodboard',
  JOURNAL_DRAFT: 'moodcanvas_journal_draft',
};

export const useLocalStorage = () => {
  const moodData = useSelector((state) => state.mood);

  // Save mood data to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.MOOD_DATA, JSON.stringify(moodData));
  }, [moodData]);

  // Load mood data from localStorage on mount
  useEffect(() => {
    const savedData = localStorage.getItem(STORAGE_KEYS.MOOD_DATA);
    if (savedData) {
      try {
        const parsed = JSON.parse(savedData);
        if (parsed.moodHistory && parsed.moodHistory.length > 0) {
          // Data will be loaded via Redux persist in future
          console.log('Mood data loaded from localStorage');
        }
      } catch (error) {
        console.error('Failed to load mood data:', error);
      }
    }
  }, []);

  const saveMoodboard = (images) => {
    localStorage.setItem(STORAGE_KEYS.MOODBOARD, JSON.stringify(images));
  };

  const loadMoodboard = () => {
    const saved = localStorage.getItem(STORAGE_KEYS.MOODBOARD);
    return saved ? JSON.parse(saved) : [];
  };

  const saveDraftJournal = (text) => {
    localStorage.setItem(STORAGE_KEYS.JOURNAL_DRAFT, text);
  };

  const loadDraftJournal = () => {
    return localStorage.getItem(STORAGE_KEYS.JOURNAL_DRAFT) || '';
  };

  const clearDraftJournal = () => {
    localStorage.removeItem(STORAGE_KEYS.JOURNAL_DRAFT);
  };

  return {
    saveMoodboard,
    loadMoodboard,
    saveDraftJournal,
    loadDraftJournal,
    clearDraftJournal,
  };
};

export default useLocalStorage;
