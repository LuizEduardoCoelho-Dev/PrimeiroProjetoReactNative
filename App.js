import React, { useEffect, useState } from "react";
import {
  FlatList,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { SQLiteProvider, useSQLiteContext } from "expo-sqlite";
import ItemTarefa from "./components/itemTarefa";

const CHAVE_USUARIO = "@AppTarefas:Usuario";

const iniciarBanco = async (db) => {
  await db.execAsync("PRAGMA journal_mode = WAL;");
  await db.execAsync(`
    CREATE TABLE IF NOT EXISTS tarefas (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      descricao TEXT NOT NULL,
      concluida INTEGER DEFAULT 0
    );
  `);

  console.log("Base de Dados inicializada!");
};

export default function App() {
  return (
    <View style={styles.app}>
      <SQLiteProvider databaseName="app-database.db" onInit={iniciarBanco}>
        <EcraPrincipal />
      </SQLiteProvider>
    </View>
  );
}

function EcraPrincipal() {
  const db = useSQLiteContext();
  const [usuario, setUsuario] = useState({ nome: "Visitante", logado: true });
  const [tarefas, setTarefas] = useState([]);
  const [novaTarefa, setNovaTarefa] = useState("");
  const [novoNome, setNovoNome] = useState("Visitante");

  useEffect(() => {
    carregarPreferencias();
    carregarTarefas();
  }, []);

  useEffect(() => {
    setNovoNome(usuario.nome);
  }, [usuario.nome]);

  const carregarPreferencias = async () => {
    try {
      const valorSalvo = await AsyncStorage.getItem(CHAVE_USUARIO);

      if (valorSalvo) {
        const perfil = JSON.parse(valorSalvo);
        setUsuario({
          nome: perfil.nome ?? "Visitante",
          logado: typeof perfil.logado === "boolean" ? perfil.logado : true,
        });
      }
    } catch (erro) {
      console.error("Falha ao carregar usuário", erro);
    }
  };

  const salvarPreferencias = async (perfil) => {
    await AsyncStorage.setItem(CHAVE_USUARIO, JSON.stringify(perfil));
    setUsuario(perfil);
  };

  const salvarNome = async () => {
    const nomeFinal = (novoNome || "Visitante").trim() || "Visitante";
    const perfilAtualizado = { ...usuario, nome: nomeFinal };
    await salvarPreferencias(perfilAtualizado);
  };

  const carregarTarefas = async () => {
    try {
      const resultados = await db.getAllAsync(
        "SELECT * FROM tarefas ORDER BY id DESC;"
      );
      setTarefas(resultados);
    } catch (erro) {
      console.error("Falha ao ler dados", erro);
    }
  };

  const adicionarTarefa = async () => {
    const texto = novaTarefa.trim();
    if (!texto) return;

    try {
      await db.runAsync("INSERT INTO tarefas (descricao, concluida) VALUES (?, ?);", [
        texto,
        0,
      ]);
      setNovaTarefa("");
      await carregarTarefas();
    } catch (erro) {
      console.error("Erro no insert", erro);
    }
  };

  const alternarStatus = async (id, statusAtual) => {
    const novoStatus = statusAtual === 1 ? 0 : 1;
    await db.runAsync("UPDATE tarefas SET concluida = ? WHERE id = ?;", [
      novoStatus,
      id,
    ]);
    await carregarTarefas();
  };

  const removerTarefa = async (id) => {
    await db.runAsync("DELETE FROM tarefas WHERE id = ?;", [id]);
    await carregarTarefas();
  };

  return (
    <View style={styles.container}>
      <View style={styles.cabecalho}>
        <Text style={styles.titulo}>Olá, {usuario.nome}!</Text>
      </View>

      <View style={styles.inputNomeContainer}>
        <TextInput
          style={styles.inputNome}
          placeholder="Digite seu nome"
          value={novoNome}
          onChangeText={setNovoNome}
        />
        <TouchableOpacity style={styles.botaoAcao} onPress={salvarNome}>
          <Text style={styles.textoBotao}>Salvar</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Nova tarefa..."
          value={novaTarefa}
          onChangeText={setNovaTarefa}
        />
        <TouchableOpacity style={styles.botaoAdd} onPress={adicionarTarefa}>
          <Text style={styles.textoBotao}>Add</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={tarefas}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <ItemTarefa
            tarefa={item}
            onToggle={() => alternarStatus(item.id, item.concluida)}
            onDelete={() => removerTarefa(item.id)}
          />
        )}
        ListEmptyComponent={
          <Text style={styles.listaVazia}>Nenhuma tarefa cadastrada.</Text>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  app: {
    flex: 1,
    backgroundColor: "#F5F5F5",
  },
  container: {
    flex: 1,
    backgroundColor: "#F5F5F5",
    paddingTop: 50,
    paddingHorizontal: 20,
  },
  cabecalho: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  titulo: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#14325A",
  },
  botaoAcao: {
    backgroundColor: "#808080",
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderRadius: 8,
  },
  inputNomeContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    marginBottom: 20,
  },
  inputNome: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#D0D5DD",
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    backgroundColor: "#FFF",
  },
  inputContainer: {
    flexDirection: "row",
    marginBottom: 20,
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#CCC",
    borderRadius: 8,
    padding: 10,
    backgroundColor: "#FFF",
  },
  botaoAdd: {
    backgroundColor: "#0064A0",
    padding: 15,
    borderRadius: 8,
    marginLeft: 10,
    justifyContent: "center",
  },
  textoBotao: {
    color: "#FFF",
    fontWeight: "bold",
  },
  listaVazia: {
    color: "#666",
    textAlign: "center",
    marginTop: 20,
    fontSize: 16,
  },
});