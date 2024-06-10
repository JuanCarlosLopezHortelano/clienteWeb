function ControlWeb() {

    this.mostrarAgregarUsuario = function () {
        // Crear un formulario
        let cadena = '<div class="form-group" id="mAU">';
        cadena = cadena + '<div class="card"><div class="card-body">';
        cadena = cadena + '<label for="nick">Introduce el Nick:</label>';
        cadena = cadena + '<input type="text" id="nick" class="form-control" />';
        cadena = cadena + '<button id="btnAU" type="submit" class="btn btn-primary">Submit</button>';
        cadena=cadena+'<div><a href="/auth/google"><img src="./cliente/img/web_light_rd_SI@1x.png" style="height:40px;"></a></div>';

        
        cadena = cadena + '</div>';
        cadena = cadena + '</div></div></div>'; 

        // Agregar el formulario al elemento con el ID "au"
        $("#au").append(cadena);
        
        // Manejar el evento de clic del botón "Submit"
        $("#btnAU").on("click", function () {
            let nick = $("#nick").val();
            
            if(nick){
                $("#mAU").remove();

                rest.agregarUsuario2(nick);}
        });
    }




    
    this.mostrarGoogle = function () {

        // Crear un botón de Google para iniciar sesión
        let botonGoogle = '<div class="text-center"><a href="/auth/google"><img src="./cliente/img/web_light_rd_SI@1x.png" style="height:40px;"></a></div>';
        // Agregar el botón de Google después del formulario de inicio de sesión
        $("#google").append(botonGoogle);
    }


    
    this.comprobarSesion = function() {
        //let nick = localStorage.getItem("nick");
        let nick = $.cookie("nick");
        
        if (nick) {
          this.eliminarBtnExit();
          cw.eliminarBtnGoogle();
          cw.mostrarMsg("Bienvenido al sistema3, " + nick);
          ws.email = nick;
      
          setTimeout(() => {
           
            this.limpiar(); // Llama a la función limpiar después de 6 segundos
            this.mostrarMenuPartidas(); // Llama a la función mostrarMenuPartidas después de limpiar
          }, 1000); // 6000 milisegundos = 6 segundos
      
          // Puedes omitir esta línea si no necesitas mostrar el menú de partidas inmediatamente
          // this.mostrarMenuPartidas();
        } else {
          cw.mostrarRegistro();
          // cw.init();
        }
      };

    this.eliminarBtnGoogle=function(){
            $("#g_id_signin").remove();
    }

    this.eliminarBtnExit=function(){
        $('#Exit').remove();
    }


        this.init = function() {
                let cw = this;
                google.accounts.id.initialize({
                //PRODUCCIOn
               // client_id: "937465366567-5qcj9vucp1pah0muucdkfkpsv2pe2ls5.apps.googleusercontent.com", 
                client_id: "937465366567-m4lurf473go0f19ou1jrevj7n3oat164.apps.googleusercontent.com", 
                auto_select: false,
                callback: cw.handleCredentialsResponse
                });google.accounts.id.prompt();}


        this.handleCredentialsResponse=function(response){
                let jwt=response.credential;
                //let user=JSON.parse(atob(jwt.split(".")[1]));
                //console.log(user.name);
                //console.log(user.email);
                //console.log(user.picture);
                rest.enviarJwt(jwt);
                }

    // Función para agregar el botón
this.agregarBotonExit = function() {
        let cadena = '<div class="form-group" id="mExit">';
        cadena += '<button id="btnEx" type="button" class="btn btn-primary">Cerrar Sesion</button>';
        cadena += '</div>';
        $("#Exit").append(cadena);
        $("#btnEx").on("click", function () {
            // Mostrar un mensaje de confirmación al usuario
            if (confirm("¿Estás seguro de que deseas salir?")) {
                // Si el usuario confirma, eliminar "nick" del localStorage y recargar la página
                $.removeCookie("nick");
                location.reload();
                rest.cerrarSesion();
            }
        });
    }


    this.mostrarModal=function(m){
        $("#msg").remove();
        let cadena="<div id='msg'>"+m+"</div>";
        $('#mBody').append(cadena)
        $('#miModal').modal();
 // $('#btnModal').on('click',function(){
 // })
 }

    

$(document).ready(function () {
        
        $("#btnExit").on("click", function () {
            // Mostrar un mensaje de confirmación al usuario
            if (confirm("¿Estás seguro de que deseas salir?")) {
                // Si el usuario confirma, eliminar "nick" del localStorage y recargar la página
                $.removeCookie("nick");
                location.reload();
                rest.cerrarSesion();
            }
        });
    });
    


    this.limpiar = function(){
        $("#au").remove();
        $("#google").remove();
        $("#fmRegistro").remove();
        $('#mMsg').remove();
        $('Exit').remove()
       
        $('#titleSistema').remove();

    }

    this.mostrarObtenerUsuarios = function () {
        let cadena = '<div class="form-group" id="mOU">';
        cadena = cadena + '<label for="nick">Usuarios: </label>';
        cadena = cadena + '<button id="btnOU" type="button" class="btn btn-primary">ObtenerUsuarios</button>';
        cadena = cadena + '</div';

        $("#ou").append(cadena);

        $("#btnOU").on("click", function () {
            rest.obtenerUsuarios();
            $("#mOU").remove();
        });
    }

    this.mostrarModal=function(m){
        $("#msg").remove();
        let cadena="<div id='msg'>"+m+"</div>";
        $('#mBody').append(cadena)
        $('#miModal').modal();
        // $('#btnModal').on('click',function(){
        // })
        }



    this.mostrarNumeroUsuarios = function () {
        let cadena = '<div class="form-group" id="mNU">';
        cadena = cadena + '<label for="nick">Numero de Usuarios:</label>';
        cadena = cadena + '<button id="btnNU" type="button" class="btn btn-primary">Pulsa</button>';
        cadena = cadena + '</div';

        $("#nu").append(cadena);

        $("#btnNU").on("click", function () {
            rest.numeroUsuarios();
            $("#mNU").remove();
        });
    }

    this.mostrarUsuarioActivo = function () {
        let cadena = '<div class="form-group" id="mUA">';
        cadena = cadena + '<label for="nick">Introduce el nick para saber si está activo o no:</label>';
        cadena = cadena + '<input type="text" class="form-control" id="nick">';
        cadena = cadena + '<button id="btnUA" type="submit" class="btn btn-primary">¿Esta Activo?</button>';
        cadena = cadena + '</div>';

        $("#ua").append(cadena); // ua = usuario activo

        $("#btnUA").on("click", function () {
            let nick = $("#nick").val();
            rest.usuarioActivo(nick);
            $("#mUA").remove();
        });
    }

    this.mostrarEliminarUsuario = function () {
        let cadena = '<div class="form-group" id="mEU">';
        cadena = cadena + '<label for="nick">Introduce el nick a eliminar:</label>';
        cadena = cadena + '<input type="text" class="form-control" id="nick">';
        cadena = cadena + '<button id="btnEU" type="submit" class="btn btn-primary">Eliminar</button>';
        cadena = cadena + '</div>';

        $("#eu").append(cadena); // eu = eliminar usuario

        $("#btnEU").on("click", function () {
            let nick = $("#nick").val();
            rest.eliminarUsuario(nick);
            $("#mEU").remove();
        });
    }

    this.mostrarMsg=function(msg){

        $('#mMsg').remove()
        let cadena='<h2 id="mMsg">'+msg+'</h2>';
        $('#msg').append(cadena);
        this.agregarBotonExit();
    }

    this.mostrarRegistro=function(){
        if ($.cookie('nick')){
            return true;
        };
        
        
        $("#fmRegistro").remove();
        $("#registro").load("./cliente/registro.html",function(){
            $("#btnRegistro").on("click",function(){
                let email=$("#email").val();
                let pwd=$("#pwd").val();
                if (email && pwd){
                    console.log("Email: " + email + " Password: " + pwd)
                    rest.registrarUsuario(email,pwd);
                    
                }
            });
        });
    }

    

        this.mostrarLogin = function() {
            if ($.cookie('nick')) {
                return true;
            }
            
            $("#fmRegistro").remove();

            $("#registro").load("./cliente/login.html", function() {
        
                $("#btnLogin").on("click", function(event) {
                    event.preventDefault();

                    let email = $("#usuarioLogin").val();
                    let pwd = $("#pwdLogin").val();
                    if (email && pwd) {
                        
                        console.log("Email: " + email + " Password: " + pwd);
                        rest.loginUsuario(email, pwd);
                    }

                    
                });
            });
        }

       this.actualizarPartidas = function (partidas) {
            const tabla = document.getElementById('tablaPartidas').getElementsByTagName('tbody')[0];
            tabla.innerHTML = ''; // Limpiar la tabla antes de actualizarla
        
            partidas.forEach(partida => {
                const nuevaFila = tabla.insertRow();
        
                const celdaCodigo = nuevaFila.insertCell(0);
                const celdaPropietario = nuevaFila.insertCell(1);
                const celdaUnir = nuevaFila.insertCell(2);

                celdaCodigo.textContent = partida.codigo;
                celdaPropietario.textContent = partida.jugadores[0];



                 // Crear el botón para unirse a la partida
                const btnUnirse = document.createElement('button');
                btnUnirse.textContent = 'Unirse';
                btnUnirse.classList.add('btn', 'btn-primary');
                btnUnirse.onclick = function() {
                    ws.unirAPartida(partida.codigo);
                };

                celdaUnir.appendChild(btnUnirse);
            });
        }
        

        this.mostrarMenuPartidas = function() {

            console.log("AQUIII SI")
            $("#fmLogin").remove();
            console.log("AQUIII SNO")

            console.log('Cargando menupartidas.html...');


            $("#registro").load("./cliente/menupartidas.html", function(response, status, xhr) {
                if (status == "error") {
                    console.log("Error al cargar menupartidas.html: " + xhr.status + " " + xhr.statusText);
                    
                }
                
                else{

        
                console.log('Archivo menupartidas.html cargado correctamente.');
        
                $("#btnUnirPartida").on("click", function(event) {
                event.preventDefault();
                console.log('btnUnirPartida clickeado');
        
                    let codigoPartida = $("#idPartida").val();
                    
                    if (codigoPartida) {
                    console.log("codigoPartida: " + codigoPartida);
                   
                    ws.unirAPartida(codigoPartida);
                    cw.mostrarTablero();
                    }
                    })
        
                $("#btnCrearPartida").on("click", function(event) {
                    console.log('btnCrearPartida clickeado');
                    console.log("Partida creada");
                    ws.crearPartida();
                    cw.mostrarTablero();
                });

              ws.partidasDisponibles();
               

            }});
        }
        

        this.mostrarFormulario = function(formularioId) {

            this.limpiar();
            if (formularioId === 'fmRegistro') {
                // Muestra el formulario de registro
                this.mostrarRegistro()
            } else if (formularioId === 'fmLogin') {
                // Muestra el formulario de inicio de sesión
                this.mostrarLogin()
            } else if (formularioId === 'fmTablero') {
                // Muestra el formulario de inicio de sesión
                this.mostrarTablero()}
            else if (formularioId === 'fmMenuPartidas') {
                    // Muestra el formulario de inicio de sesión
                    this.mostrarMenuPartidas()
            } else {
                console.log('Formulario no válido');
            }
        }
        
        
    
        this.mostrarTablero = function() {
            console.log("Cargando tablero de damas...");
        
            $("#fmMenuPartidas").remove();
        
            $("#registro").load("./cliente/tablero2.html", function(response, status, xhr) {
                if (status == "error") {
                    console.log("Error cargando tablero2.html: " + xhr.status + " " + xhr.statusText);
                } else {
                    document.getElementById("fmTablero").innerHTML = `
                        <div class="checkers-container">
                            <div class="timers">
                                <div id="timer1" class="timer">00:00</div>
                                <div id="timer2" class="timer">00:00</div>
                            </div>
                            <div class="board">
                                ${Array(8).fill(null).map((_, rowIndex) => `
                                    ${Array(8).fill(null).map((_, colIndex) => `
                                        <div class="cell ${((rowIndex + colIndex) % 2 === 0) ? 'light' : 'dark'}"></div>
                                    `).join('')}
                                `).join('')}
                            </div>
                        </div>
                    `;
        
                    const blackPieces = [];
                    const whitePieces = [];
                    const cells = document.querySelectorAll('.cell');
                    cells.forEach((cell, index) => {
                        const row = Math.floor(index / 8);
                        const col = index % 8;
        
                        if (row < 3 && (row + col) % 2 === 1) {
                            cell.innerHTML = '<div class="piece black"></div>';
                            blackPieces.push(cell.querySelector('.piece'));
                        } else if (row > 4 && (row + col) % 2 === 1) {
                            cell.innerHTML = '<div class="piece white"></div>';
                            whitePieces.push(cell.querySelector('.piece'));
                        }
                    });
        
                    let selectedPiece = null;
        
                    function deselectPiece() {
                        if (selectedPiece) {
                            selectedPiece.classList.remove('selected');
                            selectedPiece = null;
                            cells.forEach(cell => cell.classList.remove('valid-move'));
                        }
                    }
        
                    function highlightValidMoves(cell) {
                        const index = Array.from(cells).indexOf(cell);
                        const row = Math.floor(index / 8);
                        const col = index % 8;
                        const directions = [
                            [-1, -1], [-1, 1], [1, -1], [1, 1],
                            [-2, -2], [-2, 2], [2, -2], [2, 2]
                        ];
        
                        if (selectedPiece.classList.contains('queen')) {
                            const queenDirections = [
                                [-1, -1], [-1, 1], [1, -1], [1, 1]
                            ];
        
                            queenDirections.forEach(direction => {
                                let [rowOffset, colOffset] = direction;
                                let newRow = row + rowOffset;
                                let newCol = col + colOffset;
                                let capturing = false;
        
                                while (newRow >= 0 && newRow < 8 && newCol >= 0 && newCol < 8) {
                                    const newCell = cells[newRow * 8 + newCol];
                                    if (newCell.querySelector('.piece')) {
                                        if (capturing || newCell.querySelector('.piece').classList.contains(selectedPiece.classList.contains('black') ? 'black' : 'white')) {
                                            break;
                                        }
                                        capturing = true;
                                    } else {
                                        if (capturing) {
                                            newCell.classList.add('valid-move');
                                            break;
                                        }
                                        newCell.classList.add('valid-move');
                                    }
                                    newRow += rowOffset;
                                    newCol += colOffset;
                                }
                            });
                        } else {
                            directions.forEach(direction => {
                                const [rowOffset, colOffset] = direction;
                                const newRow = row + rowOffset;
                                const newCol = col + colOffset;
                                if (newRow >= 0 && newRow < 8 && newCol >= 0 && newCol < 8) {
                                    const newCell = cells[newRow * 8 + newCol];
                                    const midRow = row + rowOffset / 2;
                                    const midCol = col + colOffset / 2;
                                    const midCell = cells[midRow * 8 + midCol];
        
                                    if (!newCell.querySelector('.piece') && ((selectedPiece.classList.contains('black') && rowOffset > 0) || (selectedPiece.classList.contains('white') && rowOffset < 0))) {
                                        if (Math.abs(rowOffset) === 2 && midCell.querySelector('.piece') && !midCell.querySelector('.piece').classList.contains(selectedPiece.classList.contains('black') ? 'black' : 'white')) {
                                            newCell.classList.add('valid-move');
                                        } else if (Math.abs(rowOffset) === 1) {
                                            newCell.classList.add('valid-move');
                                        }
                                    }
                                }
                            });
                        }
                    }
        
                    function promoverAReina(piece, color) {
                        piece.classList.add('queen');
                        if (color === 'black') {
                            piece.style.backgroundImage = 'url("./cliente/img/reinaNegra.png")';
                        } else if (color === 'white') {
                            piece.style.backgroundImage = 'url("./cliente/img/reinaBlanca.png")';
                        }
                        console.log(`Promovida a reina: ${color}`);
                    }
        
                    function checkWinCondition() {
                        if (blackPieces.length === 0) {
                            alert('¡Las piezas blancas ganan!');
                        } else if (whitePieces.length === 0) {
                            alert('¡Las piezas negras ganan!');
                        }
                    }
        
                    cells.forEach(cell => {
                        cell.addEventListener('click', () => {
                            const piece = cell.querySelector('.piece');
                            if (piece) {
                                if (selectedPiece) {
                                    deselectPiece();
                                }
                                selectedPiece = piece;
                                piece.classList.add('selected');
                                highlightValidMoves(cell);
                            } else if (selectedPiece && cell.classList.contains('valid-move')) {
                                const index = Array.from(cells).indexOf(cell);
                                const row = Math.floor(index / 8);
                                const col = index % 8;
                                const pieceRow = Math.floor(Array.from(cells).indexOf(selectedPiece.parentElement) / 8);
                                const pieceCol = Array.from(cells).indexOf(selectedPiece.parentElement) % 8;
                                const midRow = (row + pieceRow) / 2;
                                const midCol = (col + pieceCol) / 2;
        
                                if (Math.abs(row - pieceRow) === 2 && Math.abs(col - pieceCol) === 2) {
                                    const midCell = cells[midRow * 8 + midCol];
                                    const capturedPiece = midCell.querySelector('.piece');
                                    if (capturedPiece) {
                                        midCell.innerHTML = ''; // Eliminar la pieza capturada
                                        if (capturedPiece.classList.contains('black')) {
                                            const index = blackPieces.indexOf(capturedPiece);
                                            if (index > -1) blackPieces.splice(index, 1);
                                        } else if (capturedPiece.classList.contains('white')) {
                                            const index = whitePieces.indexOf(capturedPiece);
                                            if (index > -1) whitePieces.splice(index, 1);
                                        }
                                    }
                                }
        
                                const moveData = {
                                    from: { row: pieceRow, col: pieceCol },
                                    to: { row: row, col: col }
                                };
                                
                                // Guardar el movimiento en una variable
                                const testMove = moveData;
                                console.log("Movimiento realizado:", testMove);
        
                                // Actualizar el tablero
                                cw.actualizarTablero(testMove);
        
                                cell.appendChild(selectedPiece);
        
                                // Emitir el movimiento al servidor
                                ws.enviarMovimiento(moveData); 
        
                                if (selectedPiece.classList.contains('black') && row === 7) {
                                    promoverAReina(selectedPiece, 'black');
                                } else if (selectedPiece.classList.contains('white') && row === 0) {
                                    promoverAReina(selectedPiece, 'white');
                                }
        
                                deselectPiece();
                                checkWinCondition();
                            } else {
                                deselectPiece();
                            }
                        });
                    });
        
                    let timer1 = document.getElementById('timer1');
                    let timer2 = document.getElementById('timer2');
                    let time1 = 0;
                    let time2 = 0;
                    let interval1, interval2;
        
                    function startTimer1() {
                        interval1 = setInterval(() => {
                            time1++;
                            timer1.textContent = formatTime(time1);
                        }, 1000);
                    }
        
                    function startTimer2() {
                        interval2 = setInterval(() => {
                            time2++;
                            timer2.textContent = formatTime(time2);
                        }, 1000);
                    }
        
                    function formatTime(seconds) {
                        const mins = Math.floor(seconds / 60);
                        const secs = seconds % 60;
                        return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
                    }
        
                    startTimer1();
                    startTimer2();
                }
            });
        };
        
        
        this.actualizarTablero = function(movimiento) {
            const fromRow = movimiento.from.row;
            const fromCol = movimiento.from.col;
            const toRow = movimiento.to.row;
            const toCol = movimiento.to.col;
        
            const cells = document.querySelectorAll('.cell');
            const fromCell = cells[fromRow * 8 + fromCol];
            const toCell = cells[toRow * 8 + toCol];
            
            const piece = fromCell.querySelector('.piece');
            if (piece) {
                toCell.appendChild(piece);
                
                // Handle capturing
                if (Math.abs(fromRow - toRow) === 2 && Math.abs(fromCol - toCol) === 2) {
                    const midRow = (fromRow + toRow) / 2;
                    const midCol = (fromCol + toCol) / 2;
                    const midCell = cells[midRow * 8 + midCol];
                    const capturedPiece = midCell.querySelector('.piece');
                    if (capturedPiece) {
                        midCell.innerHTML = ''; // Remove the captured piece
                    }
                }
        
                // Promote to queen if necessary
                if (piece.classList.contains('black') && toRow === 7) {
                    promoverAReina(piece, 'black');
                } else if (piece.classList.contains('white') && toRow === 0) {
                    promoverAReina(piece, 'white');
                }
            }
        };
        
        function promoverAReina(piece, color) {
            piece.classList.add('queen');
            if (color === 'black') {
                piece.style.backgroundImage = 'url("./cliente/img/reinaNegra.png")';
            } else if (color === 'white') {
                piece.style.backgroundImage = 'url("./cliente/img/reinaBlanca.png")';
            }
            console.log(`Promovida a reina: ${color}`);
        }




    }