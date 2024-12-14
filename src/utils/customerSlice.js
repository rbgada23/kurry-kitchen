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
           
            const { kitchenId, item, kitchenName } = action.payload; // action.payload should include kitchenId and item
            if (!state.cartItems[kitchenId]) {
                state.cartItems[kitchenId] = []; // Initialize as an array
            }
            const existingItemIndex = state.cartItems[kitchenId].findIndex(i => i.id === item.id);
            // state.cartItems[kitchenId]['kitchenName'] = kitchenName;
            if (existingItemIndex >= 0) {
                state.cartItems[kitchenId][existingItemIndex].quantity += 1; // Update quantity
            } else {
                state.cartItems[kitchenId].push({
                    ...item,
                    quantity: 1,
                    kitchenName: kitchenName
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
                // If the kitchen list is empty, remove it
                if (state.cartItems[kitchenId].length === 0) {
                    delete state.cartItems[kitchenId];
                }
            }
            saveCartToLocalStorage(state.cartItems);
        },
        clearCart: (state, action) => {
            const kitchenId = action.payload; // action.payload is the kitchenId
            if (kitchenId) {
                delete state.cartItems[kitchenId]; // Clear cart for specific kitchen
            } else {
                state.cartItems = {}; // Clear cart for all kitchens
            }
            saveCartToLocalStorage(state.cartItems);
        },
    },
});

export const { addItemToCart, removeItemFromCart, clearCart } = customerSlice.actions;

export default customerSlice.reducer;
