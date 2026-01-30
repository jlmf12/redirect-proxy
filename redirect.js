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

        console.log("FORMULARIO ENVIADO");

        try {
            const response = await fetch("https://redirect-proxy-mu.vercel.app/api/dispatch", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    nombre,
                    email,
                    origen,
                    fecha,
                    destino
                })
            });

            console.log("STATUS:", response.status);

        } catch (error) {
            console.error("ERROR EN FETCH:", error);
        }

        window.location.href = destino;
    });
});
