import { supabase } from "./supabaseClient";

// ==========================================
// GUARDAR PUNTAJE
// ==========================================

export async function guardarPuntaje(
  usuario: string,
  puntaje: number,
  capturas: number,
) {
  const { data, error } = await supabase
    .from("puntajes")
    .insert([
      {
        usuario: usuario,
        puntaje: puntaje,
        capturas: capturas,
        partidas: 1,
        fecha: new Date().toISOString(),
      },
    ])
    .select();

  if (error) {
    console.log("ERROR SUPABASE:", error);

    return false;
  }

  console.log("GUARDADO CORRECTAMENTE:", data);

  return true;
}

// ==========================================
// OBTENER MEJORES PUNTAJES
// ==========================================

export const obtenerPuntajes = async () => {
  const { data, error } = await supabase
    .from("puntajes")
    .select("*")
    .order("puntaje", {
      ascending: false,
    })
    .limit(10);

  if (error) {
    console.log("ERROR OBTENIENDO PUNTAJES:", error);

    return [];
  }

  return data || [];
};

// ==========================================
// OBTENER ESTADÍSTICAS DEL JUGADOR
// ==========================================

export const obtenerEstadisticasJugador = async (usuario: string) => {
  const { data, error } = await supabase
    .from("puntajes")
    .select("puntaje, capturas, partidas")
    .eq("usuario", usuario);

  if (error) {
    console.log("ERROR ESTADISTICAS:", error);

    return {
      partidas: 0,
      mejorPuntaje: 0,
      totalCapturas: 0,
    };
  }

  if (!data || data.length === 0) {
    return {
      partidas: 0,
      mejorPuntaje: 0,
      totalCapturas: 0,
    };
  }

  const mejorPuntaje = Math.max(
    ...data.map((item) => Number(item.puntaje) || 0),
  );

  const totalCapturas = data.reduce(
    (total, item) => total + (Number(item.capturas) || 0),
    0,
  );

  return {
    partidas: data.length,
    mejorPuntaje: mejorPuntaje,
    totalCapturas: totalCapturas,
  };
};
