"use strict";

import { BASE_URL, requestOptions } from "/js/api/common.js";

const ratingsAPI = {
    getAll: function () {
        return new Promise(function (resolve, reject) {
            axios.get(BASE_URL + "/ratings")
                .then(response => resolve(response.data))
                .catch(error => reject(error.response.data.message));
        });
    },


    getById: function (ratingId) {
        return new Promise(function (resolve, reject) {
            axios.get(BASE_URL + "/ratings/" + ratingId, requestOptions)
                .then(response => resolve(response.data))
                .catch(error => reject(error.response.data.message));
        });
    },

    getByPhotoId: function(photoId){
        return new Promise(function(resolve, reject){
            axios.get(BASE_URL + "/" + photoId + "/ratings")
                .then(response => resolve(response.data))
                .catch(error => reject(error.response.data.message));
        });
    },

    create: function(formData){
        return new Promise(function(resolve, reject){
            axios
                .post(BASE_URL + "/ratings", formData, requestOptions)
                .then(response => resolve(response.data))
                .catch(error => reject(error.response.data.message));
        });
    },


};

export { ratingsAPI };