"use strict";

const registerValidator = {

    getErrors: function (formData) {

        let errors = [];

        let firstName = formData.get("firstName");
        let lastName = formData.get("lastName");
        let password = formData.get("password");
        let repeat_password = formData.get("repeat_password");

        if (firstName.length < 3) {
            errors.push("The first name must be at least 3 characters");
        }

        if (lastName.length < 3) {
            errors.push("The last name must be at least 3 characters");
        }

        if(password !== repeat_password){
            errors.push("The passwords must match");
        }


        return errors;
    }

};


export { registerValidator };