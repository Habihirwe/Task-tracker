"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _mongoose = _interopRequireDefault(require("mongoose"));
var taskSchema = _mongoose["default"].Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  iscomplete: {
    type: Boolean,
    "default": false
  },
  priority: {
    type: String,
    "enum": ['Low', 'Medium', 'High'],
    "default": 'Medium'
  },
  starteddate: {
    type: Date,
    required: true
  },
  subtasks: [{
    type: _mongoose["default"].Schema.Types.ObjectId,
    ref: 'Subtask'
  }],
  status: {
    type: String,
    "enum": ['Queuing', 'Started', 'Completed', 'Canceled'],
    "default": 'Queuing'
  },
  dateCreated: {
    type: 'date',
    "default": Date.now()
  }
});
var Task = _mongoose["default"].model('Task', taskSchema);
var _default = exports["default"] = Task;