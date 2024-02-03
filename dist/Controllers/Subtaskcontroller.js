"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.updatingsubtaskstatus = exports.updatesubtask = exports.getsinglesubtask = exports.getAllsubtasks = exports.deletesubtask = exports.createsubtask = void 0;
var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));
var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));
var _subtaskvalidation = _interopRequireDefault(require("../validation/subtaskvalidation.js"));
var _subtaskModel = _interopRequireDefault(require("../Models/subtaskModel.js"));
var _taskModel = _interopRequireDefault(require("../Models/taskModel.js"));
var createsubtask = exports.createsubtask = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, res) {
    var _subtaskValidationSCh, error, taskId, existingtask, subtask, savedSubtask;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          _subtaskValidationSCh = _subtaskvalidation["default"].validate(req.body), error = _subtaskValidationSCh.error;
          if (!error) {
            _context.next = 3;
            break;
          }
          return _context.abrupt("return", res.status(400).json({
            status: "fail",
            validationError: error.details[0].message
          }));
        case 3:
          _context.prev = 3;
          taskId = req.params.taskId;
          _context.next = 7;
          return _taskModel["default"].findById(taskId);
        case 7:
          existingtask = _context.sent;
          if (existingtask) {
            _context.next = 10;
            break;
          }
          return _context.abrupt("return", res.status(404).json({
            status: 'fail',
            "error": "the task not found"
          }));
        case 10:
          subtask = new _subtaskModel["default"]({
            title: req.body.title,
            description: req.body.description,
            task: existingtask._id
          });
          _context.next = 13;
          return subtask.save();
        case 13:
          savedSubtask = _context.sent;
          existingtask.subtasks.push(savedSubtask._id);
          _context.next = 17;
          return existingtask.save();
        case 17:
          _context.next = 19;
          return savedSubtask.populate({
            path: 'task',
            select: '_id'
          });
        case 19:
          return _context.abrupt("return", res.status(201).json({
            status: 'success',
            "successMessage": "new subtask created successfully",
            data: savedSubtask
          }));
        case 22:
          _context.prev = 22;
          _context.t0 = _context["catch"](3);
          return _context.abrupt("return", res.status(400).json({
            status: "fail",
            error: _context.t0
          }));
        case 25:
        case "end":
          return _context.stop();
      }
    }, _callee, null, [[3, 22]]);
  }));
  return function createsubtask(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();
var getsinglesubtask = exports.getsinglesubtask = /*#__PURE__*/function () {
  var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(req, res) {
    var singlesubtask;
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) switch (_context2.prev = _context2.next) {
        case 0:
          _context2.prev = 0;
          _context2.next = 3;
          return _subtaskModel["default"].findById(req.params.id);
        case 3:
          singlesubtask = _context2.sent;
          if (singlesubtask) {
            _context2.next = 6;
            break;
          }
          return _context2.abrupt("return", res.status(404).json({
            status: "fail",
            message: "subtask not found"
          }));
        case 6:
          return _context2.abrupt("return", res.status(200).json({
            status: 'success',
            data: singlesubtask
          }));
        case 9:
          _context2.prev = 9;
          _context2.t0 = _context2["catch"](0);
          return _context2.abrupt("return", res.status(500).json({
            staus: 'fail',
            error: _context2.t0.message
          }));
        case 12:
        case "end":
          return _context2.stop();
      }
    }, _callee2, null, [[0, 9]]);
  }));
  return function getsinglesubtask(_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}();
