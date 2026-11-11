import React, { useEffect, useState } from "react";
import {
  FlatList,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { useSQLiteContext } from "expo-sqlite";
import ItemTarefa from "./itemTarefa";
import { useTema } from "../contexts/TemaContext";

type Tarefa = {
  id: number;
  descricao: string;
  concluida: number;
};

export default function ListaTarefas() {
  const db = useSQLiteContext();
  const { tema } = useTema();
  const temaEscuro = tema === "escuro";
  const [tarefas, setTarefas] = useState<Tarefa[]>([]);
  const [novaTarefa, setNovaTarefa] = useState("");

  useEffect(() => {
    void carregarTarefas();
  }, [db]);

  const carregarTarefas = async (): Promise<void> => {
    try {
      const resultados = (await db.getAllAsync(
        "SELECT * FROM tarefas ORDER BY id DESC;"
      )) as Tarefa[];
      setTarefas(resultados);
    } catch (erro) {
      console.error("Falha ao ler tarefas", erro);
    }
  };

  const adicionarTarefa = async (): Promise<void> => {
    const texto = novaTarefa.trim();
    if (!texto) return;

    try {
      await db.runAsync(
        "INSERT INTO tarefas (descricao, concluida) VALUES (?, ?);",
        [texto, 0]
      );
      setNovaTarefa("");
      await carregarTarefas();
    } catch (erro) {
      console.error("Erro ao adicionar tarefa", erro);
    }
  };

  const alternarStatus = async (
    id: number,
    statusAtual: number
  ): Promise<void> => {
    try {
      await db.runAsync("UPDATE tarefas SET concluida = ? WHERE id = ?;", [
        statusAtual === 1 ? 0 : 1,
        id,
      ]);
      await carregarTarefas();
    } catch (erro) {
      console.error("Erro ao atualizar tarefa", erro);
    }
  };

  const removerTarefa = async (id: number): Promise<void> => {
    try {
      await db.runAsync("DELETE FROM tarefas WHERE id = ?;", [id]);
      await carregarTarefas();
    } catch (erro) {
      console.error("Erro ao remover tarefa", erro);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <TextInput
          style={[
            styles.input,
            temaEscuro && styles.inputEscuro,
          ]}
          placeholder="Nova tarefa..."
          placeholderTextColor={temaEscuro ? "#AAA" : "#666"}
          value={novaTarefa}
          onChangeText={setNovaTarefa}
          onSubmitEditing={() => void adicionarTarefa()}
          returnKeyType="done"
        />
        <TouchableOpacity
          style={styles.botaoAdd}
          onPress={() => void adicionarTarefa()}
        >
          <Text style={styles.textoBotao}>Add</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={tarefas}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <ItemTarefa
            tarefa={item}
            onToggle={() => void alternarStatus(item.id, item.concluida)}
            onDelete={() => void removerTarefa(item.id)}
          />
        )}
        ListEmptyComponent={
          <Text
            style={[
              styles.listaVazia,
              temaEscuro && styles.textoEscuro,
            ]}
          >
            Nenhuma tarefa cadastrada.
          </Text>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
  inputEscuro: {
    backgroundColor: "#252525",
    borderColor: "#555",
    color: "#FFF",
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
  textoEscuro: {
    color: "#CCC",
  },
});
