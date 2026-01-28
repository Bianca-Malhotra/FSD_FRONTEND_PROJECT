
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  currentMood: 0,
  moodHistory: [],
  moodStats: {
    total: 0,
    average: 0,
  },
};

const moodSlice = createSlice({
  name: 'mood',
  initialState,
  reducers: {
    setMood: (state, action) => {
      const { value, notes, tags, customDate } = action.payload;
      state.currentMood = value;
      
      // Use custom date if provided, otherwise use current time
      const timestamp = customDate 
        ? new Date(customDate).toISOString()
        : new Date().toISOString();
      
      const entry = {
        value: value,
        timestamp: timestamp,
        notes: notes || '',
        tags: tags || [],
      };
      
      state.moodHistory.push(entry);
      updateStats(state);
    },
    incrementMood: (state) => {
      if (state.currentMood < 10) {
        state.currentMood += 1;
      }
      state.moodHistory.push({
        value: state.currentMood,
        timestamp: new Date().toISOString(),
        notes: '',
        tags: [],
      });
      updateStats(state);
    },
    decrementMood: (state) => {
      if (state.currentMood > 0) {
        state.currentMood -= 1;
      }
      state.moodHistory.push({
        value: state.currentMood,
        timestamp: new Date().toISOString(),
        notes: '',
        tags: [],
      });
      updateStats(state);
    },
    resetMood: (state) => {
      state.currentMood = 0;
      state.moodHistory = [];
      state.moodStats = { total: 0, average: 0 };
    },
    clearHistory: (state) => {
      state.moodHistory = [];
      state.moodStats = { total: 0, average: 0 };
    },
    updateMoodEntry: (state, action) => {
      const { index, notes, tags } = action.payload;
      if (state.moodHistory[index]) {
        state.moodHistory[index].notes = notes;
        state.moodHistory[index].tags = tags;
      }
    },
  },
});

function updateStats(state) {
  if (state.moodHistory.length === 0) {
    state.moodStats.total = 0;
    state.moodStats.average = 0;
    return;
  }
  const total = state.moodHistory.reduce((sum, entry) => sum + (Number(entry.value) || 0), 0);
  state.moodStats.total = total;
  state.moodStats.average = Number((total / state.moodHistory.length).toFixed(2));
}

export const { setMood, incrementMood, decrementMood, resetMood, clearHistory, updateMoodEntry } = moodSlice.actions;
export default moodSlice.reducer;
