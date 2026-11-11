import React, {
  createContext,
  PropsWithChildren,
  useEffect,
  useState,
} from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

const CHAVE_USUARIO = "@Auth:Usuario";

export type Usuario = {
  id: string;
  nome: string;
  email: string;
};

type AuthContextValue = {
  logado: boolean;
  carregando: boolean;
  usuario: Usuario | null;
  signIn: (email: string, senha: string) => Promise<void>;
  signOut: () => Promise<void>;
  atualizarNome: (nome: string) => Promise<void>;
};

export const AuthContext = createContext<AuthContextValue | undefined>(
  undefined
);

export function AuthProvider({ children }: PropsWithChildren) {
  const [usuario, setUsuario] = useState<Usuario | null>(null);
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    let ativo = true;

    async function carregarUsuario() {
      try {
        const usuarioSalvo = await AsyncStorage.getItem(CHAVE_USUARIO);

        if (usuarioSalvo) {
          const usuarioCarregado: unknown = JSON.parse(usuarioSalvo);
          if (!ehUsuario(usuarioCarregado)) {
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

    void carregarUsuario();

    return () => {
      ativo = false;
    };
  }, []);

  async function signIn(email: string, _senha: string): Promise<void> {
    const respostaAPI: Usuario = {
      id: "123",
      nome: "Turma INF204",
      email,
    };

    await AsyncStorage.setItem(CHAVE_USUARIO, JSON.stringify(respostaAPI));
    setUsuario(respostaAPI);
  }

  async function signOut(): Promise<void> {
    await AsyncStorage.removeItem(CHAVE_USUARIO);
    setUsuario(null);
  }

  async function atualizarNome(nome: string): Promise<void> {
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
        logado: usuario !== null,
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

function ehUsuario(valor: unknown): valor is Usuario {
  if (typeof valor !== "object" || valor === null) {
    return false;
  }

  const usuario = valor as Record<string, unknown>;
  return (
    typeof usuario.id === "string" &&
    typeof usuario.nome === "string" &&
    typeof usuario.email === "string"
  );
}
