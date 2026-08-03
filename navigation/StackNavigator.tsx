import React from "react";

import {
  NavigationContainer,
} from "@react-navigation/native";

import {
  createNativeStackNavigator,
} from "@react-navigation/native-stack";

import LoginScreen from "../screens/LoginScreen";
import RegisterScreen from "../screens/RegisterScreen";
import BottomTabs from "./BottomTabs";

const Stack = createNativeStackNavigator();

export default function StackNavigator() {
  return (
    <NavigationContainer>

      <Stack.Navigator
        initialRouteName="Login"
      >

        {/* =========================
            LOGIN
        ========================= */}

        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{
            headerShown: false,
          }}
        />

        {/* =========================
            REGISTRO
        ========================= */}

        <Stack.Screen
          name="Registro"
          component={RegisterScreen}
          options={{
            title: "Registro",
          }}
        />

        {/* =========================
            APLICACIÓN PRINCIPAL
        ========================= */}

        <Stack.Screen
          name="Principal"
          component={BottomTabs}
          options={{
            headerShown: false,
          }}
        />

      </Stack.Navigator>

    </NavigationContainer>
  );
}
