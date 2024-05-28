import pino, { Logger } from "pino";
import AppFunction from "../../types/app";

function logger(): AppFunction<Logger> {
  let booted: boolean = false;
  const isProd = process.env.NODE_ENV === "production";
  let logger: Logger | undefined = undefined;

  const boot = () => {
    if (booted) return;

    booted = true;
    logger = pino({
      level: isProd ? "info" : "debug",
      transport: isProd
        ? undefined
        : {
            target: "pino-pretty",
          },
    });
  };

  return {
    boot,
    value: () => logger!,
  };
}

export default logger();
