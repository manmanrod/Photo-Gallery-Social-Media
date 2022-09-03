"use strict";

import {BASE_URL, requestOptions } from "/js/api/common.js";

const peliculasAPI = {
    getAll: function() {
        return new Promise(function(resolve, reject){
            axios.get(BASE_URL + "/peliculas")
            .then(response => resolve(response.data))
            .catch(error => reject(error.response.data.message));
        });
    }
}

export { peliculasAPI };