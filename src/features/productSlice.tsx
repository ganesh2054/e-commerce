import { createSlice,createAsyncThunk } from '@reduxjs/toolkit';
import { products as handleProducts } from '../api/product/products';
import { ProductType } from '../type/type';

interface ProductState {
    product: ProductType[] | null;
    loading: boolean;
    error: boolean;
    errorMsg: string |undefined;
  }

const initialState:ProductState = {
    product:null,
    loading: false,
    error: false,
    errorMsg: ''
}
export const getProducts = createAsyncThunk('products/getProducts', async () => {
    return await handleProducts()
  })

export const productSlice = createSlice({
    name: 'product',
    initialState,
    extraReducers: (builder) => {

        builder.addCase(getProducts.pending, (state, action) => {
            state['loading'] = true;
            state['error'] = false;
            state['errorMsg'] = '';
        });
        builder.addCase(getProducts.fulfilled, (state, action) => {
            state['loading'] = false;
            if(action)
            state.product = action.payload;
        });
        builder.addCase(getProducts.rejected, (state, action) => {
            state['loading'] = false;
            state['error'] = true;
            state['errorMsg'] =
                action.error?.message;
        });
    },
    reducers:{}
})
export const  selectProductData=(state:ProductState)=>state.product
export default productSlice.reducer;


