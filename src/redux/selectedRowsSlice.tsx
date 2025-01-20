import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import Verbatim from '../models/Verbatim';

// Définition de l'état initial
interface SelectedRowsState {
  selectedRows: Verbatim[];
}

const initialState: SelectedRowsState = {
  selectedRows: [],
};

// Création du slice Redux
const selectedRowsSlice = createSlice({
  name: 'selectedRows',
  initialState,
  reducers: {
    // Action pour définir les lignes sélectionnées
    setSelectedRows: (state, action: PayloadAction<Verbatim[]>) => {
      state.selectedRows = action.payload;
    },
    // Nouvelle action pour désélectionner toutes les lignes
    deselectAllRows: (state) => {
      state.selectedRows = []; // Réinitialise les lignes sélectionnées
    },
  },
});

// Export des actions
export const { setSelectedRows, deselectAllRows } = selectedRowsSlice.actions;

// Export du reducer
export default selectedRowsSlice.reducer;
