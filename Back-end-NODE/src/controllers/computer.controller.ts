import { Request, Response } from 'express';
import { IComputer, Computer } from '../models/computer.model';
import { IResponse } from '../models/response.model';


export const createComputer = async (req: Request, res: Response)=> {           
    const {numerador,procesador, pantalla, ram, rom,anio_lanzamiento}: IComputer = req.body;
    const response = await new ClienteController().create({ numerador,procesador, pantalla, ram, rom,anio_lanzamiento});         
    return res.status(response.status).json(response);   
}

export const retrieveComputer = async (req: Request, res: Response) => {
   const docId : String = req.params.id; 
   const response = await new ClienteController().retrieve(docId);         
   return res.status(response.status).json(response);   
}

export const updateComputer = async (req: Request, res: Response)=> {           
    const { numerador,procesador, pantalla, ram, rom, anio_lanzamiento} : IComputer = req.body;
    const docId : String = req.params.id; 
    const response = await new ClienteController().update(docId, { numerador, procesador, pantalla, ram, rom,anio_lanzamiento });         
    return res.status(response.status).json(response);   
}

export const deleteComputer = async (req: Request, res: Response) => {
    const docId : String = req.params.id; 
    const response = await new ClienteController().delete(docId);         
    return res.status(response.status).json(response);   
 }

export const listComputers = async (req: Request, res: Response) => {
    const response = await new ClienteController().list();         
    return res.status(200).json(response);    
}




class ClienteController {

    public async create(payload : IComputer) : Promise<IResponse> {
        const computer = new Computer(payload);
        return computer.save().then(data => {
            return {
                message: "CREATED: Computer added to database",
                status: 201,
                content : data
            }
        }).catch(err => {
            return {
                message: "Error on create Computer",
                status: 500,
                content : err
            }
        });        
    }

    public async retrieve(docId: String) : Promise<IResponse> {        
        return Computer.findOne({_id: docId}).then(data => {
            if(data === null) {
                return {
                    message: "NOT FOUND: Computer not found",
                    status: 404,
                    content : data
                };
            }
            return {
                message: "OK: Computer retrieve",
                status: 200,
                content : data
            };
        }).catch(err => {
            return {
                message: "INTERNAL SERVER ERROR: " + err.ram ,
                status: 500,
                content : err
            };
        });        
    }

    public async update(docId: String, payload : IComputer) : Promise<IResponse>{
        return Computer.updateOne({_id: docId} , { $set: { 
            numerador : payload.numerador,
            procesador: payload.procesador, 
            pantalla: payload.pantalla, 
            ram: payload.ram, 
            rom: payload.rom,
            anio_lanzamiento: payload.anio_lanzamiento
          } }).then(data => {            
            return {
                message: "OK: Computer updated",
                status: 200,
                content : data
            }
        }).catch(err => {
            return {
                message: "INTERNAL SERVER ERROR: Computer not updated",
                status: 500,
                content : err
            }
        });
    }
    



    public async delete(docId: String) : Promise<IResponse> {
        return Computer.deleteOne({_id: docId}).then(data => {
            if (data.deletedCount == 0) {
                return {
                    message: "NOT FOUND: Computer not found",
                    status: 404,
                    content : data
                };
            }
            return {
                message: "OK: Computer deleted",
                status: 200,
                content : data
            }
        }).catch(err => {
            return {
                message: "INTERNAL SERVER ERROR: " + err.ram,
                status: 500,
                content : err
            }
        });
    }

    public async list() : Promise<IResponse> {
        return await Computer.find({}).then(data => {
                return {
                    message: "OK: All Computers retrieve",
                    status: 200,
                    content : data
                };
            }).catch(err => {
                return { message: "Error on retrieve Computers", status: 500, content : err }
        });       
    }

}