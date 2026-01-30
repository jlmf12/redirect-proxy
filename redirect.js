document.getElementById("form").addEventListener("submit", function(e) {
    e.preventDefault();

    const nombre = document.getElementById("nombre").value;
    const email = document.getElementById("email").value;

    // Leer destino de la URL
    const params = new URLSearchParams(window.location.search);
    const destino = params.get("destino");

    // Redirigir al proxy final
    window.location.href = `redirect.html?nombre=${encodeURIComponent(nombre)}&email=${encodeURIComponent(email)}&destino=${encodeURIComponent(destino)}`;
});
