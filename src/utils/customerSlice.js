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

const saveCartToLocalStorage = (cartItems) => {
    try {
        const serializedCart = JSON.stringify(cartItems);
        localStorage.setItem("cartItems", serializedCart);
    } catch (e) {
        console.error("Could not save cart items to localStorage", e);
    }
};

const customerSlice = createSlice({
    name: "customer",
    initialState: {
        cartItems: loadCartFromLocalStorage(), // e.g., { kitchenId1: [...], kitchenId2: [...] }
    },
    reducers: {
        addItemToCart: (state, action) => {
            const { kitchenId, item } = action.payload; // action.payload should include kitchenId and item
            if (!state.cartItems[kitchenId]) {
                state.cartItems[kitchenId] = []; // Initialize as an array
            }
            const existingItemIndex = state.cartItems[kitchenId].findIndex(i => i.id === item.id);
            if (existingItemIndex >= 0) {
                state.cartItems[kitchenId][existingItemIndex].quantity += 1; // Update quantity
            } else {
                state.cartItems[kitchenId].push({
                    ...item,
                    quantity: 1,
                });
            }
            saveCartToLocalStorage(state.cartItems);
        },
        removeItemFromCart: (state, action) => {
            const { kitchenId, itemId } = action.payload; // action.payload should include kitchenId and itemId
            if (state.cartItems[kitchenId]) {
                const existingItemIndex = state.cartItems[kitchenId].findIndex(i => i.id === itemId);
                if (existingItemIndex >= 0) {
                    if (state.cartItems[kitchenId][existingItemIndex].quantity > 1) {
                        state.cartItems[kitchenId][existingItemIndex].quantity -= 1; // Decrease quantity
                    } else {
                        state.cartItems[kitchenId].splice(existingItemIndex, 1); // Remove item
                    }
                }
            }
            saveCartToLocalStorage(state.cartItems);
        },
    },
});

export const { addItemToCart, removeItemFromCart } = customerSlice.actions;

export default customerSlice.reducer;