var getAllsubtasks = exports.getAllsubtasks = /*#__PURE__*/function () {
  var _ref3 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(req, res) {
    var allsubtasks;
    return _regenerator["default"].wrap(function _callee3$(_context3) {
      while (1) switch (_context3.prev = _context3.next) {
        case 0:
          _context3.prev = 0;
          _context3.next = 3;
          return _subtaskModel["default"].find();
        case 3:
          allsubtasks = _context3.sent;
          res.status(200).json({
            status: "success",
            data: allsubtasks
          });
          _context3.next = 10;
          break;
        case 7:
          _context3.prev = 7;
          _context3.t0 = _context3["catch"](0);
          res.status(500).json({
            status: "fail",
            error: _context3.t0.message
          });
        case 10:
        case "end":
          return _context3.stop();
      }
    }, _callee3, null, [[0, 7]]);
  }));
  return function getAllsubtasks(_x5, _x6) {
    return _ref3.apply(this, arguments);
  };
}();
var updatingsubtaskstatus = exports.updatingsubtaskstatus = /*#__PURE__*/function () {
  var _ref4 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4(req, res) {
    var subtaskId, newstatus, existingsubtask, updatedTask;
    return _regenerator["default"].wrap(function _callee4$(_context4) {
      while (1) switch (_context4.prev = _context4.next) {
        case 0:
          _context4.prev = 0;
          subtaskId = req.params.subtaskId;
          newstatus = req.body.status;
          _context4.next = 5;
          return _subtaskModel["default"].findById(subtaskId);
        case 5:
          existingsubtask = _context4.sent;
          if (existingsubtask) {
            _context4.next = 8;
            break;
          }
          return _context4.abrupt("return", res.status(404).json({
            status: "fail",
            message: "subtask not found"
          }));
        case 8:
          if (_subtaskModel["default"].schema.path('status').enumValues.includes(newstatus)) {
            _context4.next = 10;
            break;
          }
          return _context4.abrupt("return", res.status(400).json({
            message: 'Invalid status value'
          }));
        case 10:
          if (!(existingsubtask.status === 'Started' && newstatus === 'Queuing')) {
            _context4.next = 12;
            break;
          }
          return _context4.abrupt("return", res.status(400).json({
            message: 'Cannot transition from started to queuing'
          }));
        case 12:
          if (!((existingsubtask.status === 'Completed' || existingsubtask.status === 'Canceled') && newstatus !== 'Completed')) {
            _context4.next = 14;
            break;
          }
          return _context4.abrupt("return", res.status(400).json({
            message: 'Cannot transition from completed/canceled to a different status'
          }));
        case 14:
          if (!(existingsubtask.status === "Canceled")) {
            _context4.next = 16;
            break;
          }
          return _context4.abrupt("return", res.status(400).json({
            message: "can not be updated to order status"
          }));
        case 16:
          existingsubtask.status = newstatus;
          _context4.next = 19;
          return existingsubtask.save();
        case 19:
          updatedTask = _context4.sent;
          return _context4.abrupt("return", res.status(201).json({
            status: "success",
            message: "Subtast status updated",
            data: updatedTask
          }));
        case 23:
          _context4.prev = 23;
          _context4.t0 = _context4["catch"](0);
          return _context4.abrupt("return", res.json(500).json({
            status: "fail",
            error: _context4.t0
          }));
        case 26:
        case "end":
          return _context4.stop();
      }
    }, _callee4, null, [[0, 23]]);
  }));
  return function updatingsubtaskstatus(_x7, _x8) {
    return _ref4.apply(this, arguments);
  };
}();
var deletesubtask = exports.deletesubtask = /*#__PURE__*/function () {
  var _ref5 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee5(req, res) {
    var subtaskId, subtask, associatedTask;
    return _regenerator["default"].wrap(function _callee5$(_context5) {
      while (1) switch (_context5.prev = _context5.next) {
        case 0:
          _context5.prev = 0;
          subtaskId = req.params.id;
          _context5.next = 4;
          return _subtaskModel["default"].findById(subtaskId);
        case 4:
          subtask = _context5.sent;
          if (subtask) {
            _context5.next = 7;
            break;
          }
          return _context5.abrupt("return", res.status(404).json({
            status: 'fail',
            error: "Subtask does not exist"
          }));
        case 7:
          _context5.next = 9;
          return _taskModel["default"].findById(subtask.task);
        case 9:
          associatedTask = _context5.sent;
          if (associatedTask) {
            _context5.next = 12;
            break;
          }
          return _context5.abrupt("return", res.status(404).json({
            status: 'fail',
            error: "Associated task not found"
          }));
        case 12:
          associatedTask.subtasks = associatedTask.subtasks.filter(function (taskId) {
            return taskId.toString() !== subtaskId.toString();
          });
          _context5.next = 15;
          return associatedTask.save();
        case 15:
          _context5.next = 17;
          return subtask.deleteOne();
        case 17:
          return _context5.abrupt("return", res.status(200).json({
            status: "success",
            message: "Subtask deleted successfully"
          }));
        case 20:
          _context5.prev = 20;
          _context5.t0 = _context5["catch"](0);
          return _context5.abrupt("return", res.status(500).json({
            error: _context5.t0.message
          }));
        case 23:
        case "end":
          return _context5.stop();
      }
    }, _callee5, null, [[0, 20]]);
  }));
  return function deletesubtask(_x9, _x10) {
    return _ref5.apply(this, arguments);
  };
}();
var updatesubtask = exports.updatesubtask = /*#__PURE__*/function () {
  var _ref6 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee6(req, res) {
    var _subtaskValidationSCh2, error, updatedtask;
    return _regenerator["default"].wrap(function _callee6$(_context6) {
      while (1) switch (_context6.prev = _context6.next) {
        case 0:
          _context6.prev = 0;
          _subtaskValidationSCh2 = _subtaskvalidation["default"].validate(req.body), error = _subtaskValidationSCh2.error;
          if (!error) {
            _context6.next = 4;
            break;
          }
          return _context6.abrupt("return", res.status(400).json({
            status: "fail",
            validationError: error.details[0].message
          }));
        case 4:
          _context6.next = 6;
          return _subtaskModel["default"].findByIdAndUpdate(req.params.id, {
            $set: {
              title: req.body.title,
              description: req.body.description
            }
          }, {
            "new": true
          });
        case 6:
          updatedtask = _context6.sent;
          if (updatedtask) {
            _context6.next = 9;
            break;
          }
          return _context6.abrupt("return", res.status(200).json({
            status: "fail",
            message: "subtask not found"
          }));
        case 9:
          res.status(200).json({
            status: "success",
            successMessage: "subtask updated successfully!",
            data: updatedtask
          });
          _context6.next = 15;
          break;
        case 12:
          _context6.prev = 12;
          _context6.t0 = _context6["catch"](0);
          res.status(500).json({
            status: "fail",
            error: _context6.t0.message
          });
        case 15:
        case "end":
          return _context6.stop();
      }
    }, _callee6, null, [[0, 12]]);
  }));
  return function updatesubtask(_x11, _x12) {
    return _ref6.apply(this, arguments);
  };
}();