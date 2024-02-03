"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _taskController = require("../Controllers/taskController.js");
var _authentication = _interopRequireDefault(require("../midleware/authentication.js"));
var _express = _interopRequireDefault(require("express"));
var taskRoute = _express["default"].Router();
taskRoute.post('/createtask', _authentication["default"], _taskController.createtask);
taskRoute.get('/getsingletask/:id', _authentication["default"], _taskController.getsingletask);
taskRoute.get('/getalltasks', _taskController.getAlltasks);
taskRoute["delete"]('/deletetask/:id', _authentication["default"], _taskController.deletetask);
taskRoute.put('/updatetask/:id', _authentication["default"], _taskController.updatetask);
taskRoute.get('/gettaskwithsub/:taskId', _authentication["default"], _taskController.getTaskwithSubtask);
taskRoute.put('/updatetaskstatus/:taskId', _authentication["default"], _taskController.updateTaskStatus);
var _default = exports["default"] = taskRoute;