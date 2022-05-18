import { configureStore } from '@reduxjs/toolkit'

import covid19DataSlice from './covid19DataSlice';

export const store = configureStore({
    reducer: {
        covid19Data: covid19DataSlice,
    },
});
