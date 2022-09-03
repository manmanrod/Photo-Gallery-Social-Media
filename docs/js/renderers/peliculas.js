"use strict";

import { parseHTML } from "/js/utils/parseHTML.js";

const peliculasRenderer = {
    asCard: function(pelicula){
        let html = `<div class="col-md-4 text-center">
            	        <div class="card my_card">
                        <img src="${pelicula.cartelURL}" class="card-img-top img-rounded">
            </a>
        <div class="card-body text-center">
            <h5 class="card-title">${pelicula.pelicula}</h5>
            <h6>${pelicula.pId}, (${pelicula.año}), [${pelicula.genero}]</h6>
            <p>${pelicula.sinopsis}</p>

        </div>
        </div>
    </div>`

    let card = parseHTML(html);

    return card;
    }
}

export { peliculasRenderer };