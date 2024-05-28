import bodyParser from "body-parser";
import cors from "cors";
import express, { Express } from "express";
import AppFunction from "../../types/app";

interface ServerReturn {
  setRoutes: (routes: ((app: Express) => void)[]) => ServerReturn;
  run: (port: number, callback?: () => void) => void;
}

function server(): AppFunction<ServerReturn> {
  let booted: boolean = false;
  let server: Express | undefined = undefined;
  let routes: ((app: Express) => void)[] = [];

  function boot() {
    if (booted) return;
    server = express();
  }

  function setRoutes(routesFn: ((app: Express) => void)[]) {
    routes = routes.concat(routesFn);

    return {
      setRoutes,
      run,
    };
  }

  function run(port: number, callback: () => void = () => {}) {
    server!.use(cors());
    server!.use(bodyParser.urlencoded({ extended: true }));
    server!.use(bodyParser.json());

    routes.forEach((item) => {
      item(server!);
    });

    server!.listen(port, callback);
  }

  return {
    boot,
    value: () => ({
      setRoutes,
      run,
    }),
  };
}

export default server();
