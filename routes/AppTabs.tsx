import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Ionicons from "@expo/vector-icons/Ionicons";
import Home from "../screens/Home";
import Configuracoes from "../screens/Configuracoes";
import type { TabParamList } from "./types";

const Tab = createBottomTabNavigator<TabParamList>();

export default function AppTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarActiveTintColor: "#146C94",
        tabBarInactiveTintColor: "#737373",
        tabBarIcon: ({ color, size, focused }) => {
          const iconName: keyof typeof Ionicons.glyphMap =
            route.name === "Inicio"
              ? focused
                ? "home"
                : "home-outline"
              : focused
                ? "settings"
                : "settings-outline";

          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}
    >
      <Tab.Screen name="Inicio" component={Home} />
      <Tab.Screen name="Ajustes" component={Configuracoes} />
    </Tab.Navigator>
  );
}