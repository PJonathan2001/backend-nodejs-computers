import { Schema, model } from 'mongoose';

//Interface
export interface IComputer {
    numerador: number | undefined;
    procesador:      null | string;
    pantalla:           null | string;
    ram:             null | string;
    rom:                null | string;
    anio_lanzamiento:     null | Date;

} 


//Schema
const computerSchema = new Schema<IComputer>({
    numerador: {type: Number, required: false},
    procesador : {type: String},
    pantalla : {type: String},
    ram : {type: String},
    rom : {type: String},
    anio_lanzamiento : {type: Date}
});

//Model
const Computer = model<IComputer>('Computer', computerSchema);

export {Computer}

