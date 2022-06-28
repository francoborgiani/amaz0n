import React, { createContext, useReducer } from "react";

export const Store = createContext();

const initialState = {
    cart: {
        cartItems: localStorage.getItem("cartItems")
            ? JSON.parse(localStorage.getItem("cartItems")) 
            : [],
    },

};

const reducer = (state, action) => {
    switch (action.type) {
    case "CART_ADD_ITEM":
            const newItem = action.payload;//eslint-disable-line
            const existsItem = state.cart.cartItems.find(el => el._id === newItem._id);//eslint-disable-line

            const cartItems = existsItem //eslint-disable-line
            ? state.cart.cartItems.map(item => item._id === newItem._id
                ? newItem
                : item
            )
            : [...state.cart.cartItems, newItem];

        localStorage.setItem("cartItems", JSON.stringify(cartItems));
        return {
            ...state,
            cart: {
                ...state.cart,
                cartItems
            }
        };
    case "CART_REMOVE_ITEM":
        localStorage.setItem("cartItems", JSON.stringify(state.cart.cartItems.filter(el => el._id !== action.payload._id)));
        return {
            ...state,
            cart: {
                ...state.cart,
                cartItems: state.cart.cartItems.filter(el => el._id !== action.payload._id)
            }
        };
    default:
        return {
            ...state
        };
    }
};

export function StoreProvider(props) {
    const [state, dispatch] = useReducer(reducer, initialState);
    const value = { state, dispatch };


    return <Store.Provider value={value}>
        {props.children}
    </Store.Provider>;
}