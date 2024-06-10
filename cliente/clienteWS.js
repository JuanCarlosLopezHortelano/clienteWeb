function ClienteWS(){
    this.email;
    this.codigoPartida = 0;
    this.socket=undefined;
    this.ini=function(){
        this.socket=io.connect("http://localhost:3001");
    }
    this.ini();
    this.conectar=function(){
        this.socket=io.connect("http://localhost:3001");
        this.lanzarServer();
    }

    this.lanzarServer=function(){
        let cli = this;
        this.socket.on('connect', function(){   						
            console.log("Usuario conectado al servidor de WebSockets");
        });
    
        this.crearPartida=function(){
            this.socket.emit("crearPartida",{"email":this.email});
        }
       
        this.unirAPartida=function(codigo){
            console.log("VA A EMITIR ",this.email, codigo);
            this.codigoPartida = codigo;
            this.socket.emit("unirAPartida",{"email": this.email, "codigo": codigo});
        }

        this.socket.on("partidaCreada", function(datos) {
            console.log("Código de la partida creada:", datos.codigo);
            cli.codigoPartida = datos.codigo;  // Usar la referencia a 'cli' en lugar de 'this'
            // cw mostrar esperando rival
        });
     
        this.socket.on("unidoAPartida", function(datos) {
            console.log("Jugador unido:", datos.email);
            // cw mostrar jugador unido
        });       
  
        this.socket.on("listaPartidas", function(lista) {
            console.log("Lista de partidas:", lista);
            cw.actualizarPartidas(lista);
            // cw mostrarListaPartidas
        });

        this.partidasDisponibles=function(){
            this.socket.emit("partidasDisponibles");
        };
            
        this.socket.on("error", function(error) {
            console.log("Error:", error.message);
        });

        this.enviarMovimiento = function(datos){
            console.log(this.codigoPartida)
            if (this.codigoPartida) {
                datos.codigo = this.codigoPartida; // Incluir el código de la partida en los datos del movimiento
                this.socket.emit('move', datos);
            } else {
                console.error('No se ha unido a ninguna partida.');
            }
        }

        this.socket.on('move', (data) => {
            console.log('Move received:', data);
            cw.actualizarTablero(data);
        });
    }
}
