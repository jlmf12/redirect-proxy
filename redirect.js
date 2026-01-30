<script>
    document.getElementById("form").addEventListener("submit", function(e) {
        e.preventDefault();

        const nombre = document.getElementById("nombre").value;
        const email = document.getElementById("email").value;

        // Leer el destino de la URL
        const params = new URLSearchParams(window.location.search);
        const destino = params.get("destino");

        // Si no hay destino, no podemos continuar
        if (!destino) {
            alert("Falta el parámetro destino en la URL.");
            return;
        }

        // Redirigir al proxy final con todos los datos
        window.location.href =
            `redirect.html?nombre=${encodeURIComponent(nombre)}&email=${encodeURIComponent(email)}&destino=${encodeURIComponent(destino)}`;
    });
</script>


