"use strict";

import { messageRenderer } from "/js/renderers/messages.js";
import { sessionManager } from "/js/utils/session.js";
import { authAPI } from "/js/api/auth.js";


function main(){

    let loginForm = document.getElementById("login-form");
    loginForm.onsubmit = handleSubmitLogin;
}


function handleSubmitLogin(event){

    //Evitar que se envíe el formulario directamente
    event.preventDefault();

    let errorsDiv = document.getElementById("errors");
    errorsDiv.innerHTML = "";

    let form = event.target;
    let formData = new FormData(form);

    if (errors.length > 0) {
        //Mostramos los errores en el div#errors
        for (let error of errors) {
            messageRenderer.showErrorMessage(error);
        }
    }
    else {
        //Todo bien. Enviamos el formulario e iniciamos sesión
        authAPI.login(formData)
            .then(loginData => {
                let sessionToken = loginData.sessionToken;
                let loggedUser = loginData.user;
                sessionManager.login(sessionToken, loggedUser);
                
                //Enviamos al usuario al índice
                window.location.href = "index.html";

            })
            .catch(error => messageRenderer.showErrorMessage(error));
    }

}


document.addEventListener("DOMContentLoaded", main);