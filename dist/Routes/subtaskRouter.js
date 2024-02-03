"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _express = _interopRequireDefault(require("express"));
var _authentication = _interopRequireDefault(require("../midleware/authentication.js"));
var _Subtaskcontroller = require("../Controllers/Subtaskcontroller.js");
var subtaskRoute = _express["default"].Router();
subtaskRoute.post('/createsubtask/:taskId', _authentication["default"], _Subtaskcontroller.createsubtask);
subtaskRoute.get('/getsinglesubtask/:id', _authentication["default"], _Subtaskcontroller.getsinglesubtask);
subtaskRoute.get('/getallsubtasks', _authentication["default"], _Subtaskcontroller.getAllsubtasks);
subtaskRoute["delete"]('/deletesubtask/:id', _authentication["default"], _Subtaskcontroller.deletesubtask);
subtaskRoute.put('/updatesubtask/:id', _authentication["default"], _Subtaskcontroller.updatesubtask);
subtaskRoute.put('/subtaskstatus/:subtaskId', _authentication["default"], _Subtaskcontroller.updatingsubtaskstatus);
var _default = exports["default"] = subtaskRoute;