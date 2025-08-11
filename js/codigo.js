const sistema = new Sistema();
let arrayHoras = ["9:00","9:30","10:00","10:30","11:00","11:30","12:00","12:30","13:00","13:30","14:00","14:30","15:00","15:30","16:00","16:30","17:00","17:30","18:00","18:30","19:00","19:30","20:00","20:30","21:00"];

window.addEventListener("load", inicio);

function inicio(){
    precargarDatos();
    cargarSelectBarberos();
    cargarSelectServicios();
    mostrarFechaHoy();
    mostrarSeccionBarberos();
    
   const botonRecargar = document.querySelector(".btnRecargarPagina");
    if (botonRecargar) {
        botonRecargar.addEventListener('click', function() {
            location.reload();
        });
    }
    const botonRecargar1 = document.querySelector("#home-mobile");
    if (botonRecargar1) {
        botonRecargar1.addEventListener('click', function() {
            location.reload();
        });
    }


    const btnRegistro = document.querySelector("#btnRegistro");
    if (btnRegistro) {
        btnRegistro.addEventListener('click', formularioReserva);
    }

    const btnLogin = document.querySelector("#btnLogin");
    if (btnLogin) {
        btnLogin.addEventListener('click', login);
    }

    const btnIniciarSesion = document.querySelector("#iniciarSesion");
    if (btnIniciarSesion) {
        btnIniciarSesion.addEventListener('click', mostrarSeccionLogin);
    }

    const btnIniciarSesionMobile = document.querySelector("#iniciarSesion-mobile");
    if (btnIniciarSesionMobile) {
        btnIniciarSesionMobile.addEventListener('click', mostrarSeccionLogin);
    }

    const btnLogout = document.querySelector("#logout");
    if (btnLogout) {
        btnLogout.addEventListener('click', cerrarSesion);
    }

    const btnLogoutMobile = document.querySelector("#logout-mobile");
    if (btnLogoutMobile) {
        btnLogoutMobile.addEventListener('click', cerrarSesion);
    }

    const btnReservar = document.querySelector("#reservar");
    if (btnReservar) {
        btnReservar.addEventListener('click', mostrarSeccionReservas);
    }

    const fechaInput = document.querySelector("#fecha");
    if (fechaInput) {
        fechaInput.addEventListener('change', actualizarHoras);
    }

    const barberosSelect = document.querySelector("#barberos");
    if (barberosSelect) {
        barberosSelect.addEventListener('change', actualizarHoras);
    }
    
    const btnReservarYa = document.querySelector("#reservar-ya");
    if(btnReservarYa){
        btnReservarYa.addEventListener('click', mostrarSeccionReservas);
    } 
    const btnReservarFooter = document.querySelector("#reservar-footer");
    if(btnReservarFooter){
        btnReservarFooter.addEventListener('click', mostrarSeccionReservas);
    } 

    const btnReservarMobile = document.querySelector("#reservar-mobile");
    if(btnReservarMobile){
        btnReservarMobile.addEventListener('click', mostrarSeccionReservas);
    } 

    const popupModal = document.getElementById('popupModal');
    const closeBtn = document.querySelector('.close-button');
    
    if (btnRegistro && popupModal) {
        btnRegistro.addEventListener('click', () => {
            popupModal.style.display = 'block';
        });
    }

    if (closeBtn && popupModal) {
        closeBtn.addEventListener('click', () => {
            popupModal.style.display = 'none';
        });
    }

    window.addEventListener('click', (e) => {
        if (e.target === popupModal) {
            popupModal.style.display = 'none';
        }
    });

    const mobileNav = document.querySelector(".hamburger");
    if (mobileNav) {
        mobileNav.addEventListener("click", toggleNav);
    }

    if (btnLogin && popupModal) {
        btnLogin.addEventListener('click', () => {
            popupModal.style.display = 'block';
        });
    }
}

document.addEventListener('DOMContentLoaded', function() {
    inicializarGaleria();
});

