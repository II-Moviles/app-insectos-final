import { supabase } from "../supabase/supabaseClient";

import * as FileSystem from "expo-file-system/legacy";

// ===============================
// REGISTRO DE USUARIO
// ===============================

export async function registrarUsuario(
  email: string,
  password: string,
  nick: string,
  edad: number,
  avatar: string,
) {
  const { data, error } =
    await supabase.auth.signUp({
      email: email.trim(),
      password: password.trim(),

      options: {
        data: {
          nick: nick.trim(),
          edad: edad,
          avatar: avatar,
        },
      },
    });

  if (error) {
    console.log("ERROR REGISTRO AUTH:", error);

    return {
      success: false,
      message: error.message,
    };
  }

  if (!data.user) {
    return {
      success: false,
      message: "No se pudo crear el usuario.",
    };
  }

  // ===============================
  // GUARDAR PERFIL
  // ===============================

  const { error: perfilError } =
    await supabase
      .from("perfiles")
      .insert([
        {
          id: data.user.id,
          nick: nick.trim(),
          edad: edad,
          avatar: avatar,
          foto: "",
        },
      ]);

  if (perfilError) {
    console.log(
      "ERROR GUARDANDO PERFIL:",
      perfilError,
    );

    return {
      success: false,
      message: perfilError.message,
    };
  }

  console.log(
    "USUARIO REGISTRADO:",
    data.user.email,
  );

  return {
    success: true,
    user: data.user,
  };
}

// ===============================
// LOGIN
// ===============================

export async function iniciarSesion(
  email: string,
  password: string,
) {
  const { data, error } =
    await supabase.auth.signInWithPassword({
      email: email.trim(),
      password: password.trim(),
    });

  if (error) {
    console.log("ERROR LOGIN:", error);

    return {
      success: false,
      message: error.message,
    };
  }

  console.log(
    "LOGIN CORRECTO:",
    data.user?.email,
  );

  return {
    success: true,
    user: data.user,
  };
}

// ===============================
// OBTENER PERFIL
// ===============================

export async function obtenerPerfil() {
  const {
    data: userData,
    error: userError,
  } = await supabase.auth.getUser();

  if (userError || !userData.user) {
    console.log(
      "ERROR USUARIO:",
      userError,
    );

    return null;
  }

  const usuario = userData.user;

  // ===============================
  // BUSCAR PERFIL
  // ===============================

  const {
    data: perfil,
    error: perfilError,
  } =
    await supabase
      .from("perfiles")
      .select("*")
      .eq("id", usuario.id)
      .maybeSingle();

  if (perfilError) {
    console.log(
      "ERROR CONSULTANDO PERFIL:",
      perfilError,
    );

    return null;
  }

  // ===============================
  // PERFIL EXISTENTE
  // ===============================

  if (perfil) {
    return {
      ...perfil,
      email: usuario.email || "",
    };
  }

  // ===============================
  // CREAR PERFIL
  // ===============================

  const nick =
    usuario.user_metadata?.nick ||
    "Jugador";

  const edad =
    Number(
      usuario.user_metadata?.edad,
    ) || 0;

  const avatar =
    usuario.user_metadata?.avatar ||
    "avatar1";

  const {
    data: nuevoPerfil,
    error: crearError,
  } =
    await supabase
      .from("perfiles")
      .insert([
        {
          id: usuario.id,
          nick: nick,
          edad: edad,
          avatar: avatar,
          foto: "",
        },
      ])
      .select()
      .single();

  if (crearError) {
    console.log(
      "ERROR CREANDO PERFIL:",
      crearError,
    );

    return {
      id: usuario.id,
      nick: nick,
      edad: edad,
      avatar: avatar,
      foto: "",
      email: usuario.email || "",
    };
  }

  return {
    ...nuevoPerfil,
    email: usuario.email || "",
  };
}

// ===============================
// ACTUALIZAR FOTO DE PERFIL
// ===============================

