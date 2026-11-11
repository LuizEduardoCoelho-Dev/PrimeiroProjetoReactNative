import React from "react";
import { AuthProvider } from "./contexts/AuthContext";
import Rotas from "./routes";

export default function App() {
    return (
        <AuthProvider>
            <Rotas/>
        </AuthProvider>
    )
}