# 🐞 Caza Insectos

Aplicación móvil desarrollada como proyecto final de **Aplicaciones Móviles II**, utilizando **React Native, Expo y TypeScript**.

El proyecto consiste en un videojuego interactivo en el que el usuario debe capturar insectos para obtener puntos. La aplicación también incorpora autenticación, perfiles de usuario, clasificación de puntuaciones y almacenamiento de fotografías en la nube.

## 🚀 Tecnologías utilizadas

* React Native
* Expo
* TypeScript
* React Navigation
* Supabase
* Supabase Authentication
* Supabase Database
* Supabase Storage
* Expo Image Picker
* Expo Application Services (EAS)

## 📱 Funcionalidades

* Registro de usuarios.
* Inicio y cierre de sesión.
* Selección de avatar.
* Perfil de usuario.
* Visualización de estadísticas.
* Juego de captura de insectos.
* Incremento de puntuación durante la partida.
* Guardado de puntuaciones.
* Clasificación de jugadores ordenada por puntuación.
* Selección de fotografía desde la galería.
* Captura de fotografía mediante la cámara.
* Actualización de la fotografía de perfil.
* Almacenamiento de fotografías mediante Supabase Storage.
* Persistencia de la información del usuario.

## 🎮 Funcionamiento

El usuario inicia registrándose en la aplicación y posteriormente puede iniciar sesión. Una vez autenticado, puede acceder al juego y capturar insectos para obtener puntos.

Al finalizar la partida, la puntuación se almacena y puede consultarse en la pantalla de clasificación. Desde el perfil, el usuario puede consultar sus datos y estadísticas, además de modificar su fotografía utilizando la galería o la cámara del dispositivo.

## ☁️ Supabase

Utilicé Supabase como servicio backend para gestionar:

* Autenticación de usuarios.
* Información de los perfiles.
* Puntuaciones de los jugadores.
* Fotografías de perfil mediante Supabase Storage.

## 📦 Generación del APK

Para generar la versión ejecutable de Android utilicé **Expo Application Services (EAS)**.

```bash
npx expo-doctor
eas login
eas whoami
eas build -p android --profile preview
```

Antes de generar el APK verifiqué que el proyecto no presentara errores mediante `expo-doctor`.

La compilación fue realizada mediante los servidores de Expo y se configuraron las credenciales necesarias para Android.

## 🔗 Compilación

Proyecto publicado en Expo:

https://expo.dev/accounts/fernando6489/projects/app-insectos/builds/4b625341-53ed-46c4-b9da-fc178a3d85f2

## ✅ Pruebas realizadas

Se verificaron las principales funcionalidades de la aplicación:

* Registro e inicio de sesión.
* Selección de avatar.
* Acceso y funcionamiento del juego.
* Captura de insectos.
* Incremento y almacenamiento de puntuaciones.
* Visualización de clasificación.
* Consulta de perfil y estadísticas.
* Selección de fotografía desde galería.
* Captura mediante cámara.
* Actualización y almacenamiento de fotografía.
* Cierre y nuevo inicio de sesión.

## 🎯 Objetivo

Con este proyecto apliqué de manera práctica los conocimientos adquiridos durante mi formación en desarrollo de aplicaciones móviles, integrando interfaces, navegación, autenticación, almacenamiento en la nube, interacción con el dispositivo y generación de aplicaciones para Android.

## 👨‍💻 Autor

**Wladimir Vega Herrera**

Desarrollo de Software – Nivel 3
Aplicaciones Móviles II
