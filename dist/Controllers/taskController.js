"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.updatetask = exports.updateTaskStatus = exports.getsingletask = exports.getTaskwithSubtask = exports.getAlltasks = exports.deletetask = exports.createtask = void 0;
var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));
var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));
var _taskModel = _interopRequireDefault(require("../Models/taskModel.js"));
var _subtaskModel = _interopRequireDefault(require("../Models/subtaskModel.js"));
var _taskvalidation = _interopRequireDefault(require("../validation/taskvalidation.js"));
var createtask = exports.createtask = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, res) {
    var _taskValidationSChema, error, task, newtask;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          _taskValidationSChema = _taskvalidation["default"].validate(req.body), error = _taskValidationSChema.error;
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
          task = new _taskModel["default"]({
            title: req.body.title,
            description: req.body.description,
            starteddate: req.body.starteddate,
            priority: req.body.priority
          });
          _context.next = 7;
          return task.save();
        case 7:
          newtask = _context.sent;
          return _context.abrupt("return", res.status(201).json({
            status: "success",
            successMessage: "new task created successfully",
            data: newtask
          }));
        case 11:
          _context.prev = 11;
          _context.t0 = _context["catch"](3);
          return _context.abrupt("return", res.status(400).json({
            status: "fail",
            error: _context.t0
          }));
        case 14:
        case "end":
          return _context.stop();
      }
    }, _callee, null, [[3, 11]]);
  }));
  return function createtask(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();
var getsingletask = exports.getsingletask = /*#__PURE__*/function () {
  var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(req, res) {
    var singletask;
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) switch (_context2.prev = _context2.next) {
        case 0:
          _context2.prev = 0;
          _context2.next = 3;
          return _taskModel["default"].findById(req.params.id).populate("subtasks");
        case 3:
          singletask = _context2.sent;
          if (singletask) {
            _context2.next = 6;
            break;
          }
          return _context2.abrupt("return", res.status(404).json({
            status: "fail",
            message: "task not found"
          }));
        case 6:
          return _context2.abrupt("return", res.status(200).json({
            status: "success",
            data: singletask
          }));
        case 9:
          _context2.prev = 9;
          _context2.t0 = _context2["catch"](0);
          return _context2.abrupt("return", res.status(500).json({
            staus: "fail",
            error: _context2.t0.message
          }));
        case 12:
        case "end":
          return _context2.stop();
      }
    }, _callee2, null, [[0, 9]]);
  }));
  return function getsingletask(_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}();
