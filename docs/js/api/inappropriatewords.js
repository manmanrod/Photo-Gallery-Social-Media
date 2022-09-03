"use strict";

import { BASE_URL } from "/js/api/common.js";

const inappropriateWordsAPI = {
    getAll: function() {
        return new Promise(function(resolve, reject){
            axios.get(BASE_URL + "/inappropriatewords")
                 .then(response => resolve(response.data))
                 .catch(error => reject(error.response.data.message));
        });
    },

};

export { inappropriateWordsAPI };