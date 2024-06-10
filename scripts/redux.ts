import { createSlice, configureStore } from '@reduxjs/toolkit';

export interface State {
  role: string,
  id: string,
  name: string,
  address: string,
  phone: string
}

const roleSlice = createSlice({
    name: 'roleAuth',
    initialState: {
      role: '',
      id: '',
      name: '',
      address: '',
      phone: ''
    },
    reducers: {
      userLogin: (state, action) => {
        state.role = 'user';
        state.id = action.payload.id;
        state.name = action.payload.name;
        state.address = action.payload.address,
        state.phone = action.payload.phone
      },
      adminLogin: (state, action) => {
        state.role = 'admin';
        state.id = action.payload.id;
        state.name = action.payload.name;
        state.address = action.payload.address;
        state.phone = action.payload.phone;
      },
      Logout: (state) => {
        state.role = '';
        state.id = '';
        state.name = '';
        state.address = '';
        state.phone = '';
      }
    }
  })

export const { userLogin, adminLogin, Logout } = roleSlice.actions

export const store = configureStore({
    reducer: roleSlice.reducer
})
  
// Can still subscribe to the store
// store.subscribe(() => console.log(store.getState()))