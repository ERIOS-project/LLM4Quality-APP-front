// src/features/selectedRowsSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import Verbatim from '../models/Verbatim';

interface SelectedRowsState {
  selectedRows: Verbatim[];
}

const initialState: SelectedRowsState = {
  selectedRows: [],
};

const selectedRowsSlice = createSlice({
  name: 'selectedRows',
  initialState,
  reducers: {
    setSelectedRows: (state, action: PayloadAction<Verbatim[]>) => {
      state.selectedRows = action.payload;
    },
  },
});

export const { setSelectedRows } = selectedRowsSlice.actions;
export default selectedRowsSlice.reducer;