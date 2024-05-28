import { Express } from "express";

export default function welcome(app: Express) {
  app.get("/", (_, res) => {
    res.send("Hello world!");
  });
}
