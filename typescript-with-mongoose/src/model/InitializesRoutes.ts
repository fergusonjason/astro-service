import { Router } from "express";

export interface InitializesRoutes {

    router : Router;
    initializeRoutes() : void;
}