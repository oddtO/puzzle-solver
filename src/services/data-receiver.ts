import fs from "fs/promises";
import path from "path";
class DataReceiverService {
  async init(dataPath: string) {
    const output = await this.parseInput(dataPath);
    const mapFirstTwoDigitsToNumber = this.mapData(output);

    console.log(output);
    console.log(mapFirstTwoDigitsToNumber);
  }

  mapData(data: string[]) {
    const result = new Map();

    for (const item of data) {
      const key = this.getFirstTwoDigits(item);
      result.set(key, item);
    }

    return result;
  }
  getFirstTwoDigits(number: string) {
    return number.slice(0, 2);
  }
  getLastTwoDigits(number: string) {
    return number.slice(-2);
  }
  private async parseInput(dataPath: string) {
    const result = await fs.readFile(dataPath);

    const output = result.toString().split(/,\s|\n\n/);
    // pop empty string
    output.pop();

    return output;
  }
}

export const dataReceiverService = new DataReceiverService();
