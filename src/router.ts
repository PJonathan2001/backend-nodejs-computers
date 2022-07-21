import {Application} from 'express';
import { createComputer, deleteComputer, listComputers, retrieveComputer, updateComputer } from './controllers/computer.controller';
export const router = (app: Application) => {
    app.post("/computers", createComputer);    
    app.get("/computers/:id", retrieveComputer);
    app.put("/computers/:id", updateComputer);
    app.delete("/computers/:id", deleteComputer);    
    app.get("/computers", listComputers);



}