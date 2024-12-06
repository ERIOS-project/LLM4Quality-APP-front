import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import  Verbatim  from '../models/Verbatim'; // Assurez-vous que ce chemin est correct
import VerbatimStatus  from '../models/VerbatimStatus';

// État initial : liste vide de verbatims
const initialState: Verbatim[] = [
    {
      id: '1',
      content: 'Verbatim 1',
      status: VerbatimStatus.Success,
      year: 2023,
      created_at: new Date('2023-01-01'),
      result: undefined,
    },
    {
      id: '2',
      content: 'Verbatim 2',
      status: VerbatimStatus.Error,
      year: 2022,
      created_at: new Date('2022-05-15'),
      result: undefined,
    },
  ];

const verbatimSlice = createSlice({
  name: 'verbatims',
  initialState,
  reducers: {
    addVerbatim: (state, action: PayloadAction<Verbatim>) => {
      state.push(action.payload);
    },
    updateVerbatim: (state, action: PayloadAction<Verbatim>) => {
      const index = state.findIndex((v) => v.id === action.payload.id);
      if (index !== -1) {
        state[index] = action.payload;
      }
    },
    deleteVerbatim: (state, action: PayloadAction<string>) => {
      return state.filter((v) => v.id !== action.payload);
    },
    setVerbatims: (state, action: PayloadAction<Verbatim[]>) => {
      return action.payload;
    },
  },
});

export const { addVerbatim, updateVerbatim, deleteVerbatim, setVerbatims } = verbatimSlice.actions;

export default verbatimSlice.reducer;
