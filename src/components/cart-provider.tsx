'use client'

import React, { createContext, useContext, useState } from 'react'

type CartItem = {
    id: number
    title: string
    price: number
    quantity: number
    image?: string
}

type CartContextType = {
    cart: CartItem[]
    addToCart: (item: Omit<CartItem, 'quantity'>) => void
    removeFromCart: (id: number) => void
    clearCart: () => void
}

const CartContext = createContext<CartContextType | undefined>(undefined)

export function CartProvider({ children }: { children: React.ReactNode }) {
    const [cart, setCart] = useState<CartItem[]>([])

    const addToCart = (item: Omit<CartItem, 'quantity'>) => {
        setCart((prevCart) => {
            const existingItem = prevCart.find((cartItem) => cartItem.id === item.id)
            if (existingItem) {
                return prevCart.map((cartItem) =>
                    cartItem.id === item.id
                        ? { ...cartItem, quantity: cartItem.quantity + 1 }
                        : cartItem
                )
            }
            return [...prevCart, { ...item, quantity: 1 }]
        })
    }

    const removeFromCart = (id: number) => {
        setCart((prevCart) =>
            prevCart.reduce((acc, item) => {
                if (item.id === id) {
                    if (item.quantity > 1) {
                        acc.push({ ...item, quantity: item.quantity - 1 })
                    }
                } else {
                    acc.push(item)
                }
                return acc
            }, [] as CartItem[])
        )
    }

    const clearCart = () => {
        setCart([])
    }

    return (
        <CartContext.Provider value={{ cart, addToCart, removeFromCart, clearCart }}>
            {children}
        </CartContext.Provider>
    )
}

export const useCart = () => {
    const context = useContext(CartContext)
    if (context === undefined) {
        throw new Error('useCart must be used within a CartProvider')
    }
    return context
}
