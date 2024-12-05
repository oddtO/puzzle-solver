import { dataReceiverService } from "./data-receiver";

type ParsedData = Awaited<ReturnType<(typeof dataReceiverService)["init"]>>;
class SolverService {
  sequences: string[][] = [];
  async start(dataPath: string) {
    const result = await dataReceiverService.init(dataPath);
    this.findSequences(result);
    this.printBiggestSequence();
  }

  findSequences(parsedData: ParsedData) {
    for (const number of parsedData.output) {
      const sequence = this.findNumberSequence(number, parsedData);
      this.sequences.push(sequence);
    }
    sortSequences(this.sequences);

    function sortSequences(sequences: string[][]) {
      sequences.sort((a, b) => a.length - b.length);
    }
  }

  printBiggestSequence() {
    const biggestSequence = this.sequences[this.sequences.length - 1];

    if (biggestSequence.length <= 1) {
      console.log("No sequence found");
      return;
    }

    let result = "";

    biggestSequence.forEach((number, i) => {
      if (isLastElement(number, i)) {
        result += number;
      } else {
        result += removeLastTwoDigits(number);
      }

      function isLastElement(number: string, i: number) {
        return i === biggestSequence.length - 1;
      }
    });

    console.log("Biggest sequence:", result);
    function removeLastTwoDigits(number: string) {
      return number.slice(0, -2);
    }
  }
  findNumberSequence(number: string, parsedData: ParsedData): string[] {
    const result = [number] as string[];
    const lastTwoDigits = dataReceiverService.getLastTwoDigits(number);
    let nextNum = parsedData.mapFirstTwoDigitsToNumber.get(lastTwoDigits);

    if (!nextNum) {
      return result;
    }

    result.push(nextNum);

    while (nextNum) {
      const prevNum = nextNum;

      nextNum = parsedData.mapFirstTwoDigitsToNumber.get(
        dataReceiverService.getLastTwoDigits(nextNum),
      );
      if (!nextNum) {
        break;
      }
      result.push(nextNum);
    }
    return result;
  }
}

export const solverService = new SolverService();
