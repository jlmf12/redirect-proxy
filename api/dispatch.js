export default async function handler(req, res) {
  // CORS
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  // Preflight
  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  if (req.method !== "POST") {
    return res.status(405).json({ error: "Método no permitido" });
  }

  // Vercel parsea JSON automáticamente en serverless functions
  const { nombre, email, origen, fecha, destino } = req.body;

  const token = process.env.GITHUB_TOKEN;

  const response = await fetch(
    "https://api.github.com/repos/jlmf12/redirect-proxy/dispatches",
    {
      method: "POST",
      headers: {
        "Accept": "application/vnd.github+json",
        "Authorization": `Bearer ${token}`
      },
      body: JSON.stringify({
        event_type: "registro_click",
        client_payload: {
          nombre,
          email,
          origen,
          fecha,
          destino
        }
      })
    }
  );

  if (!response.ok) {
    const text = await response.text();
    return res.status(500).json({ error: "GitHub error", details: text });
  }

  return res.status(200).json({ ok: true });
}

