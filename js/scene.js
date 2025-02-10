document.addEventListener("DOMContentLoaded", function () {
    fetch("assets/scene.html")
        .then(response => response.text())
        .then(data => {
            document.getElementById("scene-container").innerHTML = data;
            console.log("✅ Escena cargada correctamente.");

            // Esperar a que <a-scene> realmente esté en el DOM antes de disparar el evento
            setTimeout(() => {
                let scene = document.querySelector("a-scene");
                if (scene) {
                    document.dispatchEvent(new Event("scene-loaded"));
                    console.log("✅ Evento scene-loaded disparado correctamente.");
                } else {
                    console.error("❌ No se encontró <a-scene>. La escena no se cargó correctamente.");
                }
            }, 1000); // Esperamos 1s por seguridad
        })
        .catch(error => console.error("❌ Error cargando la escena:", error));
});
