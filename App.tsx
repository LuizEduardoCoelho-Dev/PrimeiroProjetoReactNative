import React, { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import MesarioInput from "./components/MesarioInput";

export default function UrnaEletronica() {
  const [votosA, setVotosA] = useState<number>(0);
  const [votosB, setVotosB] = useState<number>(0);
  const [votosC, setVotosC] = useState<number>(0);

  const totalVotos = votosA + votosB + votosC;

  function calcularPorcentagem(votosCandidato: number): string {
    if (totalVotos === 0) {
      return "0.0";
    }

    return ((votosCandidato / totalVotos) * 100).toFixed(1);
  }

  function zerarUrna(): void {
    setVotosA(0);
    setVotosB(0);
    setVotosC(0);
  }

  return (
    <View style={styles.container}>
      <MesarioInput />
      <Text style={styles.titulo}>Painel de Votacao</Text>

      <View style={styles.candidatoContainer}>
        <Text style={styles.nomeCandidato}>
          Candidato A: {votosA} votos ({calcularPorcentagem(votosA)}%)
        </Text>
        <TouchableOpacity
          style={styles.botaoVotar}
          onPress={() => setVotosA((prev) => prev + 1)}
        >
          <Text style={styles.textoBotao}>Votar em A</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.candidatoContainer}>
        <Text style={styles.nomeCandidato}>
          Candidato B: {votosB} votos ({calcularPorcentagem(votosB)}%)
        </Text>
        <TouchableOpacity
          style={styles.botaoVotar}
          onPress={() => setVotosB((prev) => prev + 1)}
        >
          <Text style={styles.textoBotao}>Votar em B</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.candidatoContainer}>
        <Text style={styles.nomeCandidato}>
          Candidato C: {votosC} votos ({calcularPorcentagem(votosC)}%)
        </Text>
        <TouchableOpacity
          style={styles.botaoVotar}
          onPress={() => setVotosC((prev) => prev + 1)}
        >
          <Text style={styles.textoBotao}>Votar em C</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.rodape}>
        <Text style={styles.totalTexto}>Total de Votos: {totalVotos}</Text>
        <TouchableOpacity style={styles.botaoZerar} onPress={zerarUrna}>
          <Text style={styles.textoBotao}>Zerar Urna</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#101418",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  titulo: {
    fontSize: 26,
    fontWeight: "bold",
    marginBottom: 24,
    color: "#E6EDF3",
  },
  candidatoContainer: {
    width: "100%",
    backgroundColor: "#1B2229",
    padding: 16,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: "#303942",
    marginBottom: 12,
    alignItems: "center",
  },
  nomeCandidato: {
    fontSize: 18,
    marginBottom: 10,
    color: "#D5DDE5",
  },
  botaoVotar: {
    backgroundColor: "#247B83",
    paddingVertical: 11,
    borderRadius: 4,
    width: "80%",
    alignItems: "center",
  },
  textoBotao: {
    color: "#F4F7F9",
    fontWeight: "bold",
  },
  rodape: {
    marginTop: 18,
    alignItems: "center",
    width: "100%",
    borderTopWidth: 1,
    borderColor: "#303942",
    paddingTop: 18,
  },
  totalTexto: {
    fontSize: 19,
    fontWeight: "bold",
    marginBottom: 15,
    color: "#E6EDF3",
  },
  botaoZerar: {
    backgroundColor: "#4B5560",
    paddingVertical: 12,
    paddingHorizontal: 22,
    borderRadius: 4,
  },
});