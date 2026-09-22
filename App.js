import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";

const contatosIniciais = [
  { id: "1", nome: "Alice Silva", telefone: "(31) 99999-1111" },
  { id: "2", nome: "Bruno Costa", telefone: "(31) 98888-2222" },
  { id: "3", nome: "Carlos Souza", telefone: "(31) 97777-3333" },
  { id: "4", nome: "Diana Rocha", telefone: "(31) 96666-4444" },
  { id: "5", nome: "Eduardo Lima", telefone: "(31) 95555-5555" },
  { id: "6", nome: "Fernanda Alves", telefone: "(31) 94444-6666" },
  { id: "7", nome: "Gabriel Mendes", telefone: "(31) 93333-7777" },
  { id: "8", nome: "Helena Nunes", telefone: "(31) 92222-8888" },
  { id: "9", nome: "Igor Prado", telefone: "(31) 91111-9999" },
  { id: "10", nome: "Julia Pires", telefone: "(31) 90000-1010" },
  { id: "11", nome: "Kaio Martins", telefone: "(31) 98877-1212" },
  { id: "12", nome: "Larissa Teixeira", telefone: "(31) 97766-1313" },
  { id: "13", nome: "Mateus Araujo", telefone: "(31) 96655-1414" },
  { id: "14", nome: "Nadia Campos", telefone: "(31) 95544-1515" },
  { id: "15", nome: "Otavio Rocha", telefone: "(31) 94433-1616" },
];

export default function agenda() {
  const [contatos, setContatos] = useState(contatosIniciais);
  const [carregando, setCarregando] = useState(false);

  const atualizarContatos = () => {
    setCarregando(true);

    setTimeout(() => {
      setContatos(contatosIniciais);
      setCarregando(false);
    }, 2000);
  };

  const renderContato = ({ item }) => (
    <View style={styles.cardContato}>
      <Text style={styles.nomeContato}>{item.nome}</Text>
      <Text style={styles.telefoneContato}>{item.telefone}</Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.cabecalho}>
        <Text style={styles.titulo}>Minha Agenda</Text>

        <TouchableOpacity style={styles.botaoLimpar} onPress={() => setContatos([])}>
          <Text style={styles.textoBotao}>Limpar Tudo</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={contatos}
        keyExtractor={(item) => item.id}
        renderItem={renderContato}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.lista}
        refreshing={carregando}
        onRefresh={atualizarContatos}
        ListEmptyComponent={
          <View style={styles.vazioContainer}>
            <Text style={styles.vazioTitulo}>Agenda vazia</Text>
            <Text style={styles.vazioTexto}>
              A lista foi limpa. Puxe para baixo ou toque abaixo para restaurar os contatos iniciais.
            </Text>

            <TouchableOpacity
              style={styles.botaoResetar}
              onPress={atualizarContatos}
            >
              <Text style={styles.textoBotao}>Recarregar contatos</Text>
            </TouchableOpacity>
          </View>
        }
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f7ff",
  },
  cabecalho: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingTop: 24,
    paddingBottom: 16,
    backgroundColor: "#4f46e5",
  },
  titulo: {
    color: "#fff",
    fontSize: 26,
    fontWeight: "700",
  },
  botaoLimpar: {
    backgroundColor: "#fff",
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 10,
  },
  botaoResetar: {
      color: "#fff",
    backgroundColor: "#4f46e5",
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 10,
    marginTop: 14,
  },
  textoBotao: {
    color: "#1f2937",
    fontWeight: "700",
  },
  lista: {
    padding: 16,
  },
  cardContato: {
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 2,
  },
  nomeContato: {
    color: "#111827",
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 4,
  },
  telefoneContato: {
    color: "#4b5563",
    fontSize: 15,
  },
  vazioContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 24,
  },
  vazioTitulo: {
    color: "#111827",
    fontSize: 24,
    fontWeight: "700",
    marginBottom: 8,
  },
  vazioTexto: {
    color: "#4b5563",
    fontSize: 16,
    textAlign: "center",
    marginBottom: 8,
  },
});
