"use strict";

import { BASE_URL, requestOptions } from "./common.js";
const usersAPI = {

    getById: function (userId) {
        return new Promise(function(resolve, reject){
            axios
                .get(BASE_URL + "/users/" + userId)
                .then(response => resolve(response.data))
                .catch(error => reject(error.response.data.message))
        });
    },

};

export { usersAPI };