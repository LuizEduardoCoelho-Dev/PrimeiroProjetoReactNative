import React, { useState } from "react";
import {
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
} from "react-native";

export default function App() {
  const [contagem, setContagem] = useState(0);

  return (
    <View style={styles.container}>
      <Text style={styles.texto}>Olá, Turma de INF204!</Text>

      <Text style={styles.titulo}>CONTADOR</Text>

      <View style={styles.numeroContainer}>
        <Text style={styles.numero}>{contagem}</Text>
      </View>

      <TouchableOpacity
        style={[styles.botao, styles.botaoVerde]}
        onPress={() => setContagem(contagem + 1)}
        activeOpacity={0.7}
      >
        <Text style={styles.textoBotao}>＋ Incrementar</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.botao, styles.botaoVermelho]}
        onPress={() => setContagem(contagem - 1)}
        activeOpacity={0.7}
      >
        <Text style={styles.textoBotao}>－ Decrementar</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.botao, styles.botaoAzul]}
        onPress={() => setContagem(0)}
        activeOpacity={0.7}
      >
        <Text style={styles.textoBotao}>↻ Zerar contagem</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#e0f7fa",
    padding: 20,
  },

  texto: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#00695c",
    marginBottom: 30,
  },

  titulo: {
    fontSize: 20,
    fontWeight: "600",
    color: "#333",
    marginBottom: 10,
  },

  numeroContainer: {
    width: 140,
    height: 140,
    borderRadius: 70,
    backgroundColor: "#ffffff",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 30,

    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 6,
  },

  numero: {
    fontSize: 52,
    fontWeight: "bold",
    color: "#4caf50",
  },

  botao: {
    width: 230,
    paddingVertical: 15,
    borderRadius: 15,
    marginVertical: 7,
    alignItems: "center",

    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
  },

  botaoVerde: {
    backgroundColor: "#43a047",
  },

  botaoVermelho: {
    backgroundColor: "#e53935",
  },

  botaoAzul: {
    backgroundColor: "#1e88e5",
  },

  textoBotao: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
});