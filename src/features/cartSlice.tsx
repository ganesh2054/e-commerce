import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { cart as handleCart } from '../api/cart/cart';
import {CartType } from '../type/type';
import { addToCart } from '../api/cart/addItems';
interface CartState {
    cart: CartType;
    loading: boolean;
    error: boolean;
    errorMsg: string | undefined;
}

const initialState: CartState = {
    cart: {
        id: 1,
        products: [],
        total: 0,
        discountedTotal: 0,
        userId: 1,
        totalProducts: 0,
        totalQuantity: 0

    },
    loading: false,
    error: false,
    errorMsg: ''
}
export const getCart = createAsyncThunk('cart/getCart', async () => {
    return await handleCart()
})

export const cartSlice = createSlice({
    name: 'cart',
    initialState,
    extraReducers: (builder) => {

        builder.addCase(getCart.pending, (state, action) => {
            state['loading'] = true;
            state['error'] = false;
            state['errorMsg'] = '';
        });
        builder.addCase(getCart.fulfilled, (state, action) => {
            state['loading'] = false;
            if (action)
                state.cart = action.payload;
        });
        builder.addCase(getCart.rejected, (state, action) => {
            state['loading'] = false;
            state['error'] = true;
            state['errorMsg'] =
                action.error?.message;
        });
    },
    reducers: {
        addItem: (state, action) => {
            state.cart.products.push(action.payload)
            state.cart.total = state.cart.total + action.payload.price
            state.cart.discountedTotal = state.cart.discountedTotal + action.payload.discountedPrice
            state.cart.totalQuantity = state.cart.totalQuantity + action.payload.quantity
            state.cart.totalProducts = state.cart.totalProducts + 1
            addToCart(state.cart)
        },

        incrementQuantity: (state, action) => {
            const index = state.cart.products.findIndex(p => p.id == action.payload.id)
            if (index !== -1) {
                state.cart.products[index].quantity = action.payload.quantity
                state.cart.products[index].discountedPrice = action.payload.discountedPrice
                state.cart.products[index].total = action.payload.total

                state.cart.total = state.cart.total + state.cart.products[index].price
                state.cart.discountedTotal = state.cart.discountedTotal + (action.payload.discountedPrice) / 2
                state.cart.totalQuantity = state.cart.totalQuantity + 1
                addToCart(state.cart)
            }
        },
        decrementQuantity: (state, action) => {
            const index = state.cart.products.findIndex(p => p.id == action.payload.id)
            const discount = (state.cart.products[index].price * state.cart.products[index].discountPercentage) / 100
            const priceAfterDiscount = state.cart.products[index].price - discount
            if (index !== -1) {
                state.cart.products[index].quantity = action.payload.quantity
                state.cart.products[index].discountedPrice = action.payload.discountedPrice
                state.cart.products[index].total = action.payload.total

                state.cart.total = state.cart.total - state.cart.products[index].price
                state.cart.discountedTotal = state.cart.discountedTotal - priceAfterDiscount
                state.cart.totalQuantity = state.cart.totalQuantity - 1
                addToCart(state.cart)
            }
        },
        removeItem: (state, action) => {
            const index = state.cart.products.findIndex(p => p.id == action.payload)
            state.cart.total = state.cart.total - state.cart.products[index].total
            state.cart.discountedTotal = state.cart.discountedTotal-state.cart.products[index].discountedPrice
            state.cart.totalQuantity = state.cart.totalQuantity - state.cart.products[index].quantity
            state.cart.totalProducts=state.cart.totalProducts-1
            state.cart.products.splice(index, 1)

            addToCart(state.cart)
        }
    }
})
export const selectCart = (state:CartState) => state.cart
export const selectProductCount = (state:CartState) => state.cart.totalQuantity
export const { addItem, incrementQuantity, decrementQuantity, removeItem } = cartSlice.actions;
export default cartSlice.reducer;


