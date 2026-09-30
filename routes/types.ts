import type { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import type { CompositeScreenProps } from "@react-navigation/native";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";

export type RootStackParamList = {
  Principal: undefined;
  Detalhes: { nomeUsuario: string };
};

export type TabParamList = {
  Inicio: undefined;
  Ajustes: undefined;
};

export type HomeScreenProps = CompositeScreenProps<
  BottomTabScreenProps<TabParamList, "Inicio">,
  NativeStackScreenProps<RootStackParamList>
>;

export type DetalhesUsuarioScreenProps = NativeStackScreenProps<
  RootStackParamList,
  "Detalhes"
>;