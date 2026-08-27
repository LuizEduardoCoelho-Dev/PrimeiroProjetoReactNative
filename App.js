import React, { useState } from "react";
import { StyleSheet, Text, View, Button, TextInput } from "react-native";
import ItemTarefa from "./components/itemTarefa";

export default function App() {
  // Array de tarefas agora é um estado
  const [tarefas, setTarefas] = useState([
    { id: 1, descricao: "Estudar ES6+", concluida: true },
    { id: 2, descricao: "Configurar ambiente Expo", concluida: true },
    { id: 3, descricao: "Entender o funcionamento do JSX", concluida: false },
    { id: 4, descricao: "Finalizar Roteiro de Pratica 02", concluida: false },
  ]);

  // Controla se a caixa de texto está aparecendo
  const [mostrarInput, setMostrarInput] = useState(false);
  // Guarda o texto que o usuário está digitando
  const [novaDescricao, setNovaDescricao] = useState("");

  // Filtra apenas as tarefas pendentes
  const tarefasPendentes = tarefas.filter(
    (tarefa) => !tarefa.concluida
  );

  function abrirInput() {
    setMostrarInput(true);
  }

  function confirmarNovaTarefa() {
    // Evita adicionar tarefa vazia
    if (novaDescricao.trim() === "") {
      setMostrarInput(false);
      return;
    }

    const novaTarefa = {
      id: tarefas.length + 1,
      descricao: novaDescricao,
      concluida: false,
    };

    setTarefas([...tarefas, novaTarefa]);
    setNovaDescricao(""); // limpa o campo
    setMostrarInput(false); // fecha o input
  }

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Lista de Tarefas</Text>

      {/* Botão para abrir o input, só aparece se o input estiver fechado */}
      {!mostrarInput && (
        <Button title="Adicionar Tarefa" onPress={abrirInput} />
      )}

      {/* Caixa de texto + botão de confirmar, só aparece quando mostrarInput é true */}
      {mostrarInput && (
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Digite a nova tarefa..."
            value={novaDescricao}
            onChangeText={setNovaDescricao}
            autoFocus
          />
          <Button title="Confirmar" onPress={confirmarNovaTarefa} />
        </View>
      )}

      {/* Lista principal */}
      {tarefas.map((tarefa) => (
        <ItemTarefa key={tarefa.id} tarefa={tarefa} />
      ))}

      {/* Lista de tarefas pendentes */}
      <Text style={styles.subtitulo}>Tarefas Pendentes</Text>
      {tarefasPendentes.map((tarefa) => (
        <ItemTarefa key={tarefa.id} tarefa={tarefa} />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
    paddingTop: 50,
    paddingHorizontal: 20,
  },
  titulo: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#20325a",
  },
  subtitulo: {
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 20,
    marginBottom: 10,
    color: "#20325a",
  },
  inputContainer: {
    marginBottom: 20,
  },
  input: {
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 10,
    marginBottom: 10,
  },
});