"use strict";

import { BASE_URL, requestOptions } from "/js/api/common.js";

const photosAPI = {
    getAll: function() {
        return new Promise(function(resolve, reject){
            axios.get(BASE_URL + "/photos")
                 .then(response => resolve(response.data))
                 .catch(error => reject(error.response.data.message));
        });
    },

    getById: function(photoId) {
        return new Promise(function(resolve, reject) {
            axios.get(BASE_URL + "/photos/" + photoId)
                 .then(response => resolve(response.data[0]))
                 .catch(error => reject(error.response.data.message));
        });
    },

    getByUserId: function(userId){
        return new Promise(function(resolve, reject){
            axios.get(BASE_URL + "/" + userId + "/photos")
                .then(response => resolve(response.data))
                .catch(error => reject(error.response.data.message));
        });
    },

    getAllPublicPhotos: function() {
        return new Promise(function(resolve, reject){
            axios.get(BASE_URL + "/showPublicPhotos")
                 .then(response => resolve(response.data))
                 .catch(error => reject(error.response.data.message));
        });
    },


    create: function(formData){
        return new Promise(function(resolve, reject){
            axios
                .post(BASE_URL + "/photos", formData, requestOptions)
                .then(response => resolve(response.data))
                .catch(error => reject(error.response.data.message));
        });
    },


    update: function(photoId, formData){
        return new Promise(function(resolve, reject){
            axios
                .put(BASE_URL + "/photos/" + photoId, formData, requestOptions)
                .then(response => resolve(response.data))
                .catch(error => reject(error.response.data.nessage));
        });
    },
    

    delete: function(photoId){
        return new Promise(function(resolve, reject){
            axios
                .delete(BASE_URL + "/photos/" + photoId, requestOptions)
                .then(response => resolve(response.data))
                .catch(error => reject(error.response.data.message))
        });
    },

};

export { photosAPI };