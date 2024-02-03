"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _mongoose = _interopRequireDefault(require("mongoose"));
var _app = _interopRequireDefault(require("./app.js"));
_mongoose["default"].connect(process.env.MONGODB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(function () {
  console.log('database connected');
})["catch"](function (err) {
  console.log(err);
});
var port = process.env.PORT || 5000;
_app["default"].listen(port, function () {
  console.log("The server  is listening on   : " + port);
});
var _default = exports["default"] = _app["default"];