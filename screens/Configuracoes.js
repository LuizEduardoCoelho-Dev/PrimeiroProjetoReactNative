import React from "react";
import { StyleSheet, Text, View } from "react-native";

export default function Configuracoes() {
	return (
		<View style={styles.container}>
			<Text style={styles.titulo}>Configuracoes</Text>
		</View>
	);
}

const styles = StyleSheet.create({
	container: { flex: 1, justifyContent: "center", alignItems: "center" },
	titulo: { fontSize: 24, fontWeight: "bold" }
});
