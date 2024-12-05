import { dataReceiverService } from "./data-receiver";
import { Node } from "../classes/node";
type ParsedData = Awaited<ReturnType<(typeof dataReceiverService)["init"]>>;
class SolverService {
  result!: ParsedData;
  depth: number = 0;
  currentSequence = new Set<Node>();
  fullyExploredNodes = new Set<Node>();
  depthRecord: number = 0;
  biggestSequence: Node[] = [];
  async start(dataPath: string) {
    const result = await dataReceiverService.init(dataPath);
    this.result = result;
    this.buildTree();
    this.findSequences();

    this.printBiggestSequence(this.biggestSequence);
  }

  buildTree() {
    for (const node of this.result.input) {
      const lastTwoDigits = dataReceiverService.getLastTwoDigits(node);

      const foundChildren =
        this.result.mapFirstTwoDigitsToNumber.get(lastTwoDigits);

      if (!foundChildren) {
        continue;
      }
      for (const child of foundChildren) {
        node.children.push(child);
      }
    }
  }

  findSequences() {
    for (const node of this.result.input) {
      if (this.fullyExploredNodes.has(node)) {
        continue;
      }
      this.traverseNodeRecursive(node);
    }
  }
  traverseNodeRecursive(node: Node) {
    if (this.currentSequence.has(node)) {
      return;
    }
    this.currentSequence.add(node);

    if (this.depth > this.depthRecord) {
      this.depthRecord = this.depth;
      this.biggestSequence = [...this.currentSequence.values()];
    }
    for (const child of node.children) {
      ++this.depth;
      this.traverseNodeRecursive(child);
      --this.depth;
    }
    this.fullyExploredNodes.add(node);
    this.currentSequence.delete(node);
  }

  printBiggestSequence(biggestSequence: Node[]) {
    if (biggestSequence.length <= 1) {
      console.log("No sequence found");
      return;
    }

    let result = "";

    biggestSequence.forEach((node, i) => {
      if (isLastElement(i)) {
        result += node.value;
      } else {
        result += removeLastTwoDigits(node.value);
      }

      function isLastElement(i: number) {
        return i === biggestSequence.length - 1;
      }
    });

    console.log("Biggest sequence:", result);
    function removeLastTwoDigits(number: string) {
      return number.slice(0, -2);
    }
  }
}

export const solverService = new SolverService();