function actualizarHoras() {
    const fechaInput = document.querySelector("#fecha").value;
    const barberoSeleccionado = document.querySelector("#barberos").value;

    if (fechaInput && barberoSeleccionado !== '-1') {
        const partes = fechaInput.split('-');
        const fechaSeleccionada = new Date(
            Number(partes[0]),
            Number(partes[1]) - 1,
            Number(partes[2])
        );
        cargarSelectHoras(fechaSeleccionada);
    } else {
        const horaSelect = document.querySelector("#hora");
        if (horaSelect) {
            horaSelect.innerHTML = '<option value="-1">Seleccione una Hora</option>';
        }
    }
}

function precargarDatos(){

    if(sistema.listaBarberos.length === 0){
        sistema.registrarBarbero('Lucas', 'Realiza todos los servicios disponibles. Especialista en cortes clásicos y estilos retro.', 'img/barbero1.png');
        sistema.registrarBarbero('Martín', 'Realiza todos los servicios disponibles. Destacado en afeitados al ras y degradados nítidos.', 'img/barbero2.png');
        sistema.registrarBarbero('Ezequiel', 'Realiza todos los servicios disponibles. Especialista en coloración y tratamientos capilares.', 'img/barbero3.png');
    
        sistema.registrarServicio('Corte de cabello', 500, 30);
        sistema.registrarServicio('Afeitado clásico', 350, 30);
        sistema.registrarServicio('Coloración', 700, 30);
        sistema.registrarServicio('Lavado y acondicionamiento', 400, 30);
        sistema.registrarServicio('Servicio premium con vitaminas', 1200, 30);
    } 
        
    const reservasGuardadas = JSON.parse(localStorage.getItem('reservas')) || [];

    if (reservasGuardadas.length > 0) {
        sistema.listaReservas = reservasGuardadas;
    } else {
        sistema.registrarReserva('Juan', 'Pérez', 'juanperez@mail.com', "999999999", 1, ['Corte de cabello'], '2025-08-15T10:00');
        sistema.registrarReserva('Ana', 'Gómez', 'ana.gomez@mail.com', "999999998", 2, ['Coloración', 'Lavado y acondicionamiento'], '2025-08-20T11:00');
        sistema.registrarReserva('Carlos', 'Rodríguez', 'carlosr@mail.com', "999999997", 3, ['Servicio premium con vitaminas'], '2025-08-25T12:00');    
    }

}

function cargarSelectServicios(){

    let combo = ``;
    const serviciosDiv = document.querySelector("#servicios");
    if (!serviciosDiv) return;
    for (const unServicio of sistema.listaServicios) {
        combo += `<input type="checkbox" name="servicios" id="servicio-${unServicio.id}" value="${unServicio.nombre}">
        <label for="servicio-${unServicio.id}">${unServicio.nombre}</label><br>`;
    }
    serviciosDiv.innerHTML = combo;
}

function cargarSelectBarberos(){

    let combo = `<option value="-1">Seleccione un barbero</option>`;
    const barberosSelect = document.querySelector("#barberos");
    if (!barberosSelect) return;
    for (const unBarbero of sistema.listaBarberos) {
        combo += `<option value="${unBarbero.id}">${unBarbero.nombre}</option>`;
    }
    barberosSelect.innerHTML = combo;
}

function filtrarHorasDisponibles(fechaDia, barberoSeleccionado) {

    const hoy = new Date();
    const esHoy =
        fechaDia.getFullYear() === hoy.getFullYear() &&
        fechaDia.getMonth() === hoy.getMonth() &&
        fechaDia.getDate() === hoy.getDate();

    let horasFiltradas = [...arrayHoras];
    if (esHoy) {
        const horaActual = hoy.getHours();
        const minutosActual = hoy.getMinutes();
        horasFiltradas = horasFiltradas.filter(horaStr => {
            const [h, m] = horaStr.split(":").map(Number);
            return h > horaActual || (h === horaActual && m > minutosActual);
        });
    }

    const reservas = JSON.parse(localStorage.getItem('reservas')) || [];
    const slotsOcupados = new Set();

    reservas.forEach(reserva => {
        if (String(reserva.barbero) === String(barberoSeleccionado)) {
            const fechaReserva = new Date(reserva.fecha);
            if (fechaReserva.toDateString() === fechaDia.toDateString()) {
                const serviciosReserva = reserva.servicios || [];
                const duracionReserva = serviciosReserva.reduce((sum, nombre) => {
                    const servicio = sistema.listaServicios.find(s => s.nombre === nombre);
                    return sum + (servicio ? servicio.duracion : 0);
                }, 0);
                const slotsReserva = Math.ceil(duracionReserva / 30);

                for (let i = 0; i < slotsReserva; i++) {
                    const horaOcupada = new Date(fechaReserva);
                    horaOcupada.setMinutes(fechaReserva.getMinutes() + i * 30);
                    slotsOcupados.add(horaOcupada.getTime());
                }
            }
        }
    });

    return horasFiltradas.filter(horaStr => {
        const [h, m] = horaStr.split(":").map(Number);
        const horaInicio = new Date(fechaDia.getFullYear(), fechaDia.getMonth(), fechaDia.getDate(), h, m);
        return !slotsOcupados.has(horaInicio.getTime());
    });
}

