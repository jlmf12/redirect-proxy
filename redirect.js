document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("registroForm");
  if (!form) return;

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const destino = localStorage.getItem("destino_final");
    const origen = localStorage.getItem("origen_final") || "desconocido";
    const nombre = form.nombre.value;
    const email = form.email.value || "";
    const fecha = new Date().toISOString();

    await fetch("https://api.github.com/repos/jlmf12/redirect-proxy/dispatches", {
      method: "POST",
     headers: {
    "Accept": "application/vnd.github+json",
    "Authorization": "Bearer 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"


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
    });

    window.location.href = destino;
  });
});

