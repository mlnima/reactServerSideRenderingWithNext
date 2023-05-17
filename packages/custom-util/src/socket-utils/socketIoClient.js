"use strict";
exports.__esModule = true;
var socket_io_client_1 = require("socket.io-client");
//@ts-ignore
var socket = (0, socket_io_client_1.io)(process.env.NEXT_PUBLIC_SOCKET_SERVER_URL);
exports["default"] = socket;
