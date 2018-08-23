import ENV from './environment';
import express from 'express';
import { ConfigRouter } from './config.router';
import bodyParser from 'body-parser';
import cors from 'cors';

function init() {
    console.log(`starting app on port ${ENV.port}`);

    const app: express.Application = express();
    const port: number = ENV.port || 3009;

    app.use(cors());

    app.use(bodyParser.raw());
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));

    app.use((req, res, next) => {
        const url: any = req.url;
        const method: any = req.method;
        const remoteAddress: string = req.connection.remoteAddress || '0.0.0.0';

        // validacion de permisos
        if(false) {
            res.status(401);
            res.send('Unauthorized');
            return;
        }

        next();
    });

    ConfigRouter.map(route => {
        app.use('/', route);
    });

    app.listen(port, () => {
        console.log(`sucessful start`);
    });
}

init();