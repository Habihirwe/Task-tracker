"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _cors = _interopRequireDefault(require("cors"));
var _dotenv = _interopRequireDefault(require("dotenv"));
var _express = _interopRequireDefault(require("express"));
var _bodyParser = _interopRequireDefault(require("body-parser"));
var _userRoute = _interopRequireDefault(require("./Routes/userRoute.js"));
var _taskRoute = _interopRequireDefault(require("./Routes/taskRoute.js"));
var _subtaskRouter = _interopRequireDefault(require("./Routes/subtaskRouter.js"));
var app = (0, _express["default"])();
app.use((0, _cors["default"])());
app.use(_bodyParser["default"].json({
  limit: "100mb"
}));
app.use(_bodyParser["default"].urlencoded({
  extended: false
}));
app.use(_express["default"].urlencoded({
  extended: true
}));
app.use(_express["default"].json({
  limit: "100mb",
  extended: true
}));
app.use(_express["default"].urlencoded({
  limit: "100mb",
  extended: true,
  parameterLimit: 50000
}));
_dotenv["default"].config();
app.use("/api", _userRoute["default"]);
app.use('/api', _taskRoute["default"]);
app.use('/api', _subtaskRouter["default"]);
var _default = exports["default"] = app;