var getAlltasks = exports.getAlltasks = /*#__PURE__*/function () {
  var _ref3 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(req, res) {
    var alltasks;
    return _regenerator["default"].wrap(function _callee3$(_context3) {
      while (1) switch (_context3.prev = _context3.next) {
        case 0:
          _context3.prev = 0;
          _context3.next = 3;
          return _taskModel["default"].find();
        case 3:
          alltasks = _context3.sent;
          res.status(200).json({
            status: "success",
            data: alltasks
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
  return function getAlltasks(_x5, _x6) {
    return _ref3.apply(this, arguments);
  };
}();
var getTaskwithSubtask = exports.getTaskwithSubtask = /*#__PURE__*/function () {
  var _ref4 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4(req, res) {
    var taskId, task;
    return _regenerator["default"].wrap(function _callee4$(_context4) {
      while (1) switch (_context4.prev = _context4.next) {
        case 0:
          _context4.prev = 0;
          taskId = req.params.taskId;
          _context4.next = 4;
          return _taskModel["default"].findById(taskId).populate("subtasks");
        case 4:
          task = _context4.sent;
          return _context4.abrupt("return", res.status.json({
            status: "success",
            message: "successifully retrived",
            data: task
          }));
        case 8:
          _context4.prev = 8;
          _context4.t0 = _context4["catch"](0);
          return _context4.abrupt("return", res.status(500).json({
            message: _context4.t0.message
          }));
        case 11:
        case "end":
          return _context4.stop();
      }
    }, _callee4, null, [[0, 8]]);
  }));
  return function getTaskwithSubtask(_x7, _x8) {
    return _ref4.apply(this, arguments);
  };
}();
var deletetask = exports.deletetask = /*#__PURE__*/function () {
  var _ref5 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee5(req, res) {
    var task;
    return _regenerator["default"].wrap(function _callee5$(_context5) {
      while (1) switch (_context5.prev = _context5.next) {
        case 0:
          _context5.prev = 0;
          _context5.next = 3;
          return _taskModel["default"].findById(req.params.id);
        case 3:
          task = _context5.sent;
          if (task) {
            _context5.next = 6;
            break;
          }
          return _context5.abrupt("return", res.status(404).json({
            status: "fail",
            error: "task does not exist"
          }));
        case 6:
          _context5.next = 8;
          return task.deleteOne();
        case 8:
          return _context5.abrupt("return", res.status(200).json({
            status: "success",
            message: "Task deleted successfully"
          }));
        case 11:
          _context5.prev = 11;
          _context5.t0 = _context5["catch"](0);
          return _context5.abrupt("return", res.status(500).json({
            error: _context5.t0.message
          }));
        case 14:
        case "end":
          return _context5.stop();
      }
    }, _callee5, null, [[0, 11]]);
  }));
  return function deletetask(_x9, _x10) {
    return _ref5.apply(this, arguments);
  };
}();

// const updateTaskStatus = async (req, res) => {
//   try {
//     const taskId = req.params.id
//     console.log('taskId','hjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjj')
//     const newstatus= req.body.status
//     console.log(newstatus)
//     const existingTask = await Task.findById(taskId);
//     console.log(existingTask)

//     if (!existingTask) {
//       return res.status(404).json({
//         status: "fail",
//         error: "Task not found",
//       });
//     }

//     if (!Task.schema.path("status").enumValues.includes(newstatus)) {
//       return res.status(400).json({ message: "Invalid status value" });
//     }

//     if (existingTask.status === "Started" && newstatus === "Queuing") {
//       return res
//         .status(400)
//         .json({ message: "Cannot transition from started to queuing" });
//     }

//     if (
//       (existingTask.status === "Completed" ||
//         existingTask.status === "Canceled") &&
//       newstatus !== "Completed"
//     ) {
//       return res
//         .status(400)
//         .json({
//           message:
//             "Cannot transition from completed/canceled to a different status",
//         });
//     }

//     if (existingTask.status === "Canceled") {
//       return res
//         .status(400)
//         .json({ message: "Cannot be updated to another status when canceled" });
//     }

//     if (existingTask.subtasks.length === 0) {
//       existingTask.status = "Completed";
//     } else {
//       const allSubtasksCompleted = existingTask.subtasks.every(
//         async (subtaskId) => {
//           const subtask = await Subtask.findById(subtaskId);
//           return subtask && subtask.status === "Completed";
//         }
//       );

//       existingTask.status = allSubtasksCompleted ? "Completed" : newStatus;
//     }

//     const updatedTask = await existingTask.save();

//     return res.status(201).json({
//       status: "success",
//       message: "Task status updated",
//       data: updatedTask,
//     });
//   } catch (err) {
//     return res.status(500).json({
//       status: "fail",
//       error: err.message,
//     });
//   }
// };

var updateTaskStatus = exports.updateTaskStatus = /*#__PURE__*/function () {
  var _ref6 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee6(req, res) {
    var taskId, newStatus, existingTask, allSubtasksCompleted, updatedTask;
    return _regenerator["default"].wrap(function _callee6$(_context6) {
      while (1) switch (_context6.prev = _context6.next) {
        case 0:
          _context6.prev = 0;
          taskId = req.params.taskId;
          newStatus = req.body.status;
          _context6.next = 5;
          return _taskModel["default"].findById(taskId);
        case 5:
          existingTask = _context6.sent;
          if (existingTask) {
            _context6.next = 8;
            break;
          }
          return _context6.abrupt("return", res.status(404).json({
            status: "fail",
            error: "Task not found"
          }));
        case 8:
          if (_taskModel["default"].schema.path("status").enumValues.includes(newStatus)) {
            _context6.next = 10;
            break;
          }
          return _context6.abrupt("return", res.status(400).json({
            message: "Invalid status value"
          }));
        case 10:
          if (!(existingTask.status === "Started" && newStatus === "Queuing")) {
            _context6.next = 12;
            break;
          }
          return _context6.abrupt("return", res.status(400).json({
            message: "Cannot transition from started to queuing"
          }));
        case 12:
          if (!((existingTask.status === "Completed" || existingTask.status === "Canceled") && newStatus !== "Completed")) {
            _context6.next = 14;
            break;
          }
          return _context6.abrupt("return", res.status(400).json({
            message: "Cannot transition from completed/canceled to a different status"
          }));
        case 14:
          if (!(existingTask.status === "Canceled")) {
            _context6.next = 16;
            break;
          }
          return _context6.abrupt("return", res.status(400).json({
            message: "Cannot be updated to another status when canceled"
          }));
        case 16:
          allSubtasksCompleted = existingTask.subtasks.every(function (subtask) {
            return subtask.status === "Completed";
          });
          existingTask.status = allSubtasksCompleted ? "Completed" : newStatus;
          _context6.next = 20;
          return existingTask.save();
        case 20:
          updatedTask = _context6.sent;
          return _context6.abrupt("return", res.status(201).json({
            status: "success",
            message: "Task status updated",
            data: updatedTask
          }));
        case 24:
          _context6.prev = 24;
          _context6.t0 = _context6["catch"](0);
          return _context6.abrupt("return", res.status(500).json({
            status: "fail",
            error: _context6.t0
          }));
        case 27:
        case "end":
          return _context6.stop();
      }
    }, _callee6, null, [[0, 24]]);
  }));
  return function updateTaskStatus(_x11, _x12) {
    return _ref6.apply(this, arguments);
  };
}();
var updatetask = exports.updatetask = /*#__PURE__*/function () {
  var _ref7 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee7(req, res) {
    var _taskValidationSChema2, error, updatedtask;
    return _regenerator["default"].wrap(function _callee7$(_context7) {
      while (1) switch (_context7.prev = _context7.next) {
        case 0:
          _context7.prev = 0;
          _taskValidationSChema2 = _taskvalidation["default"].validate(req.body), error = _taskValidationSChema2.error;
          if (!error) {
            _context7.next = 4;
            break;
          }
          return _context7.abrupt("return", res.status(400).json({
            status: "fail",
            validationError: error.details[0].message
          }));
        case 4:
          _context7.next = 6;
          return _taskModel["default"].findByIdAndUpdate(req.params.id, {
            $set: {
              title: req.body.title,
              description: req.body.description
            }
          }, {
            "new": true
          });
        case 6:
          updatedtask = _context7.sent;
          if (updatedtask) {
            _context7.next = 9;
            break;
          }
          return _context7.abrupt("return", res.status(200).json({
            status: "fail",
            message: "task not found"
          }));
        case 9:
          res.status(200).json({
            status: "success",
            successMessage: "task updated successfully!",
            data: updatedtask
          });
          _context7.next = 15;
          break;
        case 12:
          _context7.prev = 12;
          _context7.t0 = _context7["catch"](0);
          res.status(500).json({
            status: "fail",
            error: _context7.t0.message
          });
        case 15:
        case "end":
          return _context7.stop();
      }
    }, _callee7, null, [[0, 12]]);
  }));
  return function updatetask(_x13, _x14) {
    return _ref7.apply(this, arguments);
  };
}();