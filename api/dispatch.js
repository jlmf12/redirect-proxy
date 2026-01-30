export default async function handler(req, res) {
    if (req.method !== "POST") {
        return res.status(405).json({ error: "Método no permitido" });
    }

    const { nombre, email, origen, fecha, destino } = req.body;

    // Convertir fecha ISO en fecha y hora separadas
    const dateObj = new Date(fecha);
    const fechaLocal = dateObj.toISOString().split("T")[0];
    const horaLocal = dateObj.toISOString().split("T")[1].split(".")[0];

    // Obtener país, región, ciudad e IP
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
        pais = "Error";
        region = "Error";
        ciudad = "Error";
        ip = "Error";
    }

    const fs = require("fs");
    const path = require("path");

    const filePath = path.join(process.cwd(), "data.csv");

    // Crear CSV con encabezados si no existe
    if (!fs.existsSync(filePath)) {
        fs.writeFileSync(
            filePath,
            "nombre,email,origen,fecha,hora,pais,region,ciudad,ip,destino\n",
            "utf8"
        );
    }

    // Añadir la nueva línea
    const linea = `${nombre || ""},${email || ""},${origen || ""},${fechaLocal},${horaLocal},${pais},${region},${ciudad},${ip},${destino || ""}\n`;

    fs.appendFileSync(filePath, linea, "utf8");

    return res.status(200).json({ ok: true });
}
