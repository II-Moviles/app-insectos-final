import React, { useState } from "react";

import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  ScrollView,
  StyleSheet,
} from "react-native";

import { Ionicons } from "@expo/vector-icons";

import { registrarUsuario } from "../Services/auth";

interface Props {
  navigation: any;
}

interface Avatar {
  id: string;
  icono: string;
}

export default function RegisterScreen({
  navigation,
}: Props) {
  const [nick, setNick] = useState("");
  const [edad, setEdad] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmar, setConfirmar] = useState("");

  // Avatar seleccionado por defecto
  const [avatar, setAvatar] = useState("avatar1");

  const avatares: Avatar[] = [
    {
      id: "avatar1",
      icono: "person-circle",
    },
    {
      id: "avatar2",
      icono: "happy",
    },
    {
      id: "avatar3",
      icono: "bug",
    },
    {
      id: "avatar4",
      icono: "paw",
    },
    {
      id: "avatar5",
      icono: "star",
    },
    {
      id: "avatar6",
      icono: "rocket",
    },
  ];

  // Obtener icono del avatar seleccionado
  const obtenerIcono = () => {
    const seleccionado = avatares.find(
      (item) => item.id === avatar
    );

    return seleccionado?.icono || "person-circle";
  };

  // ===============================
  // REGISTRAR USUARIO
  // ===============================

  const registrar = async () => {
    // Validar campos
    if (
      !nick.trim() ||
      !edad.trim() ||
      !email.trim() ||
      !password.trim() ||
      !confirmar.trim()
    ) {
      Alert.alert(
        "Error",
        "Complete todos los campos."
      );
      return;
    }

    // Validar edad
    const edadNumero = Number(edad);

    if (
      isNaN(edadNumero) ||
      edadNumero <= 0 ||
      edadNumero > 120
    ) {
      Alert.alert(
        "Error",
        "Ingrese una edad válida."
      );
      return;
    }

    // Validar correo
    const regex =
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!regex.test(email.trim())) {
      Alert.alert(
        "Error",
        "Ingrese un correo electrónico válido."
      );
      return;
    }

    // Validar contraseña
    if (password.length < 6) {
      Alert.alert(
        "Error",
        "La contraseña debe tener al menos 6 caracteres."
      );
      return;
    }

    // Confirmar contraseña
    if (password !== confirmar) {
      Alert.alert(
        "Error",
        "Las contraseñas no coinciden."
      );
      return;
    }

    try {
      /*
       * IMPORTANTE:
       * No se solicita ni se selecciona ninguna foto.
       *
       * El avatar se guarda mediante su ID:
       * avatar1, avatar2, avatar3, etc.
       */

      const respuesta = await registrarUsuario(
        email.trim(),
        password.trim(),
        nick.trim(),
        edadNumero,
        avatar
      );

      if (!respuesta.success) {
        Alert.alert(
          "Registro",
          respuesta.message
        );
        return;
      }

      Alert.alert(
        "Registro exitoso",
        "Usuario registrado correctamente.",
        [
          {
            text: "Aceptar",
            onPress: () => navigation.goBack(),
          },
        ]
      );
    } catch (error) {
      console.log(
        "ERROR REGISTRANDO:",
        error
      );

      Alert.alert(
        "Error",
        "No se pudo registrar el usuario."
      );
    }
  };

  return (
    <ScrollView
      contentContainerStyle={styles.container}
      keyboardShouldPersistTaps="handled"
    >
      {/* ===============================
          TÍTULO
      =============================== */}

      <Text style={styles.title}>
        Crear cuenta
      </Text>

      {/* ===============================
          AVATAR PRINCIPAL
      =============================== */}

      <View style={styles.avatarPrincipal}>
        <Ionicons
          name={obtenerIcono() as any}
          size={85}
          color="#FFFFFF"
        />
      </View>

      <Text style={styles.avatarTitle}>
        Selecciona tu avatar
      </Text>

      {/* ===============================
          AVATARES
      =============================== */}

      <View style={styles.avatarGrid}>
        {avatares.map((item) => (
          <TouchableOpacity
            key={item.id}
            onPress={() => setAvatar(item.id)}
            style={[
              styles.avatarButton,
              avatar === item.id &&
                styles.avatarSeleccionado,
            ]}
          >
            <Ionicons
              name={item.icono as any}
              size={40}
              color="#FFFFFF"
            />
          </TouchableOpacity>
        ))}
      </View>

      <Text style={styles.avatarActual}>
        Avatar seleccionado: {avatar}
      </Text>

      {/* ===============================
          NICKNAME
      =============================== */}

      <TextInput
        placeholder="Nickname"
        placeholderTextColor="#999999"
        value={nick}
        onChangeText={setNick}
        style={styles.input}
        autoCapitalize="none"
      />

      {/* ===============================
          EDAD
      =============================== */}

      <TextInput
        placeholder="Edad"
        placeholderTextColor="#999999"
        keyboardType="numeric"
        value={edad}
        onChangeText={setEdad}
        style={styles.input}
      />

      {/* ===============================
          CORREO
      =============================== */}

      <TextInput
        placeholder="Correo electrónico"
        placeholderTextColor="#999999"
        autoCapitalize="none"
        keyboardType="email-address"
        value={email}
        onChangeText={setEmail}
        style={styles.input}
      />

      {/* ===============================
          CONTRASEÑA
      =============================== */}

      <TextInput
        placeholder="Contraseña"
        placeholderTextColor="#999999"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
        style={styles.input}
      />

      {/* ===============================
          CONFIRMAR CONTRASEÑA
      =============================== */}

      <TextInput
        placeholder="Confirmar contraseña"
        placeholderTextColor="#999999"
        secureTextEntry
        value={confirmar}
        onChangeText={setConfirmar}
        style={styles.input}
      />

      {/* ===============================
          REGISTRARSE
      =============================== */}

      <TouchableOpacity
        style={styles.registerButton}
        onPress={registrar}
      >
        <Ionicons
          name="person-add"
          size={22}
          color="#FFFFFF"
        />

        <Text style={styles.registerText}>
          Registrarse
        </Text>
      </TouchableOpacity>

      {/* ===============================
          VOLVER
      =============================== */}

      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.goBack()}
      >
        <Text style={styles.backText}>
          Volver al inicio de sesión
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

// ===============================
// ESTILOS
// ===============================

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: "center",
    padding: 25,
    backgroundColor: "#101820",
  },

  title: {
    color: "#FFFFFF",
    fontSize: 32,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
  },

  avatarPrincipal: {
    width: 130,
    height: 130,
    borderRadius: 65,
    backgroundColor: "#27AE60",
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    marginBottom: 15,
  },

  avatarTitle: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 15,
  },

  avatarGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    gap: 12,
    marginBottom: 10,
  },

  avatarButton: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: "#34495E",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2,
    borderColor: "transparent",
  },

  avatarSeleccionado: {
    backgroundColor: "#27AE60",
    borderColor: "#FFFFFF",
    borderWidth: 3,
  },

  avatarActual: {
    color: "#AAAAAA",
    textAlign: "center",
    marginBottom: 20,
    fontSize: 14,
  },

  input: {
    backgroundColor: "#FFFFFF",
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
    fontSize: 16,
  },

  registerButton: {
    backgroundColor: "#27AE60",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    marginTop: 10,
  },

  registerText: {
    color: "#FFFFFF",
    fontWeight: "bold",
    fontSize: 18,
    marginLeft: 8,
  },

  backButton: {
    alignItems: "center",
    marginTop: 20,
    marginBottom: 20,
  },

  backText: {
    color: "#3498DB",
    fontSize: 16,
  },
});