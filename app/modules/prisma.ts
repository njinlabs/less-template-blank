import { PrismaClient } from "@prisma/client";
import AppFunction from "../../types/app";

function prisma(): AppFunction<PrismaClient> {
  let booted: boolean = false;
  let prisma: PrismaClient | undefined;

  const boot = () => {
    if (booted) return;

    booted = true;
    prisma = new PrismaClient();
  };

  return {
    boot,
    value: () => prisma!,
  };
}

export default prisma();
