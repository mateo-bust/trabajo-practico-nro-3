// Validación de fecha
document.addEventListener("DOMContentLoaded", function () {
  const form = document.querySelector("form");
  const errorDiv = document.getElementById("errorFecha");

  form.addEventListener("submit", function (event) {
    const fechaInput = document.getElementById("fecha").value;
    const fechaVuelo = new Date(fechaInput);

    const hoy = new Date();
    hoy.setHours(0, 0, 0, 0);

    if (fechaVuelo < hoy) {
      errorDiv.textContent =
        "La fecha seleccionada no puede ser menor que la fecha actual.";
      event.preventDefault();
    } else {
      errorDiv.textContent = "";
    }
  });

  document.getElementById("fecha").addEventListener("input", function () {
    errorDiv.textContent = "";
  });
});

// Generación dinámica de formularios de pasajeros
document.addEventListener("DOMContentLoaded", function () {
  const inputCantidad = document.getElementById("cantidad");
  const selectClase = document.getElementById("clase");
  const contenedor = document.getElementById("contenedorPasajeros");

  function generarFormularios() {
    contenedor.innerHTML = "";
    const cantidad = parseInt(inputCantidad.value) || 0;
    const clase = selectClase.value;

    for (let i = 1; i <= cantidad; i++) {
      const div = document.createElement("div");
      div.classList.add("border", "p-3", "mb-3");

      const titulo = document.createElement("h5");
      titulo.textContent = `Pasajero ${i}`;
      div.appendChild(titulo);

      const labelUbicacion = document.createElement("label");
      labelUbicacion.textContent = "Ubicación:";
      const selectUbicacion = document.createElement("select");
      selectUbicacion.classList.add("form-select", "mb-2");
      selectUbicacion.required = true;

      if (clase === "Ejecutiva") {
        selectUbicacion.innerHTML = `
          <option value="Ventanilla">Ventanilla</option>
          <option value="Pasillo">Pasillo</option>
        `;
      } else {
        selectUbicacion.innerHTML = `
          <option value="Ventanilla">Ventanilla</option>
          <option value="Centro">Centro</option>
          <option value="Pasillo">Pasillo</option>
        `;
      }

      const labelSilla = document.createElement("label");
      labelSilla.textContent = "Nro de silla:";
      const inputSilla = document.createElement("input");
      inputSilla.type = "number";
      inputSilla.classList.add("form-control", "mb-2");
      inputSilla.required = true;

      if (clase === "Ejecutiva") {
        inputSilla.min = 1;
        inputSilla.max = 8;
      } else {
        inputSilla.min = 9;
        inputSilla.max = 50;
      }

      const inputNombre = document.createElement("input");
      inputNombre.type = "text";
      inputNombre.classList.add("form-control", "mb-2");
      inputNombre.placeholder = "Apellido y Nombre";
      inputNombre.maxLength = 100;
      inputNombre.required = true;

      const inputDni = document.createElement("input");
      inputDni.type = "number";
      inputDni.classList.add("form-control", "mb-2");
      inputDni.placeholder = "DNI (8 dígitos)";
      inputDni.min = 10000000;
      inputDni.max = 99999999;
      inputDni.required = true;

      const inputNacimiento = document.createElement("input");
      inputNacimiento.type = "date";
      inputNacimiento.classList.add("form-control", "mb-2");

      const divSexo = document.createElement("div");
      divSexo.classList.add("mb-2");
      divSexo.innerHTML = `
        <label>Sexo:</label><br>
        <input type="radio" name="sexo${i}" value="M" required> Masculino
        <input type="radio" name="sexo${i}" value="F" required> Femenino
      `;

      div.appendChild(labelUbicacion);
      div.appendChild(selectUbicacion);
      div.appendChild(labelSilla);
      div.appendChild(inputSilla);
      div.appendChild(inputNombre);
      div.appendChild(inputDni);
      div.appendChild(inputNacimiento);
      div.appendChild(divSexo);

      contenedor.appendChild(div);
    }
  }

  inputCantidad.addEventListener("input", generarFormularios);
  selectClase.addEventListener("change", generarFormularios);
});

// Validación Origen ≠ Destino
document.addEventListener("DOMContentLoaded", function () {
  const origenSelect = document.getElementById("origen");
  const destinoSelect = document.getElementById("destino");

  origenSelect.addEventListener("change", function () {
    const origenSeleccionado = origenSelect.value;

    // Restauramos todas las opciones originales
    const opciones = ["Cordoba", "Mendoza", "Tucuman"];
    destinoSelect.innerHTML = "";

    opciones.forEach((opcion) => {
      if (opcion !== origenSeleccionado) {
        const optionElement = document.createElement("option");
        optionElement.value = opcion;
        optionElement.textContent = opcion;
        destinoSelect.appendChild(optionElement);
      }
    });
  });
});
