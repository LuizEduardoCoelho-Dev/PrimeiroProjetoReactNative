import React, { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

const combinacoesVencedoras = [
  [0, 1, 2], [3, 4, 5], [6, 7, 8],
  [0, 3, 6], [1, 4, 7], [2, 5, 8],
  [0, 4, 8], [2, 4, 6],
];

function verificarVencedor(tabuleiro) {
  for (const [primeiro, segundo, terceiro] of combinacoesVencedoras) {
    if (
      tabuleiro[primeiro] &&
      tabuleiro[primeiro] === tabuleiro[segundo] &&
      tabuleiro[primeiro] === tabuleiro[terceiro]
    ) {
      return tabuleiro[primeiro];
    }
  }
  return null;
}

export default function JogoDaVelha() {
  const [tabuleiro, setTabuleiro] = useState(Array(9).fill(null));
  const [jogador, setJogador] = useState("X");
  const vencedor = verificarVencedor(tabuleiro);
  const empate = !vencedor && tabuleiro.every(Boolean);

  function jogar(indice) {
    if (tabuleiro[indice] || vencedor) return;
    const novoTabuleiro = [...tabuleiro];
    novoTabuleiro[indice] = jogador;
    setTabuleiro(novoTabuleiro);
    setJogador(jogador === "X" ? "O" : "X");
  }

  function reiniciar() {
    setTabuleiro(Array(9).fill(null));
    setJogador("X");
  }

  return (
    <View style={styles.areaJogo}>
      <Text style={styles.titulo}>Jogo da velha</Text>
      <Text style={styles.status}>
        {vencedor ? `Vencedor: ${vencedor}` : empate ? "Empate" : `Vez: ${jogador}`}
      </Text>
      <View style={styles.tabuleiro}>
        {tabuleiro.map((valor, indice) => (
          <TouchableOpacity
            key={indice}
            style={styles.celula}
            activeOpacity={0.7}
            onPress={() => jogar(indice)}
          >
            <Text style={styles.valorCelula}>{valor}</Text>
          </TouchableOpacity>
        ))}
      </View>
      <TouchableOpacity style={styles.botaoReiniciar} onPress={reiniciar}>
        <Text style={styles.textoBotao}>Reiniciar</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  areaJogo: {
    width: "100%",
    maxWidth: 380,
    alignItems: "center",
    marginTop: 8,
    marginBottom: 20,
    padding: 20,
    borderRadius: 15,
    backgroundColor: "#FFFFFF",
  },
  titulo: { color: "#14325A", fontSize: 24, fontWeight: "bold" },
  status: { marginVertical: 12, color: "#505050", fontSize: 17, fontWeight: "600" },
  tabuleiro: { width: 270, height: 270, flexDirection: "row", flexWrap: "wrap" },
  celula: {
    width: "33.3333%",
    height: "33.3333%",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "#14325A",
  },
  valorCelula: { color: "#0064A0", fontSize: 38, fontWeight: "bold" },
  botaoReiniciar: {
    marginTop: 18,
    paddingVertical: 10,
    paddingHorizontal: 24,
    borderRadius: 8,
    backgroundColor: "#14325A",
  },
  textoBotao: { color: "#FFFFFF", fontSize: 16, fontWeight: "bold" },
});