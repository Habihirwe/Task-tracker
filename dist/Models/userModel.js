"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _mongoose = _interopRequireDefault(require("mongoose"));
var userSchema = _mongoose["default"].Schema({
  firstname: {
    type: String,
    required: true
  },
  lastname: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  repeatPassword: {
    type: String,
    required: true
  },
  dateCreated: {
    type: 'date',
    "default": Date.now()
  }
});
var User = _mongoose["default"].model('User', userSchema);
var _default = exports["default"] = User;