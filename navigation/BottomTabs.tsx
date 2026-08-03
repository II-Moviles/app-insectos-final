import React from "react";

import {
  createBottomTabNavigator,
} from "@react-navigation/bottom-tabs";

import { Ionicons } from "@expo/vector-icons";

import HomeScreen from "../screens/HomeScreen";
import ScoreScreen from "../screens/ScoreScreen";
import ProfileScreen from "../screens/ProfileScreen";

const Tab = createBottomTabNavigator();

export default function BottomTabs() {
  return (
    <Tab.Navigator
      initialRouteName="Perfil"
      screenOptions={({ route }) => ({
        headerShown: false,

        tabBarActiveTintColor: "#27AE60",
        tabBarInactiveTintColor: "#777777",

        tabBarStyle: {
          backgroundColor: "#FFFFFF",
          height: 65,
          paddingBottom: 8,
          paddingTop: 5,
        },

        tabBarLabelStyle: {
          fontSize: 13,
          fontWeight: "bold",
        },

        tabBarIcon: ({ focused, color, size }) => {
          let iconName: any;

          if (route.name === "Juego") {
            iconName = focused
              ? "game-controller"
              : "game-controller-outline";
          } else if (route.name === "Puntajes") {
            iconName = focused
              ? "trophy"
              : "trophy-outline";
          } else if (route.name === "Perfil") {
            iconName = focused
              ? "person-circle"
              : "person-circle-outline";
          }

          return (
            <Ionicons
              name={iconName}
              size={size}
              color={color}
            />
          );
        },
      })}
    >
      {/* =========================
          JUEGO
      ========================= */}

      <Tab.Screen
        name="Juego"
        component={HomeScreen}
        options={{
          title: "Juego",
        }}
      />

      {/* =========================
          PUNTAJES
      ========================= */}

      <Tab.Screen
        name="Puntajes"
        component={ScoreScreen}
        options={{
          title: "Puntajes",
        }}
      />

      {/* =========================
          PERFIL
      ========================= */}

      <Tab.Screen
        name="Perfil"
        component={ProfileScreen}
        options={{
          title: "Perfil",
        }}
      />
    </Tab.Navigator>
  );
}