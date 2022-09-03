"use strict";

import { messageRenderer } from "/js/renderers/messages.js";
import { sessionManager } from "/js/utils/session.js";
import { usersAPI } from "/js/api/users.js";
import { photosAPI } from "/js/api/photos.js";
import { galleryRenderer } from "/js/renderers/gallery.js";

let urlParams = new URLSearchParams(window.location.search);
let userId = urlParams.get("userId");   //obtenemos userId de la URL

function main(){

    if(userId !== null){
        //Indicamos el usuario con su ID en la URL
        loadUserInfoById();
        loadUserPhotos();

    } else {

        //El usuario por defecto (logeado)
        loadUserPhotos();
        loadCurrentUserInfo();
    }
    
    console.log(window.location.search);
    
}


function loadUserInfoById(){

    let firstName = document.getElementById("firstName");
    let surname = document.getElementById("lastName");
    let email = document.getElementById("email");
    let username = document.getElementById("username");
    let userPhoto = document.getElementById("userPhoto");

    //Actualizamos los valores de la página por los del usuario concreto
    usersAPI.getById(userId)
        .then(user =>{
            //user devuelve un array y tenemos que coger el [0]
            console.log(user);
            firstName.textContent = user[0].firstName;
            surname.textContent = user[0].lastName;
            email.textContent = user[0].email;
            username.textContent = "@" + user[0].username;
            userPhoto.src = user[0].avatarUrl;
        })
        .catch(error => messageRenderer.showErrorMessage(error));
}




function loadUserPhotos(){

    //Establecemos userId nuevo que modificaremos;
    let nuevo_userId = null;

    if(userId === null){
        //Si no lo indicamos en la URL (de donde optenemos el userId) -> Ponemos la del usuario logeado
        nuevo_userId = sessionManager.getLoggedUser().userId;

    } else {
        //Usuario indicado en la URL -> Cargamos sus fotos
        nuevo_userId = userId;
    }



    let galleryContainer = document.getElementById("user-photos-container");
    
    //Cargamos las fotos del usuario correspondiente (por userId o logeado)
    photosAPI
        .getByUserId(nuevo_userId)
        .then(photos => {

            let gallery = galleryRenderer.asCardGallery(photos);
            galleryContainer.appendChild(gallery);
            addHandlerMouseCards();
        })
        .catch(error => messageRenderer.showErrorMessage(error));
}


function loadCurrentUserInfo(){

    //Usuario por defecto (logeado) -> Cargamos sus datos

    let firstName = document.getElementById("firstName");
    let surname = document.getElementById("lastName");
    let email = document.getElementById("email");
    let username = document.getElementById("username");
    let profilephoto = document.getElementById("userPhoto");

    firstName.textContent = sessionManager.getLoggedUser().firstName;
    lastName.textContent = sessionManager.getLoggedUser().lastName;
    email.textContent = sessionManager.getLoggedUser().email;
    username.textContent = "@" + sessionManager.getLoggedUser().username;
    userPhoto.src = sessionManager.getLoggedUser().avatarUrl;
}



function addHandlerMouseCards() {
    //Seleccionamos todas las tarjetas (divs con clase card)
    let cards = document.querySelectorAll("div.card");

    for (let card of cards) {
        card.onmouseenter = handleMouseEnterCard;
        card.onmouseleave = handleMouseLeaveCard;
    }
}



function handleMouseEnterCard(event) {
    let c = event.target;
    c.style.backgroundColor = "black";
    c.style.color = "white";
}



function handleMouseLeaveCard(event) {
    let c = event.target;
    c.style.backgroundColor = "white";
    c.style.color = "black";
}



document.addEventListener("DOMContentLoaded", main);