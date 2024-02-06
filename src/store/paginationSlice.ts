import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { PaginationState } from '@/types/types';

const initialState: PaginationState = {
  currentPage: 1,
  totalPages: 0,
};

export const paginationSlice = createSlice({
  name: 'pagination',
  initialState,
  reducers: {
    setTotalPages: (state, action: PayloadAction<number>) => {
      state.totalPages = action.payload;
    },
    goToNextPage: (state) => {
      if (state.currentPage < state.totalPages) {
        state.currentPage += 1;
      }
    },
    goToPrevPage: (state) => {
      if (state.currentPage > 1) {
        state.currentPage -= 1;
      }
    },
    goToPage: (state, action: PayloadAction<number>) => {
      const newPage = action.payload;
      if (newPage > 0 && newPage <= state.totalPages) {
        state.currentPage = newPage;
      }
    },
  },
});

export const { setTotalPages, goToNextPage, goToPrevPage, goToPage } = paginationSlice.actions;
export default paginationSlice.reducer;