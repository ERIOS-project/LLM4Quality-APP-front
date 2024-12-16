import type { Action, ThunkAction } from "@reduxjs/toolkit";
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import  verbatimSlice  from "./VerbatimSlice"; // Import du slice des verbatims
import selectedRowsReducer from "./selectedRowsSlice"; // Import du slice des lignes sélectionnées

// Combine les slices, y compris verbatimSlice
const rootReducer = combineReducers({
  verbatims: verbatimSlice,
  selectedRows: selectedRowsReducer,
});

// Déduit le type de l'état global à partir du root reducer
export type RootState = ReturnType<typeof rootReducer>;

// Fonction pour créer le store, utile pour les tests ou des configurations spécifiques
export const makeStore = (preloadedState?: Partial<RootState>) => {
  const store = configureStore({
    reducer: rootReducer,
    preloadedState,
  });

  // Configure les listeners pour RTK Query
  setupListeners(store.dispatch);

  return store;
};

// Création du store principal
export const store = makeStore();

// Déduire les types pour le dispatch, le state et les thunks
export type AppStore = typeof store;
export type AppDispatch = AppStore["dispatch"];
export type AppThunk<ThunkReturnType = void> = ThunkAction<
  ThunkReturnType,
  RootState,
  unknown,
  Action
>;
