export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Método no permitido" });
  }

  try {
    const response = await fetch("https://script.google.com/macros/s/AKfycbx_n84HH3lLl-pyUkb8_f8M3svEtJFcQmJlv7mTlvV_9d0yRkxRFvlI0_dUjyQXjVh3/exec", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(req.body)
    });

    const result = await response.json();
    return res.status(200).json(result);

  } catch (error) {
    return res.status(500).json({ ok: false, error: error.message });
  }
}
