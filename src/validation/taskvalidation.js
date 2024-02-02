import Joi from "joi";

const taskValidationSChema = Joi.object ({

    title: Joi.string().required().label("Title").regex(/^[A-Za-z ]+$/).messages({
        "string.pattern.base": "The titles can not include numbers and special characters",
        "any.required": "The title field can not be empty"
    }),
    description: Joi.string().required().label("description").messages({
      "any.required": "The  description field can not be empty"
  }),
    starteddate:Joi.string().required().label("startingtime").messages({
    "any.required": "The  description field can not be empty"
  }),
  priority:Joi.string().required().label("priority").messages({
    "any.required": "The  description field can not be empty"
  }),

})

export default  taskValidationSChema;