import { configureStore } from "@reduxjs/toolkit";
import appSlice from "./appSlice";

const appStore= configureStore({
  reducer: {
    user: appSlice,
  },
});

export type RootState = ReturnType<typeof appStore.getState>;


export default appStore;
