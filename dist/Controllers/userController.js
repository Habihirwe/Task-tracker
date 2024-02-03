"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getsingleUser = exports.getAllUsers = exports.createUser = exports.Login = void 0;
var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));
var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));
var _userModel = _interopRequireDefault(require("../Models/userModel.js"));
var _userValidation = _interopRequireDefault(require("../validation/userValidation.js"));
var _bcrypt = _interopRequireDefault(require("bcrypt"));
var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));
var createUser = exports.createUser = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, res) {
    var _userValidationSchema, error, duplicatedEmail, salt, hashedpassword, hashedrepeatpassword, user;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          _userValidationSchema = _userValidation["default"].validate(req.body), error = _userValidationSchema.error;
          if (!error) {
            _context.next = 3;
            break;
          }
          return _context.abrupt("return", res.status(400).json({
            "validationError": error.details[0].message
          }));
        case 3:
          _context.next = 5;
          return _userModel["default"].findOne({
            email: req.body.email
          });
        case 5:
          duplicatedEmail = _context.sent;
          if (!duplicatedEmail) {
            _context.next = 8;
            break;
          }
          return _context.abrupt("return", res.status(409).json({
            "message": "A user with email ".concat(req.body.email, " already exist!")
          }));
        case 8:
          _context.prev = 8;
          _context.next = 11;
          return _bcrypt["default"].genSalt(10);
        case 11:
          salt = _context.sent;
          _context.next = 14;
          return _bcrypt["default"].hash(req.body.password, salt);
        case 14:
          hashedpassword = _context.sent;
          _context.next = 17;
          return _bcrypt["default"].hash(req.body.repeatPassword, salt);
        case 17:
          hashedrepeatpassword = _context.sent;
          user = new _userModel["default"]({
            firstname: req.body.firstname,
            lastname: req.body.lastname,
            email: req.body.email,
            password: hashedpassword,
            repeatPassword: hashedrepeatpassword
          });
          _context.next = 21;
          return user.save();
        case 21:
          res.status(201).json({
            status: "success",
            "successMessage": "account created successfully",
            user: user
          });
          _context.next = 27;
          break;
        case 24:
          _context.prev = 24;
          _context.t0 = _context["catch"](8);
          res.status(500).json({
            status: "fail",
            error: _context.t0
          });
        case 27:
        case "end":
          return _context.stop();
      }
    }, _callee, null, [[8, 24]]);
  }));
  return function createUser(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();
var Login = exports.Login = /*#__PURE__*/function () {
  var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(req, res) {
    var user, isPasswordValid, token;
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) switch (_context2.prev = _context2.next) {
        case 0:
          _context2.prev = 0;
          _context2.next = 3;
          return _userModel["default"].findOne({
            email: req.body.email
          });
        case 3:
          user = _context2.sent;
          if (user) {
            _context2.next = 6;
            break;
          }
          return _context2.abrupt("return", res.status(400).json({
            status: "fail",
            "InvalidCredentials": "Invalid email or password"
          }));
        case 6:
          _context2.next = 8;
          return _bcrypt["default"].compare(req.body.password, user.password);
        case 8:
          isPasswordValid = _context2.sent;
          if (isPasswordValid) {
            _context2.next = 11;
            break;
          }
          return _context2.abrupt("return", res.status(400).json({
            status: "failed",
            "InvalidCredentials": "Invalid email or password"
          }));
        case 11:
          token = _jsonwebtoken["default"].sign({
            id: user._id
          }, process.env.JWT_SECRET, {
            expiresIn: "48h"
          });
          res.header("auth_token", token);
          return _context2.abrupt("return", res.status(201).json({
            status: "success",
            "successMessage": "LoggedIn successfully!",
            "token": token
          }));
        case 16:
          _context2.prev = 16;
          _context2.t0 = _context2["catch"](0);
          return _context2.abrupt("return", res.status(500).json(_context2.t0.message));
        case 19:
        case "end":
          return _context2.stop();
      }
    }, _callee2, null, [[0, 16]]);
  }));
  return function Login(_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}();
var getsingleUser = exports.getsingleUser = /*#__PURE__*/function () {
  var _ref3 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(req, res) {
    var singleUser;
    return _regenerator["default"].wrap(function _callee3$(_context3) {
      while (1) switch (_context3.prev = _context3.next) {
        case 0:
          _context3.prev = 0;
          _context3.next = 3;
          return _userModel["default"].findById(req.params.id);
        case 3:
          singleUser = _context3.sent;
          if (singleUser) {
            _context3.next = 6;
            break;
          }
          return _context3.abrupt("return", res.status(404).json({
            status: "fail",
            message: "user not found!!!"
          }));
        case 6:
          return _context3.abrupt("return", res.status(200).json({
            status: 'sucessss',
            data: singleUser
          }));
        case 9:
          _context3.prev = 9;
          _context3.t0 = _context3["catch"](0);
          return _context3.abrupt("return", res.status(500).json({
            error: _context3.t0
          }));
        case 12:
        case "end":
          return _context3.stop();
      }
    }, _callee3, null, [[0, 9]]);
  }));
  return function getsingleUser(_x5, _x6) {
    return _ref3.apply(this, arguments);
  };
}();
var getAllUsers = exports.getAllUsers = /*#__PURE__*/function () {
  var _ref4 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4(req, res) {
    var users;
    return _regenerator["default"].wrap(function _callee4$(_context4) {
      while (1) switch (_context4.prev = _context4.next) {
        case 0:
          _context4.prev = 0;
          _context4.next = 3;
          return _userModel["default"].find();
        case 3:
          users = _context4.sent;
          return _context4.abrupt("return", res.status(200).json({
            status: "success",
            "allusers": users
          }));
        case 7:
          _context4.prev = 7;
          _context4.t0 = _context4["catch"](0);
          return _context4.abrupt("return", res.status(500).json({
            status: "fail",
            error: _context4.t0.message
          }));
        case 10:
        case "end":
          return _context4.stop();
      }
    }, _callee4, null, [[0, 7]]);
  }));
  return function getAllUsers(_x7, _x8) {
    return _ref4.apply(this, arguments);
  };
}();