function cargarSelectHoras(fecha){

    const barberoSeleccionado = document.querySelector("#barberos").value;
    const horaSelect = document.querySelector("#hora");
    if (!horaSelect) return;

    if (barberoSeleccionado === '-1') {
        horaSelect.innerHTML = '<option value="-1">Seleccione una Hora</option>';
        return;
    }
    
    const horasDisponibles = filtrarHorasDisponibles(fecha, barberoSeleccionado);
    
    let combo = `<option value="-1">Seleccione una Hora</option>`;
    horasDisponibles.forEach(hora => {
        combo += `<option value="${hora}">${hora}</option>`;
    });
    horaSelect.innerHTML = combo;
}

function mostrarFechaHoy(){

    const hoy = new Date();
    const año = hoy.getFullYear();
    const mes = ('0' + (hoy.getMonth() + 1)).slice(-2);
    const dia = ('0' + hoy.getDate()).slice(-2);
    const fechaMinima = `${año}-${mes}-${dia}`;
    const fechaInput = document.querySelector("#fecha");
    if (fechaInput) {
        fechaInput.setAttribute('min', fechaMinima);
    }
}

function formularioReserva() {

    let nombre = document.querySelector("#txtNombre").value;
    let apellido = document.querySelector("#txtApellido").value;
    let email = document.querySelector("#email").value;
    let telefono = document.querySelector("#txtTel").value;
    let barbero = document.querySelector("#barberos").value;
    const checkboxes = document.querySelectorAll('input[name="servicios"]:checked');
    let servicios = Array.from(checkboxes).map(cb => cb.value);
    let fecha = document.querySelector("#fecha").value;
    let hora = document.querySelector("#hora").value;

    let fechaHora = fecha + "T" + hora; 
    let fechaValida = new Date(fechaHora);
    
    try {
        sistema.registrarReserva(nombre, apellido, email, telefono, barbero, servicios, fechaValida);
        mostrarModal("Reserva, Reserva Realizada Correctamente");
    } catch (e) {
        mostrarModal("Error", e.message);
    }

    document.querySelector("#txtNombre").value = '';
    document.querySelector("#txtApellido").value = '';
    document.querySelector("#email").value = '';
    document.querySelector("#txtTel").value = '';
    document.querySelector("#barberos").value = '-1';
    document.querySelector("#fecha").value = '';
    const horaSelect = document.querySelector("#hora");
    if(horaSelect) {
        horaSelect.innerHTML = '<option value="-1">Seleccione una Hora</option>';
    }

    document.querySelectorAll('input[name="servicios"]').forEach(cb => cb.checked = false);
}

function mostrarModal(texto1, texto2){

    document.getElementById("titulo1").textContent = texto1;
    document.getElementById("parrafo1").textContent = texto2;
}

