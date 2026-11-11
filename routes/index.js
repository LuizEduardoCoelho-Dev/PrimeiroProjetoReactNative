import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import {
    ActivityIndicator,
    Alert,
    Button,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";
import { useEffect, useState } from "react";
import { useAuth } from "../hooks/useAuth";
import { useTema } from "../contexts/TemaContext";
import ListaTarefas from "../components/ListaTarefas";

const Stack = createNativeStackNavigator();

function TelaLogin() {
    const { signIn } = useAuth();

    async function entrar() {
        try {
            await signIn("teste@email.com", "123");
        } catch (erro) {
            console.error("Falha ao entrar", erro);
            Alert.alert("Não foi possível entrar", "Tente novamente.");
        }
    }

    return (
        <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
            <Text style={{ fontSize: 24, marginBottom: 20 }}>Área Restrita</Text>
            <Button title="Entrar no Sistema" onPress={() => void entrar()} />
        </View>
    );
}

function TelaDashboard() {
    const { usuario, signOut, atualizarNome } = useAuth();
    const { tema, alternarTema } = useTema();
    const temaEscuro = tema === "escuro";
    const [nome, setNome] = useState(usuario?.nome ?? "");

    useEffect(() => {
        setNome(usuario?.nome ?? "");
    }, [usuario?.nome]);

    async function salvarNome() {
        const nomeFinal = nome.trim() || "Visitante";

        try {
            await atualizarNome(nomeFinal);
        } catch (erro) {
            console.error("Falha ao salvar nome do usuário", erro);
            Alert.alert("Não foi possível salvar", "Tente novamente.");
        }
    }

    async function sair() {
        try {
            await signOut();
        } catch (erro) {
            console.error("Falha ao encerrar sessão", erro);
            Alert.alert("Não foi possível sair", "Tente novamente.");
        }
    }

    return (
        <View
            style={{
                flex: 1,
                paddingTop: 50,
                paddingHorizontal: 20,
                backgroundColor: temaEscuro ? "#121212" : "#FFFFFF",
            }}
        >
            <View style={{ flexDirection: "row", alignItems: "center", marginBottom: 16 }}>
                <Text
                    style={{
                        flex: 1,
                        fontSize: 24,
                        fontWeight: "bold",
                        color: temaEscuro ? "#FFFFFF" : "#14325A",
                    }}
                >
                    Olá, {usuario?.nome}!
                </Text>
                <TouchableOpacity
                    style={{
                        backgroundColor: "#0064A0",
                        paddingHorizontal: 12,
                        paddingVertical: 10,
                        borderRadius: 8,
                    }}
                    onPress={alternarTema}
                >
                    <Text style={{ color: "#FFF", fontWeight: "bold" }}>
                        Tema {temaEscuro ? "claro" : "escuro"}
                    </Text>
                </TouchableOpacity>
            </View>

            <View style={{ flexDirection: "row", gap: 10, marginBottom: 20 }}>
                <TextInput
                    style={{
                        flex: 1,
                        borderWidth: 1,
                        borderColor: temaEscuro ? "#555" : "#D0D5DD",
                        borderRadius: 8,
                        paddingHorizontal: 12,
                        paddingVertical: 10,
                        color: temaEscuro ? "#FFF" : "#111",
                        backgroundColor: temaEscuro ? "#252525" : "#FFF",
                    }}
                    placeholder="Digite seu nome"
                    placeholderTextColor={temaEscuro ? "#AAA" : "#666"}
                    value={nome}
                    onChangeText={setNome}
                    onSubmitEditing={() => void salvarNome()}
                    returnKeyType="done"
                />
                <TouchableOpacity
                    style={{
                        backgroundColor: "#808080",
                        paddingHorizontal: 12,
                        paddingVertical: 10,
                        borderRadius: 8,
                        justifyContent: "center",
                    }}
                    onPress={() => void salvarNome()}
                >
                    <Text style={{ color: "#FFF", fontWeight: "bold" }}>Salvar</Text>
                </TouchableOpacity>
                <Button title="Sair" color="red" onPress={() => void sair()} />
            </View>

            <ListaTarefas />
        </View>
    );
}

export default function Rotas() {
    const { logado, carregando } = useAuth();

    return (
        <NavigationContainer>
            {carregando ? (
                <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                    <ActivityIndicator size="large" />
                </View>
            ) : (
                <Stack.Navigator>
                    {logado ? (
                        <Stack.Screen name="Dashboard" component={TelaDashboard} />
                    ) : (
                        <Stack.Screen name="Login" component={TelaLogin} />
                    )}
                </Stack.Navigator>
            )}
        </NavigationContainer>
    );
}