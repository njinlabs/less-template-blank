import { logger, server } from "./app";
import { boot } from "./app/boot";
import routes from "./config/routes";
import "dotenv/config";

const port = Number(process.env.PORT) || 3333;

boot();
server()
  .setRoutes(routes)
  .run(port, () => {
    logger().info("Running on port " + port);
  });
