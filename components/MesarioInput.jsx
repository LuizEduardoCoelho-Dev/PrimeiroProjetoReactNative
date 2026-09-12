import React, { useState } from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";

export default function MesarioInput() {
  const [nomeMesario, setNomeMesario] = useState("");

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Nome do mesário</Text>
      <TextInput
        style={styles.input}
        value={nomeMesario}
        onChangeText={setNomeMesario}
        placeholder="Digite o nome"
        placeholderTextColor="#8B98A5"
      />
      <Text style={styles.mesarioAtual}>
        Mesário atual: {nomeMesario || "Não informado"}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    marginBottom: 20,
  },
  label: {
    color: "#AAB7C4",
    fontSize: 14,
    marginBottom: 6,
  },
  input: {
    backgroundColor: "#1B2229",
    borderWidth: 1,
    borderColor: "#3C4A56",
    borderRadius: 4,
    color: "#F4F7F9",
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 16,
  },
  mesarioAtual: {
    color: "#D5DDE5",
    fontSize: 15,
    marginTop: 8,
  },
});