"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Category = void 0;
const mongoose_1 = require("mongoose");
//Schema
const categorySchema = new mongoose_1.Schema({
    nombreCategoria: { type: String }
});
//Model
const Category = (0, mongoose_1.model)('Category', categorySchema);
exports.Category = Category;
