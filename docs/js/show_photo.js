"use strict";

import { photoRenderer } from "/js/renderers/photos.js";
import { photosAPI } from "/js/api/photos.js";
import { messageRenderer } from "/js/renderers/messages.js";
import { sessionManager } from "/js/utils/session.js";
import { ratingsAPI } from "/js/api/ratings.js";


let urlParams = new URLSearchParams(window.location.search);
let photoId = urlParams.get("photoId");
let userId = urlParams.get("userId");

/*
    Si edit_photo.html no recibe ningún parámetro de URL, lo usaremos para crear una
nueva foto.

    Si recibe un photoId como parámetro de URL (p.ej. edit_photo.html?photoId=6), lo
usaremos para modificar la foto en cuestión.
*/


function main() {

    loadPhoto();

}



function hideActionsColumn() {

    //Usuario NO logeado -> Ocultamos los botones de DELETE y EDIT

    let edit_delete_buttons = document.getElementById("edit-delete-buttons");
    if (!sessionManager.isLogged()) {
        edit_delete_buttons.style.display = "none";
        
    } else if(sessionManager.getLoggedUser().userId != userId){
        edit_delete_buttons.style.display = "none";
    }
}



function loadPhoto() {
    photosAPI
        .getById(photoId)
        .then(photo => {
            let photoDetails = photoRenderer.asDetails(photo);
            let container = document.getElementById("photo-details");
            container.appendChild(photoDetails);

            let deleteBtn = document.querySelector("#button-delete");
            deleteBtn.onclick = handleDelete;

            let editBtn = document.querySelector("#button-edit");
            editBtn.onclick = handleEdit;

            let usuario = document.querySelector("#show_username");
            usuario.onclick = handleUsuario;

            hideActionsColumn();

            let ratingForm = document.getElementById("rating-form");
            ratingForm.onsubmit = handleSubmitRate;
            
        })
        .catch(err => messageRenderer.showErrorMessage(err));
}


function handleSubmitRate(event) {

    //Evitamos que se envíe directamente
    event.preventDefault();

    let form = event.target;
    let formData = new FormData(form);

    formData.append("userId", sessionManager.getLoggedUser().userId);
    formData.append("photoId", photoId);
    //Si no se envía la fecha -> se pone la actual (según la base de datos)

    ratingsAPI.create(formData)
        .then(rate => window.location.href = "index.html")
        .catch(error => messageRenderer.showErrorMessage(error));
}


function handleDelete(event) {

    let answer = confirm("Are you sure you want to delete this photo?");

    if (answer) {
        photosAPI
            .delete(photoId)
            .then(data => window.location.href = "index.html")
            .catch(error => messageRenderer.showErrorMessage(error));
    }
}



function handleEdit(event) {
    window.location.href = "edit_photo.html?photoId=" + photoId;
}



function handleUsuario(event){
    window.location.href = "user_profile.html?userId=" + userId;
}



document.addEventListener("DOMContentLoaded", main);