function listaReservasAdmin() {

    const mainFooter = document.querySelector(".main-footer");
    if(mainFooter) mainFooter.style.display = "none";
    
    const tablaReservas = document.getElementById('seccionAdminListaReservas');
    if(!tablaReservas) return;
    
    const listaReservas = JSON.parse(localStorage.getItem('reservas')) || [];

    let html = `
    <table border="1">
        <thead>
            <tr>
                <th>ID</th>
                <th>Nombre</th>
                <th>Apellido</th>
                <th>Email</th>
                <th>Teléfono</th>
                <th>Barbero</th>
                <th>Servicio</th>
                <th>Fecha</th>
            </tr>
        </thead>
        <tbody>
    `;
    
    for (const r of listaReservas) {
        let fechaMostrar = "";
        if (r.fecha) {
            let fechaObj = new Date(r.fecha);
            fechaMostrar = fechaObj.toLocaleString('es-AR', {
                year: 'numeric',
                month: '2-digit',
                day: '2-digit',
                hour: '2-digit',
                minute: '2-digit'
            });
        }
    
        const barberoObj = sistema.listaBarberos.find(b => String(b.id) === String(r.barbero));
        const nombreBarbero = barberoObj ? barberoObj.nombre : r.barbero;

        html += `
            <tr>
                <td>${r.id}</td>
                <td>${r.nombre}</td>
                <td>${r.apellido}</td>
                <td>${r.email}</td>
                <td>${r.telefono}</td>
                <td>${nombreBarbero}</td>
                <td>${r.servicios}</td>
                <td>${fechaMostrar}</td>
            </tr>
        `;
    }

    html += `
        </tbody>
    </table>
    `;
    tablaReservas.innerHTML = html;
}

function login (){

    let nombreUsuario = document.querySelector("#txtUser").value;
    let contra = document.querySelector("#txtPass").value;

    if (sistema.verificarLogin(nombreUsuario,contra)){
        const seccionAdminListaReservas = document.querySelector("#seccionAdminListaReservas");
        if(seccionAdminListaReservas) seccionAdminListaReservas.style.display = "block";
        const logoutBtn = document.querySelector("#logout");
        if(logoutBtn) logoutBtn.style.display = "block";
        const logoutBtnMobile = document.querySelector("#logout-mobile");
    if(logoutBtnMobile) logoutBtnMobile.style.display = "block";
        const reservaBtn = document.querySelector("#reservar");
        if(reservaBtn) reservaBtn.style.display = "none";
        const iniciarSesionBtn = document.querySelector("#iniciarSesion");
        if(iniciarSesionBtn) iniciarSesionBtn.style.display = "none";
        const serviciosBtn = document.querySelector("#serviciosBtn");
        if(serviciosBtn) serviciosBtn.style.display = "none";
        const nosotrosBtn = document.querySelector("#nosotrosBtn");
        if(nosotrosBtn) nosotrosBtn.style.display = "none";
        const homeBtn = document.querySelector("#homeBtn");
        if(homeBtn) homeBtn.style.display = "none";
        const seccionAdmin = document.querySelector("#seccionAdmin");
        if(seccionAdmin) seccionAdmin.style.display = "none";
        listaReservasAdmin();
        mostrarModal("Logueado Correctamente", "");

    }else{
        mostrarModal("No se pudo Iniciar Sesion", "Usuario o contraseña invalidos");
    }
}

