import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface YearState {
  selectedYear: number | '';
}

const initialState: YearState = {
  selectedYear: '',
};

const yearSlice = createSlice({
  name: 'year',
  initialState,
  reducers: {
    setSelectedYear(state, action: PayloadAction<number | ''>) {
      state.selectedYear = action.payload;
    },
  },
});

export const { setSelectedYear } = yearSlice.actions;
export default yearSlice.reducer;