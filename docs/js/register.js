"use strict";

import { authAPI } from "./api/auth.js";
import { messageRenderer } from "/js/renderers/messages.js";
import { registerValidator } from "/js/validators/register.js";
import { sessionManager } from "/js/utils/session.js";


function main(){

    addHandlerForm();
}



function addHandlerForm(){
    let registerForm = document.getElementById("register-form");
    registerForm.onsubmit = validateForm;
}



function validateForm(event){

    //Evitamos enviar el formulario directamente
    event.preventDefault();

    let errorsDiv = document.getElementById("errors");
    errorsDiv.innerHTML = "";

    let form = event.target;
    let formData = new FormData(form);
    
    let errors = registerValidator.getErrors(formData);

    if(errors.length > 0){
        //Si hay errores los mostramos en el div#errors
        for(let error of errors){
            messageRenderer.showErrorMessage(error);
        }
    } else {

        //Enviamos el formulario a la API
        authAPI.register(formData)
            .then(loginData => {
                let sessionToken = loginData.sessionToken;
                let loggedUser = loginData.user;
                sessionManager.login(sessionToken, loggedUser);
                window.location.href = "index.html";
            })
            .catch(error => messageRenderer.showErrorMessage(error));
    }

}


document.addEventListener("DOMContentLoaded", main);