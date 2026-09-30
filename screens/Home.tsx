import React from "react";
import { Button, StyleSheet, Text, View } from "react-native";
import type { HomeScreenProps } from "../routes/types";

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center" },
  titulo: { fontSize: 24, fontWeight: "bold", marginBottom: 20 },
});

export default function Home({ navigation }: HomeScreenProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Tela Inicial</Text>
      <Button
        title="Ver Perfil do Usuario"
        onPress={() =>
          navigation.navigate("Detalhes", { nomeUsuario: "Turma INF204" })
        }
      />
    </View>
  );
}