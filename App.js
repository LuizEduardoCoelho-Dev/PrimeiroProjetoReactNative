import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  ActivityIndicator,
  TextInput,
  Button,
  Alert,
  RefreshControl,
} from "react-native";
import api from "./src/services/api";

export default function App() {
  const [utilizadores, setUtilizadores] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [mostrarFormulario, setMostrarFormulario] = useState(false);
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");

  const buscarDados = async () => {
    try {
      const resposta = await api.get("/users");
      setUtilizadores(resposta.data);
    } catch (erro) {
      console.log("Erro ao buscar dados:", erro.message);
      Alert.alert("Erro", "Não foi possível carregar os utilizadores.");
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    buscarDados();
  }, []);

  const onRefresh = async () => {
    setRefreshing(true);
    await buscarDados();
  };

  const salvarUsuario = async () => {
    if (!nome.trim() || !email.trim()) {
      Alert.alert("Campos obrigatórios", "Preencha nome e email.");
      return;
    }

    const payload = {
      name: nome.trim(),
      email: email.trim(),
      body: `Nome: ${nome.trim()}`,
    };

    try {
      const resposta = await api.post("/users", payload);
      const novoUsuario = resposta.data;

      setUtilizadores((usuariosAnteriores) => [
        { ...novoUsuario, name: novoUsuario.name || nome.trim() },
        ...usuariosAnteriores,
      ]);
      setNome("");
      setEmail("");
      setMostrarFormulario(false);
      setLoading(false);
      Alert.alert("Sucesso", `Usuário "${novoUsuario.name || nome.trim()}" criado com sucesso.`);
    } catch (erro) {
      console.log("Erro ao criar utilizador:", erro.message);
      if (erro.response) {
        console.log("Detalhes do erro:", erro.response.status, erro.response.data);
      }
      Alert.alert("Erro", "Não foi possível criar o utilizador.");
    }
  };

  if (loading) {
    return (
      <View style={styles.centro}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text>A carregar utilizadores...</Text>
      </View>
    );
  }

  if (mostrarFormulario) {
    return (
      <View style={styles.containerFormulario}>
        <Text style={styles.titulo}>Novo Utilizador</Text>

        <TextInput
          style={styles.input}
          placeholder="Nome"
          value={nome}
          onChangeText={setNome}
        />

        <TextInput
          style={styles.input}
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />

        <View style={styles.botoesRow}>
          <Button title="Cancelar" onPress={() => setMostrarFormulario(false)} />
          <Button title="Salvar" onPress={salvarUsuario} />
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.headerRow}>
        <Text style={styles.titulo}>Lista de Utilizadores</Text>
        <Button title="Novo" onPress={() => setMostrarFormulario(true)} />
      </View>

      <FlatList
        data={utilizadores}
        keyExtractor={(item) => (item.id ? item.id.toString() : item.email)}
        renderItem={({ item }) => (
          <View style={styles.cartao}>
            <Text style={styles.nome}>{item.name}</Text>
            <Text style={styles.email}>{item.email}</Text>
          </View>
        )}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        contentContainerStyle={styles.listContent}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F5F5",
    paddingTop: 50,
    paddingHorizontal: 20,
  },
  containerFormulario: {
    flex: 1,
    backgroundColor: "#F5F5F5",
    paddingTop: 50,
    paddingHorizontal: 20,
    justifyContent: "center",
  },
  centro: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  headerRow: {
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
  listContent: {
    paddingBottom: 20,
  },
  cartao: {
    backgroundColor: "#FFF",
    padding: 15,
    marginBottom: 10,
    borderRadius: 8,
    elevation: 2,
  },
  nome: {
    fontSize: 18,
    fontWeight: "bold",
  },
  email: {
    color: "#666",
    marginTop: 5,
  },
  input: {
    backgroundColor: "#FFF",
    borderWidth: 1,
    borderColor: "#D9D9D9",
    borderRadius: 8,
    padding: 12,
    marginBottom: 15,
  },
  botoesRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 12,
  },
});