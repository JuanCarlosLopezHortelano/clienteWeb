function ClienteWS() {
    this.email;
    this.codigoPartida = 0;
    this.socket;
    this.color;
    this.testigo;
    this.ini = function(email) {
        this.email = email;
        if (!this.socket) {
            this.socket = io.connect("http://localhost:3001");
            this.lanzarServer();
        }
    }

    this.conectar = function() {
        if (!this.socket) {
            this.socket = io.connect("http://localhost:3001");
            this.lanzarServer();
        }
    }

    this.lanzarServer = function() {
        let cli = this;
        this.socket.on('connect', function() {
            console.log("Usuario conectado al servidor de WebSockets");
        });

        this.crearPartida = function() {
            this.socket.emit("crearPartida", { "email": this.email });
            this.color = 'white';
            this.testigo = 'white';
        }

        this.unirAPartida = function(codigo) {
            console.log("VA A EMITIR ", this.email, codigo);
            this.codigoPartida = parseInt(codigo, 10); 
            cli.socket.emit("unirAPartida", { "email": this.email, "codigo": codigo });
            this.color = 'black';
            this.testigo = 'white';
        
        }

        this.socket.on("partidaCreada", function(datos) {
            console.log("Código de la partida creada:", datos.codigo);
            cli.codigoPartida = parseInt(datos.codigo, 10);
        });

        this.socket.on("unidoAPartida", function(datos) {
            console.log("Jugador unido:", datos.email);
        });

        this.socket.on("listaPartidas", function(lista) {
            console.log("Lista de partidas:", lista);
            cw.actualizarPartidas(lista);
        });

        this.partidasDisponibles = function() {
            this.socket.emit("partidasDisponibles");
        };

        this.socket.on("error", function(error) {
            console.log("Error:", error.message);
        });

        this.enviarMovimiento = function(datos) {
            console.log(this.codigoPartida);
            if (this.codigoPartida) {
                datos.codigo = this.codigoPartida;
                datos.color = this.color
                this.socket.emit('move', datos);
            } else {
                console.error('No se ha unido a ninguna partida.');
            }
        }

        this.socket.on('move', (data) => {
            console.log('Movimiento recibido:', data);
            
            console.log(data.codigo)
            console.log(this.codigoPartida)
            console.log(this.color)
            console.log(data.color)
            if(data.color == 'white') {
                this.testigo = 'black'
            }

            else {this.testigo  = 'white'}

            console.log(this.testigo)

           /*  // Gestionar el cambio de cronómetros basado en el turno
            if (data.color === 'white') {
                cw.activarTemporizadorNegro();
            } else {
                cw.activarTemporizadorBlanco();
            } */
            //if (data.codigo == this.codigoPartida) {
            cw.actualizarTablero(data);
            //};

        });
    }
}