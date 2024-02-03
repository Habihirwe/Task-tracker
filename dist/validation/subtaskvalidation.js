"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _joi = _interopRequireDefault(require("joi"));
var subtaskValidationSChema = _joi["default"].object({
  title: _joi["default"].string().required().label("Title").regex(/^[A-Za-z ]+$/).messages({
    "string.pattern.base": "The titles can not include numbers and special characters",
    "any.required": "The title field can not be empty"
  }),
  description: _joi["default"].string().required().label("description").messages({
    "any.required": "The  description field can not be empty"
  })
});
var _default = exports["default"] = subtaskValidationSChema;