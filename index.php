<!DOCTYPE html>
<html lang="es">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Escape Espacial</title>

    <!-- A-Frame y sistema de físicas -->
    <script src="https://aframe.io/releases/1.4.0/aframe.min.js"></script>
    <script src="https://unpkg.com/aframe-physics-system@1.3.1/dist/aframe-physics-system.min.js"></script>



    <!-- Comprobación en consola -->
    <script>
        document.addEventListener("DOMContentLoaded", function() {
            console.log("✅ A-Frame cargado:", AFRAME);
            console.log("✅ Comprobando sistema de físicas...");

            setTimeout(() => {
                console.log("🛠 AFRAME.systems.physics:", AFRAME.systems.physics);
                console.log("🛠 AFRAME.components['dynamic-body']:", AFRAME.components["dynamic-body"]);

                if (AFRAME.components["dynamic-body"]) {
                    console.log("✅ Sistema de físicas CARGADO correctamente.");
                } else {
                    console.error("❌ ERROR: El sistema de físicas NO se ha cargado.");
                }
            }, 2000);
        });
    </script>

    <!-- Scripts del juego -->
    <script src="js/scene.js"></script>
    <script src="js/player.js"></script>

</head>

<body>
    <div id="scene-container"></div> <!-- Aquí se cargará la escena -->
</body>

</html>