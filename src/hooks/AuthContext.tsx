"use client"

import { loginUser, registerUser } from "@/lib/api"
import React, { createContext, useContext, useState, type ReactNode } from "react"
import { useNavigate } from "react-router-dom"
interface AuthContextType {
    isAuthenticated: boolean
    login: (username: string, password: string) => void
    register: (user: any) => void
    logout: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
    const [isAuthenticated, setIsAuthenticated] = useState(localStorage.getItem("user_id") !== null)
    const navigate = useNavigate()

    const login = async (email: string, password: string) => {
        try {
            const response = await loginUser(email, password)
            localStorage.setItem("user_id", response.id)
            setIsAuthenticated(true)
            navigate("/")
        } catch (error) {
            console.error(error)
            throw new Error("Failed to login")
        }
    }
    const register = async (user: any) => {
        try {
            await registerUser(user)
            navigate("/login")
        } catch (error) {
            console.error(error)
            throw new Error("Failed to register user")
        }
    }

    const logout = () => {
        localStorage.removeItem("user_id")
        setIsAuthenticated(false)
    }

    return <AuthContext.Provider value={{ isAuthenticated, login, register, logout }}>{children}</AuthContext.Provider>
}

export function useAuth() {
    const context = useContext(AuthContext)
    if (context === undefined) {
        throw new Error("useAuth must be used within an AuthProvider")
    }
    return context
}