export async function actualizarFotoPerfil(
  uri: string,
) {
  try {
    console.log(
      "URI RECIBIDA:",
      uri,
    );

    // ===============================
    // OBTENER USUARIO
    // ===============================

    const {
      data: userData,
      error: userError,
    } =
      await supabase.auth.getUser();

    if (userError || !userData.user) {
      return {
        success: false,
        message:
          "No hay un usuario autenticado.",
      };
    }

    const usuario = userData.user;

    console.log(
      "USUARIO:",
      usuario.id,
    );

    // ===============================
    // VERIFICAR ARCHIVO
    // ===============================

    const informacion =
      await FileSystem.getInfoAsync(uri);

    if (!informacion.exists) {
      console.log(
        "EL ARCHIVO NO EXISTE:",
        uri,
      );

      return {
        success: false,
        message:
          "No se puede leer la imagen seleccionada.",
      };
    }

    console.log(
      "ARCHIVO ENCONTRADO:",
      informacion.uri,
    );

    // ===============================
    // LEER IMAGEN COMO BASE64
    // ===============================

    const base64 =
      await FileSystem.readAsStringAsync(
        uri,
        {
          encoding:
            FileSystem.EncodingType.Base64,
        },
      );

    if (!base64) {
      return {
        success: false,
        message:
          "No se pudo leer el contenido de la imagen.",
      };
    }

    // ===============================
    // CONVERTIR BASE64 A ARRAYBUFFER
    // ===============================

    const byteCharacters =
      atob(base64);

    const byteNumbers =
      new Array(
        byteCharacters.length,
      );

    for (
      let i = 0;
      i < byteCharacters.length;
      i++
    ) {
      byteNumbers[i] =
        byteCharacters.charCodeAt(i);
    }

    const byteArray =
      new Uint8Array(byteNumbers);

    // ===============================
    // NOMBRE DEL ARCHIVO
    // ===============================

    const nombreArchivo =
      `${usuario.id}/foto.jpg`;

    console.log(
      "ARCHIVO DESTINO:",
      nombreArchivo,
    );

    // ===============================
    // ELIMINAR FOTO ANTERIOR
    // ===============================

    const {
      error: removeError,
    } =
      await supabase.storage
        .from("perfiles")
        .remove([
          nombreArchivo,
        ]);

    if (removeError) {
      console.log(
        "AVISO ELIMINANDO FOTO ANTERIOR:",
        removeError,
      );
    }

    // ===============================
    // SUBIR FOTO
    // ===============================

    const {
      error: uploadError,
    } =
      await supabase.storage
        .from("perfiles")
        .upload(
          nombreArchivo,
          byteArray,
          {
            contentType:
              "image/jpeg",
            upsert: true,
          },
        );

    if (uploadError) {
      console.log(
        "ERROR SUBIENDO FOTO:",
        uploadError,
      );

      return {
        success: false,
        message:
          uploadError.message,
      };
    }

    console.log(
      "FOTO SUBIDA CORRECTAMENTE",
    );

    // ===============================
    // OBTENER URL PÚBLICA
    // ===============================

    const {
      data: publicData,
    } =
      supabase.storage
        .from("perfiles")
        .getPublicUrl(
          nombreArchivo,
        );

    const url =
      publicData.publicUrl;

    if (!url) {
      return {
        success: false,
        message:
          "No se pudo obtener la URL de la foto.",
      };
    }

    console.log(
      "URL FOTO:",
      url,
    );

    // ===============================
    // ACTUALIZAR PERFIL
    // ===============================

    const {
      error: updateError,
    } =
      await supabase
        .from("perfiles")
        .update({
          foto: url,
        })
        .eq(
          "id",
          usuario.id,
        );

    if (updateError) {
      console.log(
        "ERROR ACTUALIZANDO PERFIL:",
        updateError,
      );

      return {
        success: false,
        message:
          updateError.message,
      };
    }

    console.log(
      "FOTO GUARDADA:",
      url,
    );

    return {
      success: true,
      url: url,
    };

  } catch (error) {
    console.log(
      "ERROR ACTUALIZANDO FOTO:",
      error,
    );

    return {
      success: false,
      message:
        "No se pudo guardar la foto de perfil.",
    };
  }
}

// ===============================
// CERRAR SESIÓN
// ===============================

export async function cerrarSesion() {
  const { error } =
    await supabase.auth.signOut();

  if (error) {
    console.log(
      "ERROR CERRAR SESION:",
      error,
    );
  }
}

// ===============================
// USUARIO ACTUAL
// ===============================

export async function obtenerUsuarioActual() {
  const {
    data,
    error,
  } =
    await supabase.auth.getUser();

  if (error) {
    console.log(
      "ERROR USUARIO ACTUAL:",
      error,
    );

    return null;
  }

  return data.user;
}