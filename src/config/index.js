import express from "express";
import cors from "cors";
import logger from "morgan";

export default (app) => {
  app.use(express.json());
  app.use(express.urlencoded(
    { extended: false },
  ));
  app.use(logger("dev"));
  app.use(cors("*"));
  return app;
};
