import express from 'express';
import { PORT } from './config';
import { connectToMongodb } from "./database";
import { router } from './router';
import swaggerUi from 'swagger-ui-express';
import swaggerDocument from './swagger.json';
import cors from 'cors';


const main = async () => {
    await connectToMongodb();
    const server = express();
    server.use(express.json());
    server.use(cors());
    server.use(express.urlencoded({ extended: false }));
    server.use('/swagger', swaggerUi.serve, swaggerUi.setup(swaggerDocument));  
    router(server);

    //Start server
    server.listen(PORT, () => {
        console.log('The application is listening on port ' + PORT);
    });
}

main();
