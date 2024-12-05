import fs from "fs/promises";
import path from "path";
import { Node } from "../classes/node";
class DataReceiverService {
  async init(dataPath: string) {
    const input = await this.parseInput(dataPath);
    const mapFirstTwoDigitsToNumber = this.mapFirstTwoDigits(input);

    return { input, mapFirstTwoDigitsToNumber };
  }

  mapLastTwoDigits(data: readonly Node[]) {
    const result = this.mapData(data, this.getLastTwoDigits);
    return result;
  }
  mapFirstTwoDigits(data: readonly Node[]) {
    const result = this.mapData(data, this.getFirstTwoDigits);
    return result;
  }
  private mapData(data: readonly Node[], keySelector: (node: Node) => string) {
    const result = new Map<string, Node[]>();

    for (const item of data) {
      const key = keySelector(item);
      if (result.has(key)) {
        const value = result.get(key);
        value!.push(item);
      } else {
        result.set(key, [item]);
      }
    }

    return result;
  }
  getFirstTwoDigits = (node: Node) => {
    return node.value.slice(0, 2);
  };
  getLastTwoDigits = (node: Node) => {
    return node.value.slice(-2);
  };
  private async parseInput(dataPath: string) {
    const result = await fs.readFile(dataPath);

    const input = result.toString().split("\n");

    // remove empty string if it exists
    if (input.at(-1) === "") {
      input.pop();
    }

    const nodeArray: Node[] = [];
    for (const number of input) {
      nodeArray.push(new Node(number));
    }

    return nodeArray;
  }
}

export const dataReceiverService = new DataReceiverService();
