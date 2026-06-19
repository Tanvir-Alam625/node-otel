import { trace } from "@opentelemetry/api";
import { rollTheDice } from "./dice";

import express, {type Express} from 'express'
import winston from 'winston';
const app: Express = express();
const port = 3030;
export const logger = winston.createLogger();

const tracer = trace.getTracer('dice-server', '1.0.0');


app.get('/rolldice', (req, res) => {
   const rolls = req.query.rolls ? parseInt(req.query.rolls as string) : NaN;
   if(isNaN(rolls)){
    logger.error(`[NODE-OTEL]: Invalid rolls query parameter: ${req.query.rolls}`);
    return res.status(400).send('Invalid rolls query parameter');   
}   
res.send(JSON.stringify(rollTheDice(rolls, 1, 6)));
});

app.listen(port, '0.0.0.0', () => {
    logger.info(`[NODE-OTEL]: Server is running on http://localhost:${port}`);
});
