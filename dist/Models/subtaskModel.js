"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _mongoose = _interopRequireDefault(require("mongoose"));
var subtaskSchema = _mongoose["default"].Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  task: {
    type: _mongoose["default"].Schema.Types.ObjectId,
    ref: 'Task',
    required: true
  },
  status: {
    type: String,
    "enum": ['Queuing', 'Started', 'Completed', 'Canceled'],
    "default": 'Queuing'
  },
  iscomplete: {
    type: Boolean,
    "default": false
  },
  dateCreated: {
    type: 'date',
    "default": Date.now()
  }
});
var Subtask = _mongoose["default"].model('Subtask', subtaskSchema);
var _default = exports["default"] = Subtask;