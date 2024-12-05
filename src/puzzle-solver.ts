import fs from "fs/promises";
import path from "path";

import { dataReceiverService } from "./services/data-receiver";
import { solverService } from "./services/solver";
const dataPath = process.argv[2] as string | undefined;

if (!dataPath) {
  console.error("Please provide a path to the data file");
  process.exit(1);
}
async function solveAsync(dataPath: string) {
  solverService.start(path.resolve(__dirname, dataPath));
}

solveAsync(dataPath);
