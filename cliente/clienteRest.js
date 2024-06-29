function ClienteRest() {

    this.url = "http://localhost:3001"
    
    this.agregarUsuario=function(nick){


        var cli=this;
        $.getJSON(this.url+"/agregarUsuario/"+nick,function(data){
        let msg="El nick "+nick+" está ocupado";
        if (data.nick!=-1){
        console.log("Usuario "+nick+" ha sido registrado");
        msg="Bienvenido al sistema1, "+nick;
        $.cookie("nick", nick);
        ws.email = nick
        }
        else{
            console.log("El nick esta en uso");
            msg="El nick esta en uso"
        }
        cw.mostrarMsg(msg);
        });
    }
    
    this.agregarUsuario2 = function(nick) {
        $.ajax({
            type: 'GET',
            url:this.url+ '/agregarUsuario/' + nick,
            success: function(data) {
                if (data.nick != -1) {
                    console.log("Usuario " + nick + " ha sido registrado");
                } else {
                    console.log("El nick ya está ocupado");
                }
            },
            error: function(xhr, textStatus, errorThrown) {
                console.log("Error al realizar la solicitud.");
                console.log("Estado: " + textStatus);
                console.log("Error: " + errorThrown);
            }
        });
    }

    this.obtenerUsuarios = function () {
        
        $.getJSON(this.url+"/obtenerUsuarios/", function (data) {
            console.log(data);
        });
    };

    this.numeroUsuarios = function () {
        
        $.getJSON(this.url+"/numeroUsuarios/", function (data) {
            console.log(data);
        });
    };

    this.eliminarUsuario = function (nick) {
        
        $.getJSON(this.url+"/eliminarUsuario/" + nick, function (data) {
            if (data.nick !== -1) {
                console.log("Usuario " + nick + " ha sido eliminado");
            } else {
                console.log("El nick ya está eliminado o no existe");
            }
        });
    };
    

    this.usuarioActivo = function (nick) {
        var cli=this;
        $.getJSON(this.url+"/usuarioActivo/" + nick, function (data) {
            if (data.nick !== -1) {
                console.log("Usuario " + nick + " Existe");
            } else {
                console.log("El nick no existe");
            }
        });
    };



    // Registro de usuario
    this.registrarUsuario=function(email,password){
        
		$.ajax({
		type:'POST',
		url:this.url+'/registrarUsuario',

		data: JSON.stringify({"email":email,"password":password}),
        
		success: function(data){

				if (data.nick!==-1){				
					console.log("Usuario "+data.nick+" ha sido registrado");
                    
					cw.mostrarLogin();
				}
				else{
                    cw.limpiar()
					cw.mostrarMsg("El nick está ocupado");

                    cw.mostrarMsg("Hay un usuario registrado con ese email");
                    cw.mostrarModal("No se ha podido registrar el usuario");
                    cw.mostrarLogin();

				} },
            error: function (xhr, textStatus, errorThrown) {
                console.log("Status: " + textStatus);
                console.log("Error: " + errorThrown);
                cw.mostrarMsg("ERROR");
		},
		contentType:'application/json'
		});
	}





        
        this.loginUsuario = function(email, password) {
            $.ajax({
                type: 'POST',
                url:this.url+ '/loginUsuario',
                data: JSON.stringify({ "email": email, "password": password }),
                success: function(data) {
                    if (data.email) {
                        console.log("Inicio de sesión exitoso para " + data.email);
                        $.cookie("token",data.data);
                        $.cookie("nick", data.email);
                        ws.email=data.email;

                        cw.limpiar();
                        cw.mostrarMsg("Bienvenido de nuevo22, " + data.email);
                        
                        cw.limpiar();
                        //cw.mostrarFormulario('fmTablero');
                       // cw.mostrarFormulario('fmMenuPartidas')
                        cw.eliminarBtnGoogle();

                        cw.mostrarMenuPartidas()
                        console.log("AQUIIII")

                    } else {
                        cw.limpiar()
                        console.log("Credenciales incorrectas o usuario no registrado");
                        cw.mostrarModal("Inicio de sesion fallido");

                    }

                    
                },
                error: function(xhr, textStatus, errorThrown) {
                    console.log("Error al realizar la solicitud.");
                    console.log("Status: " + textStatus);
                    console.log("Error: " + errorThrown);
                },
                contentType: 'application/json'
            });
        }

        this.cerrarSesion=function(){
            $.getJSON(this.url+"/cerrarSesion",function(){
            console.log("Sesión cerrada");
            $.removeCookie("nick");
            });
            }


this.enviarJwt=function(jwt){
    $.ajax({
        type:'POST',
        url:this.url+'/enviarJwt',
        data: JSON.stringify({"jwt":jwt}),

        success:function(data){
            let msg="El nick "+data.nick+" está ocupado";
            if (data.email!=-1){
                console.log("Usuario "+data.email+" ha sido registrado");
                ws.email = data.email;
                msg="Bienvenido al sistemaaaa, " + data.email;
                $.cookie("nick",data.email);
                $.cookie("token",data.data);
                ws.email=data.email;

                console.log("AQUIIII")
                cw.limpiar();
                cw.mostrarMsg(msg);
                cw.eliminarBtnGoogle();
               

                cw.limpiar();
                console.log("AQUIIII-SI");
               // cw.mostrarMenuPartidas()

                console.log("AQUIIII-NO");
            }
            else{
                console.log("El nick ya está ocupado");
            }
        
        },
        error:function(xhr, textStatus, errorThrown){
            //console.log(JSON.parse(xhr.responseText));
            console.log("Status: " + textStatus);
            console.log("Error: " + errorThrown);
        },
        contentType:'application/json'
    
        //dataType:'json'
    });
    }








    
    


    

        }

function onSignIn(response) {
            let jwt=response.credential;
            rest.enviarJwt(jwt);
            cw.eliminarBtnGoogle();
            cw.limpiar();
            cw.mostrarMenuPartidas()

            }




