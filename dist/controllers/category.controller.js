"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.listCategorys = exports.deleteCategory = exports.updateCategory = exports.retrieveCategory = exports.createCategory = void 0;
const categoria_model_1 = require("../models/categoria.model");
const createCategory = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { nombreCategoria } = req.body;
    const response = yield new CategoryController().create({ nombreCategoria });
    return res.status(response.status).json(response);
});
exports.createCategory = createCategory;
const retrieveCategory = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const docId = req.params.id;
    const response = yield new CategoryController().retrieve(docId);
    return res.status(response.status).json(response);
});
exports.retrieveCategory = retrieveCategory;
const updateCategory = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { nombreCategoria } = req.body;
    const docId = req.params.id;
    const response = yield new CategoryController().update(docId, { nombreCategoria });
    return res.status(response.status).json(response);
});
exports.updateCategory = updateCategory;
const deleteCategory = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const docId = req.params.id;
    const response = yield new CategoryController().delete(docId);
    return res.status(response.status).json(response);
});
exports.deleteCategory = deleteCategory;
const listCategorys = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield new CategoryController().list();
    return res.status(200).json(response);
});
exports.listCategorys = listCategorys;
class CategoryController {
    create(payload) {
        return __awaiter(this, void 0, void 0, function* () {
            const category = new categoria_model_1.Category(payload);
            return category.save().then(data => {
                return {
                    message: "CREATED: Player added to database",
                    status: 201,
                    content: data
                };
            }).catch(err => {
                return {
                    message: "Error on create Player",
                    status: 500,
                    content: err
                };
            });
        });
    }
    retrieve(docId) {
        return __awaiter(this, void 0, void 0, function* () {
            return categoria_model_1.Category.findOne({ _id: docId }).then(data => {
                if (data === null) {
                    return {
                        message: "NOT FOUND: Player not found",
                        status: 404,
                        content: data
                    };
                }
                return {
                    message: "OK: Player retrieve",
                    status: 200,
                    content: data
                };
            }).catch(err => {
                return {
                    message: "INTERNAL SERVER ERROR: " + err.direccion,
                    status: 500,
                    content: err
                };
            });
        });
    }
    update(docId, payload) {
        return __awaiter(this, void 0, void 0, function* () {
            return categoria_model_1.Category.updateOne({ _id: docId }, { $set: {
                    nombreCategoria: payload.nombreCategoria
                } }).then(data => {
                return {
                    message: "OK: Player updated",
                    status: 200,
                    content: data
                };
            }).catch(err => {
                return {
                    message: "INTERNAL SERVER ERROR: Player not updated",
                    status: 500,
                    content: err
                };
            });
        });
    }
    delete(docId) {
        return __awaiter(this, void 0, void 0, function* () {
            return categoria_model_1.Category.deleteOne({ _id: docId }).then(data => {
                if (data.deletedCount == 0) {
                    return {
                        message: "NOT FOUND: Player not found",
                        status: 404,
                        content: data
                    };
                }
                return {
                    message: "OK: Player deleted",
                    status: 200,
                    content: data
                };
            }).catch(err => {
                return {
                    message: "INTERNAL SERVER ERROR: " + err.direccion,
                    status: 500,
                    content: err
                };
            });
        });
    }
    list() {
        return __awaiter(this, void 0, void 0, function* () {
            return categoria_model_1.Category.find({}).then(data => {
                return {
                    message: "OK: All players retrieve",
                    status: 200,
                    content: data
                };
            }).catch(err => {
                return { message: "Error on retrieve Players", status: 500, content: err };
            });
        });
    }
}
