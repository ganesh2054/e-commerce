import { configureStore } from '@reduxjs/toolkit';
import productReducer from '../features/productSlice'
import cartReducer from '../features/cartSlice'

const store = configureStore({
  reducer: {
    product: productReducer,
    cart:cartReducer
  },
});
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export default store