function cerrarSesion(){

    localStorage.removeItem('adminLoggedIn'); 

    const logoutBtn = document.querySelector("#logout");
    if(logoutBtn) logoutBtn.style.display = "none";
    const iniciarSesionBtn = document.querySelector("#iniciarSesion");
    if(iniciarSesionBtn) iniciarSesionBtn.style.display = "inline";

    const reservarBtn = document.querySelector("#reservar");
    if(reservarBtn) reservarBtn.style.display = "inline";
    const homeBtn = document.querySelector("#homeBtn");
    if(homeBtn) homeBtn.style.display = "inline";
    const servicioBtn = document.querySelector("#serviciosBtn");
    if(servicioBtn) servicioBtn.style.display = "inline";
    const nosotrosBtn = document.querySelector("#nosotrosBtn");
    if(nosotrosBtn) nosotrosBtn.style.display = "inline";

    const logoutBtnMobile = document.querySelector("#logout-mobile");
    if(logoutBtnMobile) logoutBtnMobile.style.display = "none";
    const iniciarSesionBtnMobile = document.querySelector("#iniciarSesion-mobile");
    if(iniciarSesionBtnMobile) iniciarSesionBtnMobile.style.display = "inline";

    const mainContentWrapper = document.querySelector("#main-content-wrapper");
    if(mainContentWrapper) mainContentWrapper.style.display = "flex";
    const banner = document.querySelector("#banner");
    if(banner) banner.style.display = "flex";
    const seccionAdmin = document.querySelector("#seccionAdmin");
    if(seccionAdmin) seccionAdmin.style.display = "none";
    const seccionAdminListaReservas = document.querySelector("#seccionAdminListaReservas");
    if(seccionAdminListaReservas) seccionAdminListaReservas.style.display = "none";
    const seccionReserva = document.querySelector("#seccionReserva");
    if(seccionReserva) seccionReserva.style.display = "none";
    
    const seccionServicios = document.querySelector("#seccionServicios");
    if(seccionServicios) seccionServicios.style.display = "block";
    const seccionBarberos = document.querySelector("#listaBarberos");
    if(seccionBarberos) seccionBarberos.style.display = "block";
    const seccionTrabajos = document.querySelector("#seccionTrabajos");
    if(seccionTrabajos) seccionTrabajos.style.display = "block";
    const seccionSobreNosotros = document.querySelector(".sobre-nosotros-barberia");
    if(seccionSobreNosotros) seccionSobreNosotros.style.display = "block";
    const seccionSobreNosotrosa = document.querySelector("#seccionSobreNosotros");
    if(seccionSobreNosotrosa) seccionSobreNosotrosa.style.display = "block";
    const sobreNosotros = document.querySelector(".sobre-nosotros-barberia");
    if(sobreNosotros) sobreNosotros.style.display = "block";
    const mainFooter = document.querySelector(".main-footer");
    if(mainFooter) mainFooter.style.display = "block";

    const seccionGaleria = document.querySelector("#galeriaTrabajos");
    if(seccionGaleria) seccionGaleria.style.display = "block";
    
    const navbar = document.querySelector(".menubar");
    if (navbar && navbar.classList.contains("active")) {
        toggleNav();
    }
}

function mostrarSeccionReservas(){

    document.querySelector('#seccionAdminListaReservas').style.display = "none";
    const seccionAdmin = document.querySelector("#seccionAdmin");
    if(seccionAdmin) seccionAdmin.style.display = "none";
    const seccionReserva = document.querySelector("#seccionReserva");
    if(seccionReserva) seccionReserva.style.display = "block";
    const seccionServicios = document.querySelector("#seccionServicios");
    if(seccionServicios) seccionServicios.style.display = "none";
    const listaBarberos = document.querySelector("#listaBarberos");
    if(listaBarberos) listaBarberos.style.display = "none";
    const banner = document.querySelector("#banner");
    if(banner) banner.style.display = "none";
    const sobreNosotros = document.querySelector(".sobre-nosotros-barberia");
    if(sobreNosotros) sobreNosotros.style.display = "none";
    const mainFooter = document.querySelector(".main-footer");
    if(mainFooter) mainFooter.style.display = "none";

    const serviciosBtnMobile = document.querySelector("#servicios-mobile");
    if(serviciosBtnMobile) serviciosBtnMobile.style.display = "none";
    const nosotrosBtnMobile = document.querySelector("#nosotros-mobile");
    if(nosotrosBtnMobile) nosotrosBtnMobile.style.display = "none";
    const reservaBtnMobile = document.querySelector("#reservar-mobile");
    if(reservaBtnMobile) reservaBtnMobile.style.display = "none";

    const serviciosBtn = document.querySelector("#serviciosBtn");
    if(serviciosBtn) serviciosBtn.style.display = "none";
    const nosotrosBtn = document.querySelector("#nosotrosBtn");
    if(nosotrosBtn) nosotrosBtn.style.display = "none";
    const reservaBtn = document.querySelector("#reservar");
    if(reservaBtn) reservaBtn.style.display = "none";

    const seccionGaleria = document.querySelector("#galeriaTrabajos");
    if(seccionGaleria) seccionGaleria.style.display = "none";
}   

const toggleNav = () => {
    const navbar = document.querySelector(".menubar");
    const mobileNav = document.querySelector(".hamburger");
    if (navbar && mobileNav) {
        navbar.classList.toggle("active");
        mobileNav.classList.toggle("hamburger-active");
    }
};

