"use strict";

import { parseHTML } from "/js/utils/parseHTML.js";
import { photoRenderer } from "/js/renderers/photos.js"; 
import { peliculasRenderer } from "/js/renderers/peliculas.js";

const galleryRenderer = {

    asCardGallery: function (photos) {

        let html = `<div class="row my-auto"></div>`;
        let gallery = parseHTML(html);

        for (let photo of photos) {
            let card = photoRenderer.asCard(photo);
            gallery.appendChild(card);
        }

        return gallery;
    },

    asCardGalleryFilm: function(peliculas){

        let html = `<div class="row my-auto"></div>`;
        let gallery = parseHTML(html);

        for(let pelicula of peliculas){
            let card = peliculasRenderer.asCard(pelicula);
            gallery.appendChild(card);
        }

        return gallery;
    }

};



export { galleryRenderer };