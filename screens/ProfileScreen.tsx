import React, { useEffect, useState } from "react";

import {
  View,
  Text,
  Image,
  TouchableOpacity,
  Alert,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
} from "react-native";

import { Ionicons } from "@expo/vector-icons";

import * as ImagePicker from "expo-image-picker";

import {
  obtenerPerfil,
  cerrarSesion,
} from "../Services/auth";

import {
  obtenerEstadisticasJugador,
} from "../supabase/puntajes";

interface Perfil {
  id?: string;
  nick: string;
  edad: number;
  email: string;
  foto?: string;
  avatar?: string;
}

interface Estadisticas {
  partidas: number;
  mejorPuntaje: number;
  totalCapturas: number;
}

export default function ProfileScreen({ navigation }: any) {
  const [perfil, setPerfil] = useState<Perfil | null>(null);

  const [estadisticas, setEstadisticas] =
    useState<Estadisticas>({
      partidas: 0,
      mejorPuntaje: 0,
      totalCapturas: 0,
    });

  const [cargandoFoto, setCargandoFoto] =
    useState(false);

  // ===============================
  // AVATARES
  // ===============================

  const avatares: Record<string, any> = {
    avatar1: "person-circle",
    avatar2: "happy",
    avatar3: "bug",
    avatar4: "paw",
    avatar5: "star",
    avatar6: "rocket",
  };

  // ===============================
  // CARGAR DATOS
  // ===============================

  useEffect(() => {
    cargarDatos();
  }, []);

  const cargarDatos = async () => {
    try {
      const datos = await obtenerPerfil();

      if (datos) {
        setPerfil(datos);

        const estadisticasJugador =
          await obtenerEstadisticasJugador(
            datos.nick
          );

        setEstadisticas(
          estadisticasJugador
        );
      }
    } catch (error) {
      console.log(
        "ERROR CARGANDO PERFIL:",
        error
      );
    }
  };

  // ===============================
  // OBTENER ICONO DEL AVATAR
  // ===============================

  const obtenerAvatar = () => {
    if (!perfil?.avatar) {
      return "person-circle";
    }

    return (
      avatares[perfil.avatar] ||
      "person-circle"
    );
  };

  // ===============================
  // SELECCIONAR FOTO DE GALERÍA
  // ===============================

  const seleccionarFoto = async () => {
    try {
      const permiso =
        await ImagePicker.requestMediaLibraryPermissionsAsync();

      if (!permiso.granted) {
        Alert.alert(
          "Permiso necesario",
          "Debes permitir el acceso a la galería para seleccionar una foto."
        );

        return;
      }

      const resultado =
        await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ["images"],
          allowsEditing: true,
          aspect: [1, 1],
          quality: 0.7,
        });

      if (resultado.canceled) {
        return;
      }

      const uri =
        resultado.assets[0]?.uri;

      if (!uri) {
        return;
      }

      await guardarFoto(uri);

    } catch (error) {
      console.log(
        "ERROR SELECCIONANDO FOTO:",
        error
      );

      Alert.alert(
        "Error",
        "No se pudo seleccionar la foto."
      );
    }
  };

  // ===============================
  // TOMAR FOTO CON CÁMARA
  // ===============================

  const tomarFoto = async () => {
    try {
      const permiso =
        await ImagePicker.requestCameraPermissionsAsync();

      if (!permiso.granted) {
        Alert.alert(
          "Permiso necesario",
          "Debes permitir el acceso a la cámara para tomar una foto."
        );

        return;
      }

      const resultado =
        await ImagePicker.launchCameraAsync({
          mediaTypes: ["images"],
          allowsEditing: true,
          aspect: [1, 1],
          quality: 0.7,
        });

      if (resultado.canceled) {
        return;
      }

      const uri =
        resultado.assets[0]?.uri;

      if (!uri) {
        return;
      }

      await guardarFoto(uri);

    } catch (error) {
      console.log(
        "ERROR TOMANDO FOTO:",
        error
      );

      Alert.alert(
        "Error",
        "No se pudo tomar la foto."
      );
    }
  };

  // ===============================
  // GUARDAR FOTO
  // ===============================

  const guardarFoto = async (uri: string) => {
    try {
      setCargandoFoto(true);

      /*
       * Por ahora guardamos la URI seleccionada
       * en el perfil local/BD.
       *
       * Más adelante podemos subir físicamente
       * el archivo al Storage de Supabase.
       */

      const { actualizarFotoPerfil } =
        await import("../Services/auth");

      const resultado =
        await actualizarFotoPerfil(uri);

      if (!resultado.success) {
        Alert.alert(
          "Error",
          resultado.message ||
            "No se pudo guardar la foto."
        );

        return;
      }

      setPerfil((perfilAnterior) => {
        if (!perfilAnterior) {
          return perfilAnterior;
        }

        return {
          ...perfilAnterior,
          foto: uri,
        };
      });

      Alert.alert(
        "Foto actualizada",
        "La foto de perfil se actualizó correctamente."
      );

    } catch (error) {
      console.log(
        "ERROR GUARDANDO FOTO:",
        error
      );

      Alert.alert(
        "Error",
        "No se pudo guardar la foto de perfil."
      );
    } finally {
      setCargandoFoto(false);
    }
  };

  // ===============================
  // OPCIONES DE FOTO
  // ===============================

  const cambiarFoto = () => {
    Alert.alert(
      "Foto de perfil",
      "Selecciona una opción",
      [
        {
          text: "Cancelar",
          style: "cancel",
        },
        {
          text: "Galería",
          onPress: seleccionarFoto,
        },
        {
          text: "Tomar foto",
          onPress: tomarFoto,
        },
      ]
    );
  };

  // ===============================
  // JUGAR
  // ===============================

  const jugar = () => {
    navigation.navigate("Juego");
  };

  // ===============================
  // VER PUNTAJES
  // ===============================

  const verPuntajes = () => {
    navigation.navigate("Puntajes");
  };

  // ===============================
  // CERRAR SESIÓN
  // ===============================

  const salir = () => {
    Alert.alert(
      "Cerrar sesión",
      "¿Desea cerrar la sesión?",
      [
        {
          text: "Cancelar",
          style: "cancel",
        },
        {
          text: "Cerrar sesión",
          onPress: async () => {
            await cerrarSesion();

            navigation.replace("Login");
          },
        },
      ]
    );
  };

  // ===============================
  // PANTALLA
  // ===============================

  return (
    <ScrollView
      contentContainerStyle={styles.scrollContainer}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.container}>

        {/* ===============================
            TÍTULO
        =============================== */}

        <Text style={styles.title}>
          Perfil del Jugador
        </Text>

        {perfil ? (
          <>

            {/* ===============================
                FOTO / AVATAR
            =============================== */}

            <View style={styles.photoSection}>

              {perfil.foto &&
              perfil.foto.trim() !== "" ? (

                <Image
                  source={{
                    uri: perfil.foto,
                  }}
                  style={styles.image}
                />

              ) : (

                <View
                  style={styles.avatarContainer}
                >
                  <Ionicons
                    name={obtenerAvatar()}
                    size={80}
                    color="#FFFFFF"
                  />
                </View>

              )}

              {/* ===============================
                  CAMBIAR FOTO
              =============================== */}

              <TouchableOpacity
                style={styles.changePhotoButton}
                onPress={cambiarFoto}
                disabled={cargandoFoto}
              >

                {cargandoFoto ? (

                  <ActivityIndicator
                    size="small"
                    color="#FFFFFF"
                  />

                ) : (

                  <Ionicons
                    name="camera"
                    size={20}
                    color="#FFFFFF"
                  />

                )}

                <Text
                  style={styles.changePhotoText}
                >
                  {cargandoFoto
                    ? "Guardando..."
                    : "Cambiar foto de perfil"}
                </Text>

              </TouchableOpacity>

            </View>

            {/* ===============================
                NICKNAME
            =============================== */}

            <Text style={styles.nickname}>
              {perfil.nick}
            </Text>

            {/* ===============================
                INFORMACIÓN
            =============================== */}

            <View style={styles.card}>

              <Text style={styles.label}>
                Nickname
              </Text>

              <Text style={styles.value}>
                {perfil.nick}
              </Text>

              <Text style={styles.label}>
                Edad
              </Text>

              <Text style={styles.value}>
                {perfil.edad} años
              </Text>

              <Text style={styles.label}>
                Correo
              </Text>

              <Text style={styles.value}>
                {perfil.email}
              </Text>

            </View>

            {/* ===============================
                ESTADÍSTICAS
            =============================== */}

            <View style={styles.statistics}>

              <Text
                style={styles.statisticsTitle}
              >
                Mis estadísticas
              </Text>

              <Text
                style={styles.statisticsText}
              >
                Partidas:{" "}
                {estadisticas.partidas}
              </Text>

              <Text
                style={styles.statisticsText}
              >
                Mejor puntaje:{" "}
                {estadisticas.mejorPuntaje}
              </Text>

              <Text
                style={styles.statisticsText}
              >
                Insectos capturados:{" "}
                {estadisticas.totalCapturas}
              </Text>

            </View>

            {/* ===============================
                JUGAR
            =============================== */}

            <TouchableOpacity
              style={styles.playButton}
              onPress={jugar}
            >

              <Ionicons
                name="play"
                size={20}
                color="#FFFFFF"
              />

              <Text style={styles.buttonText}>
                JUGAR
              </Text>

            </TouchableOpacity>

            {/* ===============================
                PUNTAJES
            =============================== */}

            <TouchableOpacity
              style={styles.scoreButton}
              onPress={verPuntajes}
            >

              <Ionicons
                name="trophy"
                size={20}
                color="#FFFFFF"
              />

              <Text style={styles.buttonText}>
                VER PUNTAJES
              </Text>

            </TouchableOpacity>

            {/* ===============================
                CERRAR SESIÓN
            =============================== */}

            <TouchableOpacity
              style={styles.logoutButton}
              onPress={salir}
            >

              <Ionicons
                name="log-out-outline"
                size={20}
                color="#FFFFFF"
              />

              <Text style={styles.buttonText}>
                CERRAR SESIÓN
              </Text>

            </TouchableOpacity>

          </>
        ) : (

          <View style={styles.loadingContainer}>

            <ActivityIndicator
              size="large"
              color="#27AE60"
            />

            <Text style={styles.loading}>
              Cargando perfil...
            </Text>

          </View>

        )}

      </View>
    </ScrollView>
  );
}

