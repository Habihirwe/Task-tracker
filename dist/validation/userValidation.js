"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _joi = _interopRequireDefault(require("joi"));
var userValidationSchema = _joi["default"].object({
  firstname: _joi["default"].string().required().min(2).label("firstname").regex(/^[A-Za-z]+$/).messages({
    "string.pattern.base": "The name field can not include numbers and special characters",
    "string.empty": "The name field can not be empty"
  }),
  lastname: _joi["default"].string().required().min(2).label("lastname").regex(/^[A-Za-z]+$/).messages({
    "string.pattern.base": "The name field can not include numbers and special characters",
    "string.empty": "The name field can not be empty"
  }),
  email: _joi["default"].string().required().email().messages({
    "string.email": "Invalid email",
    "string.empty": "The email field can not be empty"
  }),
  password: _joi["default"].string().required().regex(/^(?=(.*[A-Z]){1,})(?=(.*[a-z]){1,})(?=(.*[0-9]){1,}).{5,}$/).messages({
    "string.pattern.base": "The password should have at least one capital letter and a number",
    "string.empty": "The password field can not be empty"
  }),
  repeatPassword: _joi["default"].string().required().equal(_joi["default"].ref("password")).messages({
    "any.only": "Passwords don't match"
  })
});
var _default = exports["default"] = userValidationSchema;