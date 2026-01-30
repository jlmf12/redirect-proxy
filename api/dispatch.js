export const config = {
    runtime: "edge"
};

export default async function handler(req) {
    const body = await req.json();
    const { nombre, email, origen, fecha, destino } = body;

    // Fecha y hora separadas
    const dateObj = new Date(fecha);
    const fechaLocal = dateObj.toISOString().split("T")[0];
    const horaLocal = dateObj.toISOString().split("T")[1].split(".")[0];

    // Geolocalización
    let pais = "Desconocido";
    let region = "Desconocido";
    let ciudad = "Desconocido";
    let ip = "Desconocida";

    try {
        const geoRes = await fetch("https://ipapi.co/json/");
        const geo = await geoRes.json();

        pais = geo.country_name || "Desconocido";
        region = geo.region || "Desconocido";
        ciudad = geo.city || "Desconocido";
        ip = geo.ip || "Desconocida";
    } catch (e) {
        // valores por defecto
    }

    // Escritura en CSV (Edge Runtime usa Blob + R2 / KV / Storage)
    // Para mantener tu flujo actual, usamos una API interna de Vercel: no FS.
    // Necesitas cambiar a Vercel KV o Vercel Blob para persistencia real.

    return new Response(
        JSON.stringify({ ok: false, msg: "El filesystem de Edge no permite escribir CSV directamente. Necesitamos mover el CSV a Vercel KV o Blob." }),
        { status: 500 }
    );
}
