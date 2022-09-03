"use strict";

import { messageRenderer } from "/js/renderers/messages.js";
import { peliculasAPI } from "/js/api/peliculas.js";
import { galleryRenderer } from "/js/renderers/gallery.js";

function main(){
    loadPeliculas();
}

function loadPeliculas(){

    let filmGalleryContainer = document.getElementById("peliculas-gallery");

    peliculasAPI.getAll()
        .then(peliculas =>{
            let gallery = galleryRenderer.asCardGalleryFilm(peliculas);
            filmGalleryContainer.appendChild(gallery);

        })
        .catch(error => messageRenderer.showErrorMessage(error));

}

document.addEventListener("DOMContentLoaded", main);
