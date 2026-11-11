import React, { createContext, useContext, useState } from "react";

export const TemaContext = createContext(null);

export function ThemeProvider({ children }) {
  const [tema, setTema] = useState("claro");

  function alternarTema() {
    setTema((temaAtual) => (temaAtual === "claro" ? "escuro" : "claro"));
  }

  return (
    <TemaContext.Provider value={{ tema, alternarTema }}>
      {children}
    </TemaContext.Provider>
  );
}

export function useTema() {
  const context = useContext(TemaContext);

  if (!context) {
    throw new Error("useTema deve ser usado dentro de um ThemeProvider");
  }

  return context;
}
