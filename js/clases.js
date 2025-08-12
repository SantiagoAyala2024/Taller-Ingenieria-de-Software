class Sistema{
    constructor(){
        
        this.listaAdministradores = [
            new Administrador("Admin","1234")
        ];

        this.listaReservas = [];

        this.listaServicios = [];

        this.listaBarberos = [];

        this.usuarioLogueado = null;
    }

    registrarReserva(nombre, apellido, email, telefono, barbero, servicios, fecha){
            
        const fechaHora = new Date(fecha);

        const regexSoloLetrasYEspacios = /^[a-zA-ZáéíóúÁÉÍÓÚ\s]+$/;
        
        if(!regexSoloLetrasYEspacios.test(nombre) || !regexSoloLetrasYEspacios.test(apellido)){
            throw new Error("El nombre y apellido no pueden ser vacios, tener caracteres especiales ni números");
        }

        if(email.indexOf('@') === -1){
            throw new Error("El email debe contener un arroba @");;
        }

        if(telefono.length != 9){
            throw new Error("Telefono invalido");
        }

        if(barbero == -1){
            throw new Error("El barbero no puede ser vacio");
        }

        if(servicios.length == ''){
            throw new Error("El servicio no puede ser vacio");
        }

        if(fecha === ''){
            throw new Error("La fecha no puede ser vacia");
        }

        let unReserva = new Reserva(nombre, apellido, email, telefono, barbero, servicios, fechaHora);

        this.listaReservas.push(unReserva);
        
        localStorage.setItem('reservas', JSON.stringify(this.listaReservas));
        
    }

    registrarServicio(nombre, descripcion, precio, duracion){
            
        let unServicio = new Servicio(nombre, descripcion, precio, duracion);
            
        this.listaServicios.push(unServicio);
    }

    registrarBarbero(nombre, descripcion, foto){

        let unBarbero = new Barbero(nombre, descripcion, foto);
            
        this.listaBarberos.push(unBarbero);
    }

    verificarLogin(user,pass){
            
        let loginOK = false;
        
        for (let pos = 0; pos < this.listaAdministradores.length && !loginOK; pos++){
                
            let objUsuario = this.listaAdministradores[pos];
                
            if (objUsuario.user == user && objUsuario.pass == pass){
                loginOK = true;
                this.usuarioLogueado = objUsuario;
            }
        }

        return loginOK;
    }

    obtenerServicios() {
        return this.listaServicios;
    }
        
    obtenerBarberos() {
        return this.listaBarberos;
    }

    obtenerReservas() {
        return this.listaReservas;
    }
}
    

let idAdmin = 1;
let idReserva;

let reservas = [];
if (typeof localStorage !== 'undefined') {
    reservas = JSON.parse(localStorage.getItem('reservas')) || [];
}
    
    if (reservas.length > 0) {
        
        const ultimaReserva = reservas[reservas.length - 1];
        
        idReserva = ultimaReserva.id + 1;
    } else {
        idReserva = 1;
    }


let idServicio = 1;
let idBarbero = 1;

class Administrador {
    constructor(user,pass) {
        this.id = idAdmin;
        this.user = user;
        this.pass = pass;
        idAdmin++;
    }
}

class Reserva{
    constructor(nombre, apellido, email, telefono, barbero, servicios, fecha){
        this.id = idReserva;
        this.nombre = nombre;
        this.apellido = apellido;
        this.email = email;
        this.telefono = telefono;
        this.barbero = barbero;
        this.servicios = servicios;
        this.fecha = fecha;
        idReserva++;
    }
}

class Servicio{
    constructor(nombre, descripcion, precio, duracion){
        this.id = idServicio;
        this.nombre = nombre;
        this.descripcion = descripcion;
        this.precio = Number(precio);
        this.duracion = duracion;
        idServicio++;
    }
}

class Barbero{
    constructor(nombre, descripcion, foto){
        this.id = idBarbero;
        this.nombre = nombre;
        this.descripcion = descripcion;
        this.foto = foto;
        idBarbero++;
    }
}

module.exports = {
  Sistema,
  Administrador,
  Reserva,
  Servicio,
  Barbero,
};

