# 🐞 Caza Insectos

Aplicación móvil desarrollada como proyecto final para aplicar conocimientos de desarrollo de aplicaciones móviles utilizando **React Native, Expo, TypeScript y Supabase**.

La aplicación consiste en un videojuego interactivo en el que el jugador debe capturar insectos para obtener puntos. Además, cuenta con registro de usuarios, perfiles, clasificación de puntuaciones y almacenamiento de fotografías.

## 🚀 Tecnologías utilizadas

* **React Native** – Desarrollo de la aplicación móvil.
* **Expo** – Configuración, ejecución y compilación de la aplicación.
* **TypeScript** – Desarrollo del código.
* **React Navigation** – Navegación entre las diferentes pantallas.
* **Supabase** – Autenticación y almacenamiento de información.
* **Supabase Storage** – Almacenamiento de fotografías de perfil.
* **EAS Build** – Generación del archivo APK para Android.

## 🎮 Funcionalidades

La aplicación permite:

* Registro de usuarios.
* Inicio y cierre de sesión.
* Selección de avatar.
* Acceso al videojuego.
* Captura de insectos.
* Incremento de puntuación.
* Guardado de puntuaciones.
* Visualización de la clasificación de jugadores.
* Consulta del perfil.
* Visualización de estadísticas.
* Selección de fotografía desde la galería.
* Captura de fotografía mediante la cámara.
* Actualización de la fotografía de perfil.
* Almacenamiento de fotografías mediante Supabase Storage.

## 📱 Pantallas principales

La aplicación cuenta principalmente con:

* **Juego:** permite capturar insectos y obtener puntuación.
* **Puntajes:** muestra las puntuaciones de los jugadores ordenadas de mayor a menor.
* **Perfil:** permite consultar la información, estadísticas, avatar y fotografía del usuario.
* **Registro:** permite crear una nueva cuenta.
* **Login:** permite iniciar sesión.

## ☁️ Base de datos

Utilicé **Supabase** como servicio backend para gestionar la autenticación y almacenar la información de los usuarios y las puntuaciones.

También implementé **Supabase Storage** para almacenar las fotografías de perfil seleccionadas desde la galería o tomadas mediante la cámara.

## 📦 Generación del APK

Para generar la aplicación ejecutable para Android utilicé **Expo Application Services (EAS)**.

```bash
cd "C:\Users\wfvh6\Downloads\AM2 - OnLine\app-insectos"

npx expo-doctor

eas login

eas whoami

eas build -p android --profile preview
```

Antes de generar el APK verifiqué que el proyecto no presentara errores mediante `expo-doctor`.

El proceso de compilación fue realizado mediante los servidores de Expo, incluyendo la preparación de Android, configuración de credenciales, firma mediante Keystore y generación del APK.

## 🔗 Compilación en Expo

La compilación del proyecto puede consultarse en:

https://expo.dev/accounts/fernando6489/projects/app-insectos/builds/4b625341-53ed-46c4-b9da-fc178a3d85f2

## ▶️ Ejecución del proyecto

Para ejecutar el proyecto en un entorno de desarrollo:

```bash
npm install
npx expo start
```

También se puede ejecutar en un dispositivo Android utilizando Expo.

## ✅ Pruebas realizadas

Durante las pruebas finales comprobé:

* Registro de usuario.
* Inicio de sesión.
* Selección de avatar.
* Acceso al juego.
* Captura de insectos.
* Incremento y almacenamiento de puntuaciones.
* Visualización de la clasificación.
* Consulta del perfil.
* Visualización de estadísticas.
* Selección de fotografía desde la galería.
* Captura de fotografía con la cámara.
* Actualización de fotografía.
* Almacenamiento de la fotografía en Supabase Storage.
* Cierre de sesión.
* Nuevo inicio de sesión.

## 🎯 Objetivo del proyecto

El objetivo principal fue desarrollar una aplicación móvil funcional que permitiera aplicar los conocimientos adquiridos sobre **TypeScript, Hooks, navegación, autenticación, almacenamiento en la nube, integración con dispositivos móviles y generación de aplicaciones Android**.

## 👨‍💻 Autor

**Wladimir Vega Herrera**

Proyecto académico – Desarrollo de Aplicaciones Móviles
