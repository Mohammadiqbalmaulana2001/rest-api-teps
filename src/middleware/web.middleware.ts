import express, { Application } from "express";

import appMidleware from "./index.middleware";

const web:Application = express();

web.use(appMidleware)

export default web