function mostrarSeccionLogin() {

    
    const mainContentWrapper = document.querySelector("#main-content-wrapper");
    if(mainContentWrapper) mainContentWrapper.style.display = "flex";
    const banner = document.querySelector("#banner");
    if(banner) banner.style.display = "none";
    const seccionReserva = document.querySelector("#seccionReserva");
    if(seccionReserva) seccionReserva.style.display = "none";
    const seccionAdminListaReservas = document.querySelector("#seccionAdminListaReservas");
    if(seccionAdminListaReservas) seccionAdminListaReservas.style.display = "none";
    const seccionServicios = document.querySelector("#seccionServicios");
    if(seccionServicios) seccionServicios.style.display = "none";
    const seccionTrabajos = document.querySelector("#seccionTrabajos");
    if(seccionTrabajos) seccionTrabajos.style.display = "none";
    const listaBarberos = document.querySelector("#listaBarberos");
    if(listaBarberos) listaBarberos.style.display = "none";
    const sobreNosotros = document.querySelector(".sobre-nosotros-barberia");
    if(sobreNosotros) sobreNosotros.style.display = "none";
    const mainFooter = document.querySelector(".main-footer");
    if(mainFooter) mainFooter.style.display = "none";
    const seccionAdmin = document.querySelector("#seccionAdmin");
    if(seccionAdmin) seccionAdmin.style.display = "block";

    const serviciosBtn = document.querySelector("#serviciosBtn");
    if(serviciosBtn) serviciosBtn.style.display = "none";
    const nosotrosBtn = document.querySelector("#nosotrosBtn");
    if(nosotrosBtn) nosotrosBtn.style.display = "none";
    const reservaBtn = document.querySelector("#reservar");
    if(reservaBtn) reservaBtn.style.display = "none";
    const iniciarBtn = document.querySelector("#iniciarSesion");
    if(iniciarBtn) iniciarBtn.style.display = "none";

    const serviciosBtnMobile = document.querySelector("#servicios-mobile");
    if(serviciosBtnMobile) serviciosBtnMobile.style.display = "none";
    const nosotrosBtnMobile = document.querySelector("#nosotros-mobile");
    if(nosotrosBtnMobile) nosotrosBtnMobile.style.display = "none";
    const reservaBtnMobile = document.querySelector("#reservar-mobile");
    if(reservaBtnMobile) reservaBtnMobile.style.display = "none";
     const iniciarBtnMobile = document.querySelector("#iniciarSesion-mobile");
    if(iniciarBtnMobile) iniciarBtnMobile.style.display = "none";
     
    const seccionGaleria = document.querySelector("#galeriaTrabajos");
    if(seccionGaleria) seccionGaleria.style.display = "none";

    const txtUser = document.querySelector("#txtUser");
    if(txtUser) txtUser.value = "";
    const txtPass = document.querySelector("#txtPass");
    if(txtPass) txtPass.value = "";
    
    const navbar = document.querySelector(".menubar");
    if (navbar && navbar.classList.contains("active")) {
        toggleNav();
    }
}

function mostrarSeccionBarberos(){
    
    const seccion = document.getElementById('seccionBarberos');
    if (!seccion) return;
    const listaBarberos = sistema.listaBarberos;
    let html = '';
    for (const b of listaBarberos) {
        html += `
            <div class="tarjeta-barbero">
                <p>${b.descripcion}</p><br>
                <img src="${b.foto}" alt="${b.nombre}"><br>
                <h3>${b.nombre}</h3>       
            </div>
        `;
    }
    seccion.innerHTML = html;
}

function inicializarGaleria() {
    const galeriaItems = document.querySelectorAll('.galeria-item');
    const lightbox = document.getElementById('lightbox');
    const lightboxImagen = document.querySelector('.lightbox-imagen');
    const lightboxCerrar = document.querySelector('.lightbox-cerrar');

    galeriaItems.forEach(item => {
        item.addEventListener('click', function(e) {
            e.preventDefault(); 
            const imagenSrc = this.querySelector('img').src;
            lightboxImagen.src = imagenSrc;
            lightbox.style.display = 'flex';
        });
    });

    lightboxCerrar.addEventListener('click', function() {
        lightbox.style.display = 'none';
    });

    lightbox.addEventListener('click', function(e) {
        if (e.target === this) {
            lightbox.style.display = 'none';
        }
    });
}