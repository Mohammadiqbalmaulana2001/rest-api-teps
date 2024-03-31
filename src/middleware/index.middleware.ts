import express from "express";
import '../utils/winston'
import cors from "cors";
import app from "../routes";

const appMidleware = express();

appMidleware.use(
    cors({
        origin: true,
        credentials: true,
        preflightContinue: true,
        methods: 'GET,HEAD,PUT,PATCH,POST,DELETE'
    })
);

appMidleware.options('*', cors());
appMidleware.use(express.json());
appMidleware.use(app)

export default appMidleware