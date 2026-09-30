import React from "react"
import {View , Text , StyleSheet, TouchableOpacity} from "react-native"

export default function DetalhesUsuario({navigation, route}) {
    const {nomeUsuario} = route.params;

    return (
        <View style={styles.container}>
            <Text style={styles.titulo}>
                Detalhes do Perfil
            </Text>
            <Text style={styles.texto}>
                Bem-vindo, {nomeUsuario}!
            </Text>
            <TouchableOpacity
                style={styles.botao}
                activeOpacity={0.7}
                onPress={() => navigation.goBack()}
            >
                <Text style={styles.textoBotao}>Voltar</Text>
            </TouchableOpacity>
        </View>
    )

}

const styles = StyleSheet.create({
    container: { flex: 1, justifyContent: "center", alignItems: "center" },
    titulo: { fontSize: 24, fontWeight: "bold", marginBottom: 10 },
    texto: { fontSize: 18, color: "#555" },
    botao: { marginTop: 20, paddingVertical: 10, paddingHorizontal: 18, backgroundColor: "#333", borderRadius: 4 },
    textoBotao: { color: "#fff", fontSize: 16, fontWeight: "600" }
})