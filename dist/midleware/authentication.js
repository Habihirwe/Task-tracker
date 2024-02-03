"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));
var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));
var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));
var authLogin = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(request, response, next) {
    var _request$headers;
    var token, decoded;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          token = request === null || request === void 0 || (_request$headers = request.headers) === null || _request$headers === void 0 || (_request$headers = _request$headers.authorization) === null || _request$headers === void 0 ? void 0 : _request$headers.split(' ')[1];
          if (token) {
            _context.next = 5;
            break;
          }
          return _context.abrupt("return", response.status(401).json({
            invalidToken: "Please Login to continue!"
          }));
        case 5:
          _context.prev = 5;
          decoded = _jsonwebtoken["default"].verify(token, process.env.JWT_SECRET);
          if (!decoded) {
            _context.next = 12;
            break;
          }
          console.log(decoded.data);
          request.user = decoded.data;
          _context.next = 13;
          break;
        case 12:
          return _context.abrupt("return", response.status(401).json({
            invalidToken: "Please Login to continue!"
          }));
        case 13:
          _context.next = 23;
          break;
        case 15:
          _context.prev = 15;
          _context.t0 = _context["catch"](5);
          if (!(_context.t0.expiredAt && _context.t0.expiredAt < new Date())) {
            _context.next = 21;
            break;
          }
          return _context.abrupt("return", response.status(401).json({
            invalidToken: "Your session has expired, please login again!"
          }));
        case 21:
          console.log(_context.t0);
          return _context.abrupt("return", response.status(401).json({
            invalidToken: "Please Login to continue!"
          }));
        case 23:
          next();
        case 24:
        case "end":
          return _context.stop();
      }
    }, _callee, null, [[5, 15]]);
  }));
  return function authLogin(_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
}();
var _default = exports["default"] = authLogin;