"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Computer = void 0;
const mongoose_1 = require("mongoose");
//Schema
const computerSchema = new mongoose_1.Schema({
    procesador: { type: String },
    pantalla: { type: String },
    ram: { type: String },
    rom: { type: String },
    año_lanzamiento: { type: Date }
});
//Model
const Computer = (0, mongoose_1.model)('Player', computerSchema);
exports.Computer = Computer;
