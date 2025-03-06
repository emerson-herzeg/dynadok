"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// src/main.ts
const server_1 = require("./infrastructure/server/server");
const server = new server_1.Server();
server.start();
