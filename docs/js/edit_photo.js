"use strict";

import { photosAPI } from "/js/api/photos.js";
import { messageRenderer } from "/js/renderers/messages.js";
import { sessionManager } from "/js/utils/session.js";
import { uploadValidator } from "/js/validators/upload.js";

let urlParams = new URLSearchParams(window.location.search);
let photoId = urlParams.get("photoId");
let currentPhoto = null;

function main() {

    //Si no se indica photoId en URL -> Cargamos info del usuario logeado (nosotros mismos)
    if (photoId !== null) {
        loadCurrentPhoto();
        console.log(photoId);
    }

    let listaInsultos = uploadValidator.getInsultos();
    console.log(listaInsultos);

    let registerForm = document.getElementById("form-photo-upload");
    registerForm.onsubmit = handleSubmitPhoto;

}


function loadCurrentPhoto() {

    //Cargamos las fotos del usuario actual (logeado)

    let pageTitle = document.getElementById("page-title");
    let urlInput = document.getElementById("input-url");
    let titleInput = document.getElementById("input-title");
    let descriptionInput = document.getElementById("input-description");
    let visibilityInput = document.getElementById("input-visibility");
    let imageInput = document.getElementById("image-preview");

    pageTitle.innerHTML = `<i class="fa fa-pencil-square-o" aria-hidden="true"></i>` + ` Editing a photo`;

    photosAPI.getById(photoId)
        .then(photos => {
            currentPhoto = photos;
            urlInput.value = currentPhoto.url;
            titleInput.value = currentPhoto.title;
            descriptionInput.value = currentPhoto.description;
            visibilityInput.value = currentPhoto.visibility;
            imageInput.src = currentPhoto.url;
        })
        .catch(error => messageRenderer.showErrorMessage(error));
}


/* 
    HAY ÉXITO --> Enviamos al usuario al index para que vea la foto

    HAY FALLO --> Mostramos el mensaje de error
*/

function photoContainsInappropriateWords(formData) {

    //Vamos a analizar el título en minúscula (evitar problemas con mayusculas)
    let titulo = formData.get("title");
    let titulo_minusculas = titulo.toLowerCase();

    //Vamos a analizar la descripción en minúscula (evitar problemas con mayusculas)
    let descripcion = formData.get("description");
    let descripcion_minusculas = descripcion.toLowerCase();


    let listaInsultos = uploadValidator.getInsultos();
    console.log(listaInsultos);

    let res = 0;    //resultado

    let i = 0;
    while (i < listaInsultos.length) {
        //Recorremos cada insulto
        if (!titulo_minusculas.includes(listaInsultos[i]) & !descripcion_minusculas.includes(listaInsultos[i])) {
            //Si NO contiene las palabras prohibidas el título ni la descripción...
            i++;    //SIGUE ADELANTE
        } else {
            //Hay palabras prohibidas. Incrementar resultado y salir del bucle
            res = res+1;
            break;
        }
    }
    
    return res;
}



function handleSubmitPhoto(event) {

    event.preventDefault();

    let errorsDiv = document.getElementById("errors");
    errorsDiv.innerHTML = "";

    let form = event.target;
    let formData = new FormData(form);

    let res = photoContainsInappropriateWords(formData);

    if (res > 0) {
        //Si existen palabras inapropiadas...
        messageRenderer.showErrorMessage("You CANNOT write inappropriate words in a post!");

    } else {

        if (currentPhoto === null) {

            //Enviamos la foto con el userId del logeado y llevamos al usuario al index
            formData.append("userId", sessionManager.getLoggedId());

            photosAPI.create(formData)
                .then(data => window.location.href = "index.html")
                .catch(error => messageRenderer.showErrorMessage(error));

        } else {

            //Actualizamos la foto
            formData.append("userId", currentPhoto.userId);
            formData.append("date", currentPhoto.date);

            photosAPI.update(photoId, formData)
                .then(data => window.location.href = "index.html")
                .catch(error => messageRenderer.showErrorMessage(error));
        }
    }
}



document.addEventListener("DOMContentLoaded", main);

