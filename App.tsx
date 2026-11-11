import React from "react";
import { SQLiteDatabase, SQLiteProvider } from "expo-sqlite";
import { AuthProvider } from "./contexts/AuthContext";
import { ThemeProvider } from "./contexts/TemaContext";
import Rotas from "./routes";

const iniciarBanco = async (db: SQLiteDatabase) => {
  await db.execAsync("PRAGMA journal_mode = WAL;");
  await db.execAsync(`
    CREATE TABLE IF NOT EXISTS tarefas (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      descricao TEXT NOT NULL,
      concluida INTEGER DEFAULT 0
    );
  `);
};

export default function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <SQLiteProvider databaseName="app-database.db" onInit={iniciarBanco}>
          <Rotas />
        </SQLiteProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}
