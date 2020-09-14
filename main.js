const form = document.querySelector(".form");
const nombre = document.querySelector("#nombre");
const email = document.querySelector("#email");
const btnEnviar = document.querySelector(".registro");
const er = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

animar();
eventListeners();

function eventListeners() {
  document.addEventListener("DOMContentLoaded", iniciarApp);
  nombre.addEventListener("blur", validarForm);
  email.addEventListener("blur", validarForm);
  form.addEventListener("submit", enviarMail);
}

function animar() {
  gsap.from(".imagen", { duration: 6, opacity: 0, ease: "rough" });
  gsap.to(".imagen", { duration: 2, x: 100, ease: "bounce" });
  gsap.to(".logo", { duration: 6, x: 30, ease: "bounce" });
  gsap.from(".form", { duration: 6, opacity: 0, ease: "rough" });
  gsap.from("nav", { duration: 6, opacity: 0, ease: "rough" });
  gsap.from("footer", { duration: 6, opacity: 0, ease: "rough" });
}

function iniciarApp() {
  btnEnviar.disabled = true;
  btnEnviar.classList.add("disabled");
}

function validarForm(e) {
  if (e.target.value.length > 0) {
    const error = document.querySelector("p.error");
    if (error) {
      error.remove();
    }

    e.target.style.borderoBottomColor = "green";
  } else {
    e.target.style.borderoBottomColor = "red";

    mostrarError("Todos los campos son obligatorios.");
  }

  if (e.target.type === "email") {
    if (er.test(e.target.value)) {
      const error = document.querySelector("p.error");
      if (error) {
        error.remove();
      }

      e.target.style.borderoBottomColor = "green";
    } else {
      e.target.style.borderoBottomColor = "red";

      mostrarError("El email no está escrito correctamente.");
    }
  }

  if (er.test(email.value) && nombre.value !== "") {
    btnEnviar.disabled = false;
    btnEnviar.classList.remove("disabled");
  }
}

function mostrarError(mensaje) {
  const mensajeError = document.createElement("p");
  mensajeError.textContent = mensaje;
  mensajeError.classList.add("mensaje-error");

  const errores = document.querySelectorAll(".error");

  if (errores.length === 0) {
    form.appendChild(mensajeError);
  }
}

function enviarMail(e) {
  e.preventDefault();
  const registrando = document.createElement("p");
  registrando.textContent = "Registrando...";
  registrando.classList.add("registrando");
  form.appendChild(registrando);

  setTimeout(() => {
    nombre.value = "";
    email.value = "";
    registrando.textContent = "Se registró correctamente 😀👍";
  }, 3000);
}
