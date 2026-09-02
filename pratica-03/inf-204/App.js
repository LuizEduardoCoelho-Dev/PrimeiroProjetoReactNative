import React, { useState } from "react";
import {
  Alert,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import JogoDaVelha from "./JogoDaVelha";

const perfis = [
  {
    nome: "Joao Vitor",
    profissao: "Engenheiro de Software",
    imagem: "https://i.pravatar.cc/240?img=12",
  },
  {
    nome: "Ana Clara",
    profissao: "Product Designer",
    imagem: "https://i.pravatar.cc/240?img=47",
  },
  {
    nome: "Carlos Eduardo",
    profissao: "Desenvolvedor Mobile",
    imagem: "https://i.pravatar.cc/240?img=68",
  },
];

function CartaoPerfil({ perfil, permiteEditar }) {
  const [nome, setNome] = useState(perfil.nome);
  const [seguindo, setSeguindo] = useState(false);

  function alternarSeguimento() {
    if (!seguindo) {
      Alert.alert("Perfil seguido", `Seguindo ${nome}`);
    }
    setSeguindo((estadoAtual) => !estadoAtual);
  }

  return (
    <View style={styles.cartao}>
      <Image source={{ uri: perfil.imagem }} style={styles.avatar} />
      <Text style={styles.nomeUsuario}>{nome}</Text>
      <Text style={styles.profissao}>{perfil.profissao}</Text>
      <TouchableOpacity
        style={[styles.botao, seguindo && styles.botaoDesativado]}
        activeOpacity={0.7}
        onPress={alternarSeguimento}
      >
        <Text style={styles.textoBotao}>
          {seguindo ? "Ja seguindo" : "Seguir"}
        </Text>
      </TouchableOpacity>
      {permiteEditar && (
        <TextInput
          style={styles.input}
          placeholder="Alterar nome..."
          value={nome}
          onChangeText={setNome}
          maxLength={32}
        />
      )}
    </View>
  );
}

export default function App() {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.titulo}>Cartoes de perfil</Text>
      {perfis.map((perfil, indice) => (
        <CartaoPerfil
          key={perfil.nome}
          perfil={perfil}
          permiteEditar={indice === 0}
        />
      ))}
      <JogoDaVelha />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    alignItems: "center",
    padding: 20,
    backgroundColor: "#F5F5F5",
  },
  titulo: {
    marginBottom: 16,
    color: "#14325A",
    fontSize: 26,
    fontWeight: "bold",
  },
  cartao: {
    width: "100%",
    maxWidth: 380,
    alignItems: "center",
    marginBottom: 18,
    padding: 30,
    borderRadius: 15,
    backgroundColor: "#FFFFFF",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 15,
  },
  nomeUsuario: {
    color: "#14325A",
    fontSize: 22,
    fontWeight: "bold",
    textAlign: "center",
  },
  profissao: {
    marginBottom: 20,
    color: "#505050",
    fontSize: 16,
  },
  botao: {
    marginBottom: 20,
    paddingVertical: 10,
    paddingHorizontal: 30,
    borderRadius: 8,
    backgroundColor: "#0064A0",
  },
  botaoDesativado: {
    backgroundColor: "#8A8A8A",
  },
  textoBotao: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "bold",
  },
  input: {
    width: "100%",
    padding: 10,
    borderWidth: 1,
    borderColor: "#CCCCCC",
    borderRadius: 8,
    textAlign: "center",
  },
});