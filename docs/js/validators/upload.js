"use strict";

import { inappropriateWordsAPI } from "/js/api/inappropriatewords.js";

let listaInsultos = [];


const uploadValidator = {

    
    getInsultos: function () {

        inappropriateWordsAPI
            .getAll()
            .then(objetos =>{
                //Por cada elemento, que es de tipo Object, obtenemos la palabra. Ej: {"word": cabron}, {...}
                listaInsultos = objetos.map(elem => elem.word);
                console.log(listaInsultos);
            })
            .catch(error => console.log(error));


        return listaInsultos;
    }



};

export { uploadValidator };