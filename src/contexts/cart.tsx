import React, { createContext, useState, useEffect, useContext } from 'react';
import api from '../services/api';
import { Cart } from '../models/Cart';

interface CartContextData {
    cart: Cart[];
    quantity: number;
    totalValue: number;
    addProduct(
        item: Cart
    ): Promise<void>;
    addValue(
        item: Cart,
        addOrRemove: boolean
    ): Promise<void>;
    setTotal(
        value: number
    ): Promise<void>;
    addItem(
        item: Cart[]
    ): Promise<void>;
}

const CartContext = createContext<CartContextData>({} as CartContextData);

export const CartProvider: React.FC = ({ children }) => {
    const [cart, setCart] = useState<Cart[]>([]);
    const [quantity, setQuantity] = useState(0);
    const [totalValue, setTotalValue] = useState(0);

    async function addProduct(item: Cart) {
        const verifyItem = cart.findIndex(product => product.sku === item.sku);

        if(verifyItem > -1){
            item.quantity = (item.quantity + 1);
            item.total = (item.price * item.quantity);
            cart.splice(verifyItem, 1);
            setCart([item, ...cart]);
        } else {
            setCart([item, ...cart]);
        }
        
        setQuantity(cart.length + 1);
    }

    async function addValue(item: Cart, addOrRemove: boolean) {
        const verifyItem = cart.findIndex(product => product.sku === item.sku);

        if(verifyItem > -1){
            if(addOrRemove){
                item.quantity = (item.quantity + 1);
                item.total = (item.price * item.quantity);
                cart.splice(verifyItem, 1);
                setCart([item, ...cart]);
            } else {
                item.quantity = (item.quantity === 1 ? item.quantity : item.quantity - 1);
                item.total = (item.price * item.quantity);
                cart.splice(verifyItem, 1);
                setCart([item, ...cart]);
            }
        }
    }

    async function setTotal(value: number){
        if(value > 0){
            setTotalValue(value);
        }
    }

    async function addItem(item: Cart[]){
        setCart(item);
        setQuantity(1);
    }

    return (
        <CartContext.Provider value={{ cart, quantity, totalValue, addProduct, addValue, setTotal, addItem }}>
            {children}
        </CartContext.Provider>
    );
};

export function useCart(){
    const context = useContext(CartContext);

    return context;
}