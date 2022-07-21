"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const computer_controller_1 = require("./controllers/computer.controller");
const router = (app) => {
    app.post("/computers", computer_controller_1.createComputer);
    app.get("/computers/:id", computer_controller_1.retrieveComputer);
    app.put("/computers/:id", computer_controller_1.updateComputer);
    app.delete("/computers/:id", computer_controller_1.deleteComputer);
    app.get("/computers", computer_controller_1.listComputers);
};
exports.router = router;