// ===============================
// ESTILOS
// ===============================

const styles = StyleSheet.create({

  scrollContainer: {
    flexGrow: 1,
    backgroundColor: "#101820",
  },

  container: {
    flexGrow: 1,
    backgroundColor: "#101820",
    alignItems: "center",
    padding: 25,
    paddingTop: 40,
    paddingBottom: 40,
  },

  title: {
    color: "#FFFFFF",
    fontSize: 30,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },

  photoSection: {
    alignItems: "center",
    marginBottom: 10,
  },

  image: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 12,
  },

  avatarContainer: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: "#27AE60",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 12,
  },

  changePhotoButton: {
    backgroundColor: "#34495E",
    paddingVertical: 10,
    paddingHorizontal: 18,
    borderRadius: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },

  changePhotoText: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "bold",
    marginLeft: 8,
  },

  nickname: {
    color: "#FFFFFF",
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 12,
    marginTop: 5,
  },

  card: {
    backgroundColor: "#FFFFFF",
    width: "100%",
    padding: 15,
    borderRadius: 15,
    marginBottom: 12,
  },

  label: {
    fontSize: 15,
    fontWeight: "bold",
    color: "#555555",
    marginTop: 5,
  },

  value: {
    fontSize: 18,
    color: "#111111",
    marginBottom: 5,
  },

  statistics: {
    backgroundColor: "#FFFFFF",
    width: "100%",
    padding: 15,
    borderRadius: 15,
    marginBottom: 15,
  },

  statisticsTitle: {
    fontSize: 19,
    fontWeight: "bold",
    marginBottom: 8,
    textAlign: "center",
    color: "#111111",
  },

  statisticsText: {
    fontSize: 16,
    marginTop: 4,
    color: "#111111",
  },

  playButton: {
    backgroundColor: "#27AE60",
    width: "100%",
    padding: 14,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    marginBottom: 10,
  },

  scoreButton: {
    backgroundColor: "#3498DB",
    width: "100%",
    padding: 14,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    marginBottom: 10,
  },

  logoutButton: {
    backgroundColor: "#E74C3C",
    width: "100%",
    padding: 14,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
  },

  buttonText: {
    color: "#FFFFFF",
    fontSize: 17,
    fontWeight: "bold",
    marginLeft: 8,
  },

  loadingContainer: {
    alignItems: "center",
    justifyContent: "center",
    marginTop: 30,
  },

  loading: {
    color: "#FFFFFF",
    fontSize: 18,
    marginTop: 12,
  },

});