document.addEventListener("scene-loaded", function () {
    console.log("✅ La escena está lista, iniciando player.js...");

    setTimeout(() => {
        let player = document.querySelector("#player");

        if (player) {
            console.log("✅ Jugador detectado. Aplicando componente player-movement...");
            player.setAttribute("player-movement", "");
        } else {
            console.error("❌ No se encontró el elemento #player en la escena.");
        }
    }, 1000); // Espera 1 segundo para asegurarse de que #player existe
});

AFRAME.registerComponent("player-movement", {
    init: function () {
        this.velocity = new THREE.Vector3();
        this.keys = { ArrowUp: false, ArrowDown: false, ArrowLeft: false, ArrowRight: false, Space: false };

        window.addEventListener("keydown", (event) => this.handleKeyDown(event));
        window.addEventListener("keyup", (event) => this.handleKeyUp(event));

        this.isOnGround = false; // Estado inicial

        this.el.addEventListener("collide", (e) => {
            console.log("💥 Colisión con", e.detail.body.el.id);
            if (e.detail.body.el.id === "ground") {
                this.isOnGround = true; // Detectamos que estamos en el suelo
            }
        });
    },

    tick: function () {
        let body = this.el.body;
        if (!body) return;

        let force = new CANNON.Vec3();

        // Movimiento del jugador con físicas
        if (this.keys.ArrowUp) force.z -= 2;
        if (this.keys.ArrowDown) force.z += 2;
        if (this.keys.ArrowLeft) force.x -= 2;
        if (this.keys.ArrowRight) force.x += 2;

        // Aplicar impulso al cuerpo físico
        body.applyImpulse(force, new CANNON.Vec3(0, 0, 0));

        // Salto con detección de suelo
        if (this.keys.Space && this.isOnGround) {
            console.log("🆙 Saltando...");
            body.applyImpulse(new CANNON.Vec3(0, 10, 0), new CANNON.Vec3(0, 0, 0));
            this.isOnGround = false; // Evita saltos dobles
        }
    },

    handleKeyDown: function (event) {
        if (this.keys.hasOwnProperty(event.key)) {
            this.keys[event.key] = true;
        }
    },

    handleKeyUp: function (event) {
        if (this.keys.hasOwnProperty(event.key)) {
            this.keys[event.key] = false;
        }
    }
});