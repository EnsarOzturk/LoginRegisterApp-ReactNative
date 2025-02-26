import { configureStore } from '@reduxjs/toolkit'; 
import authReducer from './authSlice';
// Redux Store
export const store = configureStore({
  reducer: {
    auth: authReducer, // aslında bu authSlice.ts deki reduceri eklemek:) 
  },
});
// useselector ve usedispatch uymlu çalismasıiçin 
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

// RootState = tüm state tiplerini temsilen 
// redux toolkit kullanımı konusu: genel state yönetimi için 