import  postsreducer  from '@/lib/postsSlice';
import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./authSlice";

 export let store = configureStore({
   reducer: {
     authSlice,
     postsreducer,
   },
 });

export type storeDispaatch = typeof store.dispatch;
 export type storeState = ReturnType<typeof store.getState>;