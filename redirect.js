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

        console.log("FORMULARIO ENVIADO"); // Debug

        try {
            const response = aawait fetch("https://redirect-proxy-mu.vercel.app/api/dispatch", {
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
    
});

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

            console.log("STATUS:", response.status); // Debug

        } catch (error) {
            console.error("ERROR EN FETCH:", error);
        }

        window.location.href = destino;
    });
});


