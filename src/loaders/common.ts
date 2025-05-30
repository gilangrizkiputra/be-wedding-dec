import { Application, json } from "express";

export default (app: Application) => {
  app.use(json());
};
