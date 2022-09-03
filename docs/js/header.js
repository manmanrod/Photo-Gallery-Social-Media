"use strict";

import { sessionManager } from "/js/utils/session.js";

function main() {
    showUser();
    addLogoutHandler();
    hideHeaderOptions();
}



function showUser() {

    //Usuario logeado -> Mostramos su información

    let title = document.getElementById("navbar-title");
    let text;

    if (sessionManager.isLogged()) {
        let username = sessionManager.getLoggedUser().username;
        text = "Hi there, @" + username;

    } else {
        //Si no está logeado, mostramos EntregableIISSI2 de título en cabecera
        text = "EntregableIISSI2";
    }
    title.textContent = text;
}



function addLogoutHandler() {

    //Pulsar el boton -> Cerramos sesión y nos envía al índice
    let logoutButton = document.getElementById("navbar-logout");
    logoutButton.addEventListener("click", function () {
        sessionManager.logout();
        window.location.href = "index.html";
    });
}



function hideHeaderOptions() {

    //Si no estamos logeados -> Ocultamos algunas opciones de la cabecera

    let headerRegister = document.getElementById("navbar-register");
    let headerLogin = document.getElementById("navbar-login");
    let headerLogout = document.getElementById("navbar-logout");
    let headerUploadPhoto = document.getElementById("navbar-upload-photo");
    let headerUserProfile = document.getElementById("navbar-user-profile");

    if (sessionManager.isLogged()) {
        headerRegister.style.display = "none";
        headerLogin.style.display = "none";
    } else {
        headerUploadPhoto.style.display = "none";
        headerLogout.style.display = "none";
        headerUserProfile.style.display = "none";

    }
}



document.addEventListener("DOMContentLoaded", main);