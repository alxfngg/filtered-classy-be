
// import * as bodyParser from "body-parser";
import express from "express";
import apiRouter from "./router/api_router";
import cors from 'cors';
import path from 'path';
import morgan from 'morgan';
import { connect, disconnect } from './db.config';

class App {

    public app: express.Application;

    constructor() {
        this.app = express();
        connect();
        this.middleware();
        this.routes();
    }

    // Configure Express middleware.
    private middleware(): void {
        this.app.use(express.urlencoded({ extended: true }));
        this.app.use(express.json()); // To parse the incoming requests with JSON payloads
        this.app.use(cors());
        this.app.use(morgan('dev'));
        // enable only if you want static assets from folder static
        // this.app.use(express.static('static'));
    }

    private routes(): void {
        this.app.use('/api', apiRouter);

        this.app.get("/", (req, res, next) => {
            res.send("Typescript App works!!");
        });

        // handle undefined routes
        this.app.use("*", (req, res, next) => {
            res.send("Make sure url is correct!!!");
        });
    }
}

export default new App().app;