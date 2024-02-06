import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CounterType, FilterType, InitialFilterState } from '@/types/types';

const initialState: InitialFilterState = {
  counters: {
    all: 0,
    result: 0,
    live: 0,
    upcoming: 0,
  },
  selectedFilter: FilterType.All,
};

const FilterMap = new Map([
  ["all", { type: FilterType.All, label: "All" }],
  ["result", { type: FilterType.Result, label: "Result" }],
  ["live", { type: FilterType.Live, label: "Live" }],
  ["upcoming", { type: FilterType.Upcoming, label: "Upcoming" }],
])

export const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    setFilter: (state, action: PayloadAction<string>) => {
      const filterType = FilterMap.get(action.payload);
      if (filterType) {
        state.selectedFilter = filterType.type;
      }
    },
    setCounters: (state, action: PayloadAction<CounterType>) => {
      state.counters = action.payload;
    },
  },
});

export const { setFilter, setCounters } = filterSlice.actions;
export default filterSlice.reducer;