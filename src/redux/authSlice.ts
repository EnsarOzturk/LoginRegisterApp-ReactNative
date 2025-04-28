
import { createSlice } from '@reduxjs/toolkit'; // redux tolkit fonksiypnu , state vs tek bir yerde tanımlamak amacı ile??

const initialState = {
  token: null, // giriş yapıldı ve null olarak
  isAuthenticated: false, // kullanıcı girişyapmayınca true çkınca false. ama default false!
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state, action) => {  // login ekranındaki giriş yapıldığında çalışan yer gibi.. api den gelen tokeni  state'e kaydettiğ
      state.token = action.payload;
      state.isAuthenticated = true; // giriş yapılmış
    },
    logout: (state) => { // çıkış yapıldığında çalışan yer gibi..
      state.token = null; //  çıkış yapılınca token = null olur
      state.isAuthenticated = false; // çıkış yapınca false olur
    },
  },
});

export const { login, logout } = authSlice.actions;  //bunlar giriş ve çıkış ile ilgili aksiyon fonksyionları  
export default authSlice.reducer; // reducer ile dışa aktarıldıyo......
