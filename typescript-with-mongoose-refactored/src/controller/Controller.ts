import { Router } from "express";

export interface IController {

    // router: Router;
    getRouter() : Router;

    getNaturalId() : string;
}