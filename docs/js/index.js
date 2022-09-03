"use strict";

import { galleryRenderer } from "/js/renderers/gallery.js";
import { photosAPI } from "/js/api/photos.js";
import { messageRenderer } from "/js/renderers/messages.js";

function main() {

    loadPhotos();

}

function loadPhotos() {

    //Cargamos todas las fotos públicas y creamos la galería de fotos

    let galleryContainer = document.getElementById("gallery");

    photosAPI.getAllPublicPhotos()
        .then(photos => {
            let gallery = galleryRenderer.asCardGallery(photos);
            galleryContainer.appendChild(gallery);
            addHandlerMouseCards();
        })
        .catch(error => messageRenderer.showErrorMessage(error));

}


function addHandlerMouseCards() {

    //Seleccionamos todas las tarjetas (sean divs con clase card)
    let cards = document.querySelectorAll("div.card");

    for (let card of cards) {
        card.onmouseenter = handleMouseEnterCard;
        card.onmouseleave = handleMouseLeaveCard;
    }
}


function handleMouseEnterCard(event) {
    let c = event.target;
    c.style.backgroundColor = "black";
    c.style.color = "white";
}

function handleMouseLeaveCard(event) {
    let c = event.target;
    c.style.backgroundColor = "white";
    c.style.color = "black";
}


//Establecer la funcion main como la primera que se ejecuta al cargar la página
document.addEventListener("DOMContentLoaded", main);
