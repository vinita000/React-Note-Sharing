import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface User {
  uid: string | null;
  email: string | null;
  displayName: string | null;
}

interface UserState {
  user: User | null;
}

const initialState: UserState = {
  user: null,
};

const appSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    addUser: (state, action: PayloadAction<User | null>) => {
      state.user = action.payload;
    },
    removeUser: (state) => {
      state.user = null;
    },
  },
});

export const { addUser, removeUser } = appSlice.actions;
export default appSlice.reducer;
