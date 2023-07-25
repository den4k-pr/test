import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AppState {
    chooseValue: string;
}

const initialState: AppState = {
    chooseValue: "products",
};

const adminChooseSelect = createSlice({
  name: 'burger',
  initialState,
  reducers: {
    setAdminValue: (state, action: PayloadAction<string>) => {
        state.chooseValue = action.payload;
    },
  },
});

export const { setAdminValue } = adminChooseSelect.actions;

export default adminChooseSelect.reducer;
