// Constructor de Reserva
function Reserva(
  origen,
  destino,
  fecha,
  hora,
  nombreCompleto,
  dni,
  fechaNacimiento,
  sexo,
  clase,
  ubicacion,
  nroSilla
) {
  this.origen = origen;
  this.destino = destino;
  this.fecha = fecha;
  this.hora = hora;
  this.nombreCompleto = nombreCompleto;
  this.dni = dni;
  this.fechaNacimiento = fechaNacimiento;
  this.sexo = sexo;
  this.clase = clase;
  this.ubicacion = ubicacion;
  this.nroSilla = nroSilla;
}

class SistemaReservas {
  constructor() {
    this.reservas = [];
  }

  agregarReserva(reserva) {
    if (reserva instanceof Reserva) {
      this.reservas.push(reserva);
      this.actualizarTabla();
    } else {
      console.error("El objeto no es una instancia de Reserva.");
    }
  }

  actualizarTabla() {
    const tabla = document
      .getElementById("tablaReservas")
      .getElementsByTagName("tbody")[0];
    tabla.innerHTML = "";

    this.reservas.forEach((reserva) => {
      const fila = tabla.insertRow();
      fila.insertCell().textContent = reserva.nombreCompleto;
      fila.insertCell().textContent = reserva.dni;
      fila.insertCell().textContent = reserva.origen;
      fila.insertCell().textContent = reserva.destino;
      fila.insertCell().textContent = reserva.fecha;
      fila.insertCell().textContent = reserva.hora;
      fila.insertCell().textContent = reserva.clase;
      fila.insertCell().textContent = reserva.ubicacion;
      fila.insertCell().textContent = reserva.nroSilla;
    });
  }
}

// Función para generar los formularios de pasajeros dinámicamente
function generarFormulariosPasajeros() {
  const cantidad = parseInt(document.getElementById("cantidad").value) || 0;
  const clase = document.getElementById("clase").value;
  const contenedor = document.getElementById("contenedorPasajeros");

  contenedor.innerHTML = ""; // limpiar antes de generar

  for (let i = 1; i <= cantidad; i++) {
    const pasajeroDiv = document.createElement("div");
    pasajeroDiv.classList.add("border", "p-3", "mb-3");
    pasajeroDiv.innerHTML = `
      <h5>Pasajero ${i}</h5>
      <div class="mb-3">
        <label class="form-label">Ubicación</label>
        <select class="form-select ubicacion" name="ubicacion${i}">
          ${
            clase === "Ejecutiva"
              ? `<option value="Ventanilla">Ventanilla</option>
                 <option value="Pasillo">Pasillo</option>`
              : `<option value="Ventanilla">Ventanilla</option>
                 <option value="Centro">Centro</option>
                 <option value="Pasillo">Pasillo</option>`
          }
        </select>
      </div>
      <div class="mb-3">
        <label class="form-label">Nro de Silla</label>
        <input type="number" class="form-control nroSilla" 
          name="nrosilla${i}" 
          min="${clase === "Ejecutiva" ? 1 : 9}" 
          max="${clase === "Ejecutiva" ? 8 : 50}" required />
      </div>
      <div class="mb-3">
        <label class="form-label">Apellido y Nombre</label>
        <input type="text" class="form-control nombre" name="nombre${i}" maxlength="100" required />
      </div>
      <div class="mb-3">
        <label class="form-label">DNI</label>
        <input type="text" class="form-control dni" name="dni${i}" pattern="\\d{8}" maxlength="8" required placeholder="8 dígitos" />
      </div>
      <div class="mb-3">
        <label class="form-label">Fecha de Nacimiento</label>
        <input type="date" class="form-control fechanac" name="fechanac${i}" />
      </div>
      <div class="mb-3">
        <label class="form-label d-block">Sexo</label>
        <div class="form-check form-check-inline">
          <input type="radio" class="form-check-input sexo" name="sexo${i}" value="Femenino" />
          <label class="form-check-label">F</label>
        </div>
        <div class="form-check form-check-inline">
          <input type="radio" class="form-check-input sexo" name="sexo${i}" value="Masculino" />
          <label class="form-check-label">M</label>
        </div>
      </div>
    `;
    contenedor.appendChild(pasajeroDiv);
  }
}

document.addEventListener("DOMContentLoaded", function () {
  const sistema = new SistemaReservas();

  const form = document.getElementById("formReservas");
  const cantidadInput = document.getElementById("cantidad");
  const claseSelect = document.getElementById("clase");

  // Generar formularios cuando cambian cantidad o clase
  cantidadInput.addEventListener("input", generarFormulariosPasajeros);
  claseSelect.addEventListener("change", generarFormulariosPasajeros);

  form.addEventListener("submit", function (event) {
    event.preventDefault();

    const origen = document.getElementById("origen").value;
    const destino = document.getElementById("destino").value;
    const fecha = document.getElementById("fecha").value;
    const hora = document.getElementById("hora").value;
    const clase = claseSelect.value;

    // Tomamos todos los formularios de pasajeros
    const pasajerosDivs = document.querySelectorAll("#contenedorPasajeros > div");

    pasajerosDivs.forEach((div) => {
      const nombre = div.querySelector(".nombre").value;
      const dni = div.querySelector(".dni").value;
      const fechaNacimiento = div.querySelector(".fechanac").value;
      const sexo =
        div.querySelector('input.sexo:checked')?.value || "";
      const ubicacion = div.querySelector(".ubicacion").value;
      const nroSilla = div.querySelector(".nroSilla").value;

      const nuevaReserva = new Reserva(
        origen,
        destino,
        fecha,
        hora,
        nombre,
        dni,
        fechaNacimiento,
        sexo,
        clase,
        ubicacion,
        nroSilla
      );

      sistema.agregarReserva(nuevaReserva);
    });

    form.reset();
    document.getElementById("contenedorPasajeros").innerHTML = "";
  });
});
