import { createSlice } from "@reduxjs/toolkit";

const loadCartFromLocalStorage = () => {
    try {
      const serializedCart = localStorage.getItem("cartItems");
      if (serializedCart === null) return {};
      return JSON.parse(serializedCart);
    } catch (e) {
      console.error("Could not load cart items from localStorage", e);
      return {};
    }
  };

const customerSlice = createSlice({
    name: "customer",
    initialState: {
        cartItems: loadCartFromLocalStorage(),
    },
    reducers: {
        addItemToCart: (state, action) => {
            const itemId = action.payload.id;
            if (state.cartItems[itemId]) {
                state.cartItems[itemId].quantity += 1;
            } else {
                state.cartItems[itemId] = {
                    ...action.payload,
                    quantity: 1,
                };
            }
            saveCartToLocalStorage(state.cartItems);
        },
        removeItemFromCart: (state, action) => {
            const itemId = action.payload.id;
            if (state.cartItems[itemId] && state.cartItems[itemId].quantity > 1) {
                state.cartItems[itemId].quantity -= 1;
            } else {
                delete state.cartItems[itemId];
            }
            saveCartToLocalStorage(state.cartItems);
        },
    },
});

const saveCartToLocalStorage = (cartItems) => {
    try {
        const serializedCart = JSON.stringify(cartItems);
        localStorage.setItem("cartItems", serializedCart);
    } catch (e) {
        console.error("Could not save cart items to localStorage", e);
    }
};

export const { addItemToCart, removeItemFromCart } = customerSlice.actions;

export default customerSlice.reducer;
