beforeEach(() => {
  global.localStorage = {
    getItem: jest.fn(() => null),
    setItem: jest.fn(),
  };
});

const { Sistema, Reserva } = require('./clases');

const sistema = new Sistema();

test('Registrar Reserva con datos validos', () => {
  const servicios = ['Corte'];
  sistema.registrarReserva('Juan', 'Pérez', 'jp@mail.com', '099123456', 1, servicios, '2025-08-01T14:00');

  expect(sistema.listaReservas.length).toBe(1);
  expect(sistema.listaReservas[0].nombre).toBe('Juan');
});

test('Registrar Servicio con datos validos', () => {
  const sistema = new Sistema();
  sistema.registrarServicio('Afeitado', 'Texto',500, '30min');

  expect(sistema.listaServicios.length).toBe(1);
  expect(sistema.listaServicios[0].nombre).toBe('Afeitado');
});

test('Iniciar Sesion como Administrador con datos validos', () => {
  const sistema = new Sistema();
  const ok = sistema.verificarLogin('Admin', '1234');

  expect(ok).toBe(true);
  expect(sistema.usuarioLogueado.user).toBe('Admin');
});
test('Crear Reserva con datos validos', () => {
  const reserva = new Reserva('Ana', 'López', 'ana@mail.com', '098765432', 1, ['Corte'], new Date());
  expect(reserva.nombre).toBe('Ana');
});

test('Registrar Reserva Precargarda en localStorage si está vacío', () => {
  const sistema = new Sistema();
  const servicios = ['Corte'];

  sistema.registrarReserva('Ana', 'López', 'ana@mail.com', '099999999', 1, servicios, '2025-08-01T14:00');

  expect(sistema.listaReservas.length).toBe(1);
  expect(sistema.listaReservas[0].nombre).toBe('Ana');
  expect(localStorage.setItem).toHaveBeenCalledTimes(1);
  expect(localStorage.setItem).toHaveBeenCalledWith('reservas', JSON.stringify(sistema.listaReservas));
});

test('Registrar Barbero con datos validos en lista Barberos', () => {
  const sistema = new Sistema();

  sistema.registrarBarbero('Luis', 'Especialista en fades', 'luis.jpg');

  expect(sistema.listaBarberos.length).toBe(1);
  expect(sistema.listaBarberos[0].nombre).toBe('Luis');
  expect(sistema.listaBarberos[0].descripcion).toBe('Especialista en fades');
  expect(sistema.listaBarberos[0].foto).toBe('luis.jpg');
});

test('Obtener Servicios', () => {
  const sistema = new Sistema();
  sistema.registrarServicio('Corte', 'Texto', 400, '30min');
  sistema.registrarServicio('Afeitado','Texto', 300, '20min');

  const servicios = sistema.obtenerServicios();

  expect(servicios.length).toBe(2);
  expect(servicios[0].nombre).toBe('Corte');
  expect(servicios[1].nombre).toBe('Afeitado');
});

test('Obtener Barberos', () => {
  const sistema = new Sistema();
  sistema.registrarBarbero('Carlos', 'Cortes clásicos', 'carlos.jpg');
  sistema.registrarBarbero('Pedro', 'Especialista en barba', 'pedro.jpg');

  const barberos = sistema.obtenerBarberos();

  expect(barberos.length).toBe(2);
  expect(barberos[0].nombre).toBe('Carlos');
  expect(barberos[1].nombre).toBe('Pedro');
});

test('Obtener Reservas', () => {
  const sistema = new Sistema();
  sistema.registrarReserva('Ana', 'López', 'ana@mail.com', '099999999', 3, ['Corte'], '2025-08-01T14:00');

  const reservas = sistema.obtenerReservas();

  expect(reservas.length).toBe(1);
  expect(reservas[0].nombre).toBe('Ana');
});

test('Debería lanzar un error si el nombre o apellido están vacíos', () => {
        expect(() => {
            const sistema = new Sistema();
            sistema.registrarReserva('', 'Perez', 'email@test.com', '123456789', 1, ['Corte'], '2025-08-01');
        }).toThrow('El nombre y apellido no pueden ser vacios, tener caracteres especiales ni números');

        expect(() => {
            const sistema = new Sistema();
            sistema.registrarReserva('Juan', '', 'email@test.com', '123456789', 1, ['Corte'], '2025-08-01');
        }).toThrow('El nombre y apellido no pueden ser vacios, tener caracteres especiales ni números');
    });

    test('Debería lanzar un error si el email no contiene un arroba', () => {
        expect(() => {
            const sistema = new Sistema();
            sistema.registrarReserva('Juan', 'Perez', 'email.test.com', '123456789', 1, ['Corte'], '2025-08-01');
        }).toThrow('El email debe contener un arroba @');
    });

    test('Debería lanzar un error si el teléfono no tiene 9 dígitos', () => {
        expect(() => {
            const sistema = new Sistema();
            sistema.registrarReserva('Juan', 'Perez', 'email@test.com', '12345', 1, ['Corte'], '2025-08-01');
        }).toThrow('Telefono invalido');
    });

    test('Debería lanzar un error si el barbero está vacío', () => {
        expect(() => {
            const sistema = new Sistema();
            sistema.registrarReserva('Juan', 'Perez', 'email@test.com', '123456789', -1, ['Corte'], '2025-08-01');
        }).toThrow('El barbero no puede ser vacio');
    });

    test('Debería lanzar un error si la lista de servicios está vacía', () => {
        expect(() => {
            const sistema = new Sistema();
            sistema.registrarReserva('Juan', 'Perez', 'email@test.com', '123456789', 1, [], '2025-08-01');
        }).toThrow('El servicio no puede ser vacio');
    });

    test('Debería lanzar un error si la fecha está vacía', () => {
        expect(() => {
            const sistema = new Sistema();
            sistema.registrarReserva('Juan', 'Perez', 'email@test.com', '123456789', 1, ['Corte'], '');
        }).toThrow('La fecha no puede ser vacia');
    });