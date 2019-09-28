import { Router } from "express";

export interface IInitializesRoutes {

    router : Router;
    initializeRoutes() : void;
}