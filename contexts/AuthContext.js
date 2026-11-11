import React, { createContext, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

const CHAVE_USUARIO = "@Auth:Usuario";

export const AuthContext = createContext(null);

export function AuthProvider({ children }) {
    const [usuario, setUsuario] = useState(null);
    const [carregando, setCarregando] = useState(true);

    useEffect(() => {
        let ativo = true;

        async function carregarUsuario() {
            try {
                const usuarioSalvo = await AsyncStorage.getItem(CHAVE_USUARIO);

                if (usuarioSalvo) {
                    const usuarioCarregado = JSON.parse(usuarioSalvo);

                    if (
                        !usuarioCarregado ||
                        typeof usuarioCarregado.id !== "string" ||
                        typeof usuarioCarregado.nome !== "string" ||
                        typeof usuarioCarregado.email !== "string"
                    ) {
                        throw new Error("Dados de usuário salvos são inválidos");
                    }

                    if (ativo) {
                        setUsuario(usuarioCarregado);
                    }
                }
            } catch (erro) {
                console.error("Falha ao carregar sessão do usuário", erro);
            } finally {
                if (ativo) {
                    setCarregando(false);
                }
            }
        }

        carregarUsuario();

        return () => {
            ativo = false;
        };
    }, []);

    async function signIn(email, senha) {
        // Aqui ocorrerá uma chamada de API (axios.post).
        const respostaAPI = {
            id: "123",
            nome: "Turma INF204",
            email,
        };

        await AsyncStorage.setItem(CHAVE_USUARIO, JSON.stringify(respostaAPI));
        setUsuario(respostaAPI);
    }

    async function signOut() {
        await AsyncStorage.removeItem(CHAVE_USUARIO);
        setUsuario(null);
    }

    async function atualizarNome(nome) {
        if (!usuario) {
            throw new Error("Não há usuário autenticado para atualizar");
        }

        const usuarioAtualizado = { ...usuario, nome };
        await AsyncStorage.setItem(
            CHAVE_USUARIO,
            JSON.stringify(usuarioAtualizado)
        );
        setUsuario(usuarioAtualizado);
    }

    return (
        <AuthContext.Provider
            value={{
                logado: !!usuario,
                carregando,
                usuario,
                signIn,
                signOut,
                atualizarNome,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}
