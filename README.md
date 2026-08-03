# 📱 Caza Insectos

Juego móvil desarrollado con **React Native y Expo**, donde el usuario debe capturar insectos virtuales que aparecen en pantalla. Los puntajes obtenidos se almacenan en una base de datos externa utilizando **Supabase**.

El proyecto fue desarrollado para la asignatura **Aplicaciones Móviles II**, aplicando conceptos de desarrollo móvil, navegación, manejo de estados, autenticación de usuarios y almacenamiento en la nube.

---

# 🎯 Objetivo

Desarrollar una aplicación móvil interactiva utilizando React Native, implementando componentes visuales, navegación entre pantallas, lógica de juego, autenticación de usuarios y conexión con servicios externos.

El objetivo principal del juego es capturar insectos durante un tiempo determinado, acumulando puntos y permitiendo visualizar los mejores resultados de los jugadores.

---

# 📝 Descripción del Proyecto

La aplicación denominada **Caza Insectos** permite al usuario registrarse, iniciar sesión y participar en un juego donde debe capturar insectos que aparecen en diferentes posiciones de la pantalla.

La aplicación cuenta con:

- Registro de usuarios.
- Inicio de sesión.
- Perfil personalizado.
- Juego interactivo.
- Sistema de puntuación.
- Ranking de jugadores.
- Almacenamiento de datos mediante Supabase.

Durante el desarrollo se utilizaron componentes principales de React Native:

- View
- Text
- Image
- TextInput
- FlatList
- TouchableOpacity
- ScrollView
- Animated
- StyleSheet

---

# 📚 Fundamentación Teórica

## React Native

React Native es un framework desarrollado por Meta que permite crear aplicaciones móviles multiplataforma utilizando JavaScript o TypeScript.

Su arquitectura basada en componentes permite desarrollar interfaces reutilizables y mantener una mejor organización del código.

---

## Expo

Expo es una plataforma utilizada para facilitar el desarrollo y pruebas de aplicaciones creadas con React Native.

Permite acceder fácilmente a funcionalidades del dispositivo como:

- Galería de imágenes.
- Almacenamiento.
- Cámara.
- Ejecución en dispositivos físicos.

---

## Supabase

Supabase es una plataforma Backend como Servicio (BaaS) utilizada en el proyecto para administrar información externa.

Fue utilizada para:

- Autenticación de usuarios.
- Base de datos.
- Almacenamiento de imágenes.
- Registro de puntajes.

---

# 🔐 Segunda Parte: Autenticación y Gestión de Usuarios

En esta segunda fase del proyecto se implementó un sistema completo de usuarios para mejorar la experiencia del jugador.

Cada usuario puede crear una cuenta, ingresar a la aplicación y visualizar información personalizada.

---

# 🔑 Autenticación de Usuarios

La autenticación permite controlar el acceso a la aplicación mediante credenciales personales.

Se implementaron las siguientes funcionalidades:

- Registro de nuevos usuarios.
- Inicio de sesión.
- Cierre de sesión.
- Validación de credenciales.

La autenticación fue desarrollada utilizando Supabase Authentication.

---

# 🛡️ Seguridad

Se implementaron validaciones para garantizar un correcto manejo de información:

- Verificación de campos obligatorios.
- Validación del correo electrónico.
- Control de longitud mínima de contraseña.
- Confirmación de contraseña.
- Restricción de acceso para usuarios no autenticados.

Esto permite proteger la información almacenada de cada jugador.

---

# 📱 Componente Login

Se desarrolló la pantalla **LoginScreen**, encargada del acceso de usuarios registrados.

El usuario debe ingresar:

- Correo electrónico.
- Contraseña.

Proceso:

1. El usuario ingresa sus credenciales.
2. La aplicación envía la información a Supabase.
3. Supabase valida los datos.
4. Se permite el acceso al sistema.

---

# 📝 Componente Registro

Se creó la pantalla **RegisterScreen** para registrar nuevos jugadores.

Información solicitada:

- Nickname.
- Edad.
- Correo electrónico.
- Contraseña.
- Confirmación de contraseña.
- Imagen de perfil.

Se agregaron validaciones para evitar registros incorrectos.

---

# 🧭 Navegación de la Aplicación

Se implementó navegación utilizando React Navigation.

## Stack Navigator

Permite controlar el acceso entre:

- Login.
- Registro.
- Pantalla principal.

## Bottom Tab Navigator

Permite navegar dentro de la aplicación:

- Juego.
- Puntajes.
- Perfil.

---

# 👤 Perfil del Jugador

Se creó la pantalla **ProfileScreen**, donde el usuario puede consultar su información personal.

Datos mostrados:

- Nickname.
- Edad.
- Correo electrónico.
- Imagen de perfil.

También permite cerrar sesión de manera segura.

---

# 🖼️ Gestión de Imágenes

Se implementó la selección de imágenes mediante Expo Image Picker.

El proceso realizado fue:

1. El usuario selecciona una imagen desde su dispositivo.
2. La aplicación obtiene la imagen seleccionada.
3. La imagen puede almacenarse mediante Supabase Storage.
4. Se guarda la referencia dentro del perfil del usuario.

Bucket utilizado:
