import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

type Tarefa = {
  id: number;
  descricao: string;
  concluida: number;
};

type ItemTarefaProps = {
  tarefa: Tarefa;
  onToggle: () => void;
  onDelete: () => void;
};

export default function ItemTarefa({ tarefa, onToggle, onDelete }: ItemTarefaProps) {
  return (
    <View style={styles.card}>
      <TouchableOpacity style={styles.conteudo} onPress={onToggle} activeOpacity={0.8}>
        <Text style={[styles.textoTarefa, tarefa.concluida === 1 && styles.textoConcluido]}>
          {tarefa.concluida === 1 ? "[OK]" : "[PENDENTE]"} {tarefa.descricao}
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.botaoExcluir}
        onPress={onDelete}
        hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
      >
        <Text style={styles.textoExcluir}>X</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#ffffff",
    paddingHorizontal: 15,
    paddingVertical: 12,
    borderRadius: 8,
    marginBottom: 10,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  conteudo: {
    flex: 1,
    marginRight: 10,
  },
  textoTarefa: {
    fontSize: 16,
    color: "#333",
  },
  textoConcluido: {
    textDecorationLine: "line-through",
    color: "#999",
  },
  botaoExcluir: {
    backgroundColor: "#D9534F",
    borderRadius: 6,
    width: 28,
    height: 28,
    alignItems: "center",
    justifyContent: "center",
  },
  textoExcluir: {
    color: "#FFF",
    fontWeight: "bold",
    fontSize: 16,
  },
});