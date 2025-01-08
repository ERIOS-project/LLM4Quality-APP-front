import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import VerbatimStatus from '../models/VerbatimStatus';

interface StatusState {
  selectedStatus: VerbatimStatus | '';
}

const initialState: StatusState = {
  selectedStatus: '',
};

const statusSlice = createSlice({
  name: 'status',
  initialState,
  reducers: {
    setSelectedStatus(state, action: PayloadAction<VerbatimStatus | ''>) {
      state.selectedStatus = action.payload;
    },
  },
});

export const { setSelectedStatus } = statusSlice.actions;
export default statusSlice.reducer;