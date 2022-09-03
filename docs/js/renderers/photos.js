"use strict";

import { parseHTML } from "/js/utils/parseHTML.js";
import { usersAPI } from "/js/api/users.js";
import { messageRenderer } from "/js/renderers/messages.js";
import { ratingsAPI } from "/js/api/ratings.js";

const photoRenderer = {
    asCard: function (photo) {
        let html = `<div class="col-md-4 text-center">
                            <div class="card my_card">
                                <a href="show_photo.html?photoId=${photo.photoId}&userId=${photo.userId}" id="user-name">
                                    <img src="${photo.url}" 
                                        class="card-img-top img-rounded" alt="Merienda">
                                </a>
                            <div class="card-body text-center">
                                <h5 class="card-title">${photo.title}</h5>
                                <h6 id="show_username"></h6>
                                
                                <button type="button" class="btn btn-primary btn-sm">
                                    <a href="show_photo.html?photoId=${photo.photoId}&userId=${photo.userId}"
                                     class="remove-blue">Click for more info</a>
                                </button>

                                <div id="average_rating"></div>

                            </div>
                            </div>
                        </div> `;

        let card = parseHTML(html);

        usersAPI.getById(photo.userId)
            .then(users => card.querySelector("#show_username").innerHTML = `<b>@${users[0].username}</b>`)
            .catch(error => messageRenderer.showErrorMessage(error));


            ratingsAPI.getByPhotoId(photo.photoId)
                .then(ratings => card.querySelector("#average_rating").innerHTML = `<span class="fa fa-star"></span> ` + `${ratings[0].value}`)
                .catch(error => messageRenderer.showMessageAsAlert(error));

        return card;

    },


    asDetails: function (photo) {
        let html =
            `<div class="row">
            <div class="col-md-9 my-auto text-center">
                <img src="${photo.url}" class="d-block rounded img-fluid" alt="${photo.description}"
                height="1000" width="1000">

                <div>Photo by: <a id="show_username" href="user_profile.html?userId=${photo.userId}"></a> </div>
            
                <!-- DELETE AND EDIT BUTTONS -->
                <div id="edit-delete-buttons">
                    <button id="button-delete" class="btn btn-primary remove-blue pull-left">
                        <i class="fa fa-trash" aria-hidden="true"></i>
                        DELETE
                    </button>

                    <button id="button-edit" class="btn btn-danger remove-blue pull-right">
                        <i class="fa fa-pencil-square-o" aria-hidden="true"></i>
                        EDIT
                    </button>
                    
                </div>

            </div>

            <!-- DETAILS SECTION -->
            <div class="col-md-3">

                <!-- Title -->
                <div class="text-center">
                    <h4>Title: </h4>
                    <p class="my-auto">${photo.title}</p>
                </div>

                <hr>

                <!-- Description -->
                <div class="text-center my-auto">
                    <h4>Description: </h4> <p class="my-auto">${photo.description}</p>
                </div>

                <hr>

                <!-- Published date -->
                <div class="text-center">
                    <h4>Published date: </h4>
                    <p class="my-auto">${photo.date}</p>
                </div>

                <hr>

                <!-- Visibility -->
                <div class="text-center">
                    <h4>Visibility: </h4>
                    <p class="my-auto">${photo.visibility}</p>
                </div>
                
                <hr>

                <div class="text-center">

                <div class="text-center">
                    <h3>Ratings</h3>
                    <div>
                        
                    <div id="average_rating"></div>
                    </div>
                </div>

                <form id="rating-form">
                    <select name="VALUE" class="form-control">
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                    </select>
                    <div class="col-md text-center">
                        <div class="rate-button">
                            <button type="submit" class="btn btn-primary small-top-margin">Rate photo!</button>
                        </div>
                    </div>
                </form>
                </div>


            </div> <!-- Details section ends here -->

        </div>`;


        let card = parseHTML(html);

        //Obtenemos las valoraciones medias de la foto y la insertamos
        ratingsAPI.getByPhotoId(photo.photoId)
            .then(ratings => card.querySelector("#average_rating").innerHTML = `<span class="fa fa-star"></span> ` + `${ratings[0].value}`)
            .catch(error => messageRenderer.showMessageAsAlert(error));


        //Obtenemos el username del usuario que subió la foto y lo insertamos
        usersAPI.getById(photo.userId)
            .then(users => card.querySelector("#show_username").innerHTML = `<b>@${users[0].username}</b>`)
            .catch(error => messageRenderer.showErrorMessage(error));


        return card;
    }



};


export { photoRenderer };