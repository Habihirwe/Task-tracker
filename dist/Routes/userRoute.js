"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _userController = require("../Controllers/userController.js");
var _express = _interopRequireDefault(require("express"));
var userRoute = _express["default"].Router();
userRoute.post('/signup', _userController.createUser);
userRoute.post('/login', _userController.Login);
userRoute.get('/getSingleUser/:id', _userController.getsingleUser);
userRoute.get("/getAllUsers", _userController.getAllUsers);
var _default = exports["default"] = userRoute;