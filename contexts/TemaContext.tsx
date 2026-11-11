import React, {
  createContext,
  PropsWithChildren,
  useContext,
  useState,
} from "react";

export type Tema = "claro" | "escuro";

type TemaContextValue = {
  tema: Tema;
  alternarTema: () => void;
};

export const TemaContext = createContext<TemaContextValue | undefined>(
  undefined
);

export function ThemeProvider({ children }: PropsWithChildren) {
  const [tema, setTema] = useState<Tema>("claro");

  function alternarTema() {
    setTema((temaAtual) => (temaAtual === "claro" ? "escuro" : "claro"));
  }

  return (
    <TemaContext.Provider value={{ tema, alternarTema }}>
      {children}
    </TemaContext.Provider>
  );
}

export function useTema(): TemaContextValue {
  const context = useContext(TemaContext);

  if (!context) {
    throw new Error("useTema deve ser usado dentro de um ThemeProvider");
  }

  return context;
}
