import fs from "fs/promises";
import path from "path";

import { dataReceiverService } from "./services/data-receiver";

const dataPath = process.argv[2] as string | undefined;

if (!dataPath) {
  console.error("Please provide a path to the data file");
  process.exit(1);
}

dataReceiverService.init(path.resolve(__dirname, dataPath));

console.log(dataPath);
