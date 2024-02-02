import Joi from "joi";

const userValidationSchema = Joi.object({
    firstname: Joi.string().required().min(2).label("firstname").regex(/^[A-Za-z]+$/).messages({
        "string.pattern.base": "The name field can not include numbers and special characters",
        "string.empty": "The name field can not be empty"
    }),

    lastname: Joi.string().required().min(2).label("lastname").regex(/^[A-Za-z]+$/).messages({
        "string.pattern.base": "The name field can not include numbers and special characters",
        "string.empty": "The name field can not be empty"
    }),

    email: Joi.string().required().email().messages({
        "string.email": "Invalid email",
        "string.empty": "The email field can not be empty"
    }),

    password: Joi.string().required().regex(/^(?=(.*[A-Z]){1,})(?=(.*[a-z]){1,})(?=(.*[0-9]){1,}).{5,}$/).messages({
        "string.pattern.base": "The password should have at least one capital letter and a number",
        "string.empty": "The password field can not be empty"
    }),

    repeatPassword: Joi.string().required().equal(Joi.ref("password")).messages({
        "any.only": "Passwords don't match"
    })
})


export default userValidationSchema