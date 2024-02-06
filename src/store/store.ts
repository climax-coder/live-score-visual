import { TypedUseSelectorHook, useSelector } from 'react-redux'
import { configureStore } from '@reduxjs/toolkit'
import filterReducer from './filterSlice'
import paginationReducer from './paginationSlice'

export const store = configureStore({
  reducer: {
    filterReducer,
    paginationReducer,
  }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;