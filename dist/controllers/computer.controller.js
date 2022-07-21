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
exports.listComputers = exports.deleteComputer = exports.updateComputer = exports.retrieveComputer = exports.createComputer = void 0;
const computer_model_1 = require("../models/computer.model");
const createComputer = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { procesador, pantalla, ram, rom, año_lanzamiento } = req.body;
    const response = yield new PlayerController().create({ procesador, pantalla, ram, rom, año_lanzamiento });
    return res.status(response.status).json(response);
});
exports.createComputer = createComputer;
const retrieveComputer = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const docId = req.params.id;
    const response = yield new PlayerController().retrieve(docId);
    return res.status(response.status).json(response);
});
exports.retrieveComputer = retrieveComputer;
const updateComputer = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { procesador, pantalla, ram, rom, año_lanzamiento } = req.body;
    const docId = req.params.id;
    const response = yield new PlayerController().update(docId, { procesador, pantalla, ram, rom, año_lanzamiento });
    return res.status(response.status).json(response);
});
exports.updateComputer = updateComputer;
const deleteComputer = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const docId = req.params.id;
    const response = yield new PlayerController().delete(docId);
    return res.status(response.status).json(response);
});
exports.deleteComputer = deleteComputer;
const listComputers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield new PlayerController().list();
    return res.status(200).json(response);
});
exports.listComputers = listComputers;
class PlayerController {
    create(payload) {
        return __awaiter(this, void 0, void 0, function* () {
            const computer = new computer_model_1.Computer(payload);
            return computer.save().then(data => {
                return {
                    message: "CREATED: Computer added to database",
                    status: 201,
                    content: data
                };
            }).catch(err => {
                return {
                    message: "Error on create Computer",
                    status: 500,
                    content: err
                };
            });
        });
    }
    retrieve(docId) {
        return __awaiter(this, void 0, void 0, function* () {
            return computer_model_1.Computer.findOne({ _id: docId }).then(data => {
                if (data === null) {
                    return {
                        message: "NOT FOUND: Computer not found",
                        status: 404,
                        content: data
                    };
                }
                return {
                    message: "OK: Computer retrieve",
                    status: 200,
                    content: data
                };
            }).catch(err => {
                return {
                    message: "INTERNAL SERVER ERROR: " + err.ram,
                    status: 500,
                    content: err
                };
            });
        });
    }
    update(docId, payload) {
        return __awaiter(this, void 0, void 0, function* () {
            return computer_model_1.Computer.updateOne({ _id: docId }, { $set: {
                    procesador: payload.procesador,
                    pantalla: payload.pantalla,
                    ram: payload.ram,
                    rom: payload.rom,
                    año_lanzamiento: payload.año_lanzamiento
                } }).then(data => {
                return {
                    message: "OK: Computer updated",
                    status: 200,
                    content: data
                };
            }).catch(err => {
                return {
                    message: "INTERNAL SERVER ERROR: Computer not updated",
                    status: 500,
                    content: err
                };
            });
        });
    }
    delete(docId) {
        return __awaiter(this, void 0, void 0, function* () {
            return computer_model_1.Computer.deleteOne({ _id: docId }).then(data => {
                if (data.deletedCount == 0) {
                    return {
                        message: "NOT FOUND: Computer not found",
                        status: 404,
                        content: data
                    };
                }
                return {
                    message: "OK: Computer deleted",
                    status: 200,
                    content: data
                };
            }).catch(err => {
                return {
                    message: "INTERNAL SERVER ERROR: " + err.ram,
                    status: 500,
                    content: err
                };
            });
        });
    }
    list() {
        return __awaiter(this, void 0, void 0, function* () {
            return computer_model_1.Computer.find({}).then(data => {
                return {
                    message: "OK: All Computers retrieve",
                    status: 200,
                    content: data
                };
            }).catch(err => {
                return { message: "Error on retrieve Computers", status: 500, content: err };
            });
        });
    }
}
