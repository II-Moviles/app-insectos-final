import React, { useEffect, useState, useRef } from "react";

import AsyncStorage from "@react-native-async-storage/async-storage";

import {
  View,
  Text,
  TouchableOpacity,
  Alert,
  Image,
  Animated,
} from "react-native";

import { insects } from "../data/insects";

import { homeStyles } from "../styles/ScreensStyles";

import { Insect } from "../types/Insect";

import { guardarPuntaje } from "../supabase/puntajes";

import { obtenerPerfil } from "../Services/auth";

interface GameInsect extends Insect {
  x: number;

  y: number;
}

interface Props {
  navigation: any;
}

export default function HomeScreen({ navigation }: Props) {
  const [gameInsects, setGameInsects] = useState<GameInsect[]>([]);

  const [score, setScore] = useState<number>(0);

  const [timeLeft, setTimeLeft] = useState<number>(60);

  const [gameOver, setGameOver] = useState<boolean>(false);

  const [capturas, setCapturas] = useState<number>(0);

  const [jugador, setJugador] = useState<string>("");

  const scale = useRef(new Animated.Value(0)).current;

  const generarId = () => {
    return Date.now().toString() + Math.random().toString(36).substring(2);
  };

  // Cargar nickname del usuario

  useEffect(() => {
    cargarJugador();
  }, []);

  const cargarJugador = async () => {
    try {
      const perfil = await obtenerPerfil();

      console.log("PERFIL:", perfil);

      if (perfil) {
        setJugador(perfil.nick);
      }
    } catch (error) {
      console.log("Error cargando perfil", error);
    }
  };

  // Iniciar juego

  useEffect(() => {
    iniciarJuego();
  }, []);

  // Animación insectos

  useEffect(() => {
    Animated.spring(scale, {
      toValue: 1,

      useNativeDriver: true,
    }).start();
  }, [gameInsects]);

  // Temporizador

  useEffect(() => {
    if (gameOver) return;

    if (timeLeft <= 0) {
      setGameOver(true);

      const finalizarJuego = async () => {
        if (jugador !== "") {
await guardarPuntaje(
  jugador,
  score,
  capturas,
);
        }

        await AsyncStorage.setItem(
          "ultimoPuntaje",

          score.toString(),
        );

        Alert.alert(
          "Juego terminado",

          `Jugador: ${jugador}
Puntaje: ${score}
Capturas: ${capturas}`,
        );
      };

      finalizarJuego();

      return;
    }

    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft, gameOver, jugador]);

  // Crear insectos iniciales

  const crearInsectos = () => {
    return insects.map((item) => ({
      ...item,

      id: generarId(),

      x: Math.random() * 250,

      y: Math.random() * 400,
    }));
  };

  // Reiniciar juego

  const iniciarJuego = () => {
    const nuevos = crearInsectos();

    setGameInsects(nuevos);

    setScore(0);

    setCapturas(0);

    setTimeLeft(60);

    setGameOver(false);
  };

  // Agregar insecto nuevo

  const agregarNuevoInsecto = () => {
    const nuevo = {
      ...insects[Math.floor(Math.random() * insects.length)],

      id: generarId(),

      x: Math.random() * 250,

      y: Math.random() * 400,
    };

    setGameInsects((prev) => [...prev, nuevo]);
  };

  // Capturar insecto

  const atraparInsecto = (insect: GameInsect) => {
    if (gameOver) return;

    setScore((prev) => prev + insect.puntos);

    setCapturas((prev) => {
      const nuevas = prev + 1;

      AsyncStorage.setItem(
        "capturas",

        nuevas.toString(),
      );

      return nuevas;
    });

    setGameInsects((prev) => prev.filter((item) => item.id !== insect.id));

    setTimeout(() => {
      if (!gameOver) {
        agregarNuevoInsecto();
      }
    }, 500);
  };

  return (
    <View style={homeStyles.container}>
      <Text style={homeStyles.title}>Caza Insectos</Text>

      <Text style={homeStyles.score}>Jugador: {jugador}</Text>

      <View style={homeStyles.infoContainer}>
        <Text style={homeStyles.score}>Puntaje: {score}</Text>

        <Text style={homeStyles.time}>Tiempo: {timeLeft}</Text>
      </View>

      <View style={homeStyles.gameArea}>
        {gameInsects.map((item) => (
          <Animated.View
            key={item.id}
            style={[
              {
                position: "absolute",

                left: item.x,

                top: item.y,

                transform: [
                  {
                    scale: scale,
                  },
                ],
              },
            ]}
          >
            <TouchableOpacity
              onPress={() => atraparInsecto(item)}
              style={homeStyles.insect}
            >
              <Image
                source={{
                  uri: item.imagen,
                }}
                style={homeStyles.insectImage}
              />
            </TouchableOpacity>
          </Animated.View>
        ))}
      </View>

      {gameOver && (
        <TouchableOpacity
          style={homeStyles.restartButton}
          onPress={iniciarJuego}
        >
          <Text style={homeStyles.menuText}>Nuevo Juego</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}
