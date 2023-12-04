import { readLines } from "../utils.ts";

if (import.meta.main) {
    const lines = await readLines("d03/input");
    const nums: number[] = [];
    let currentNumber = [];
    let valid = false;

    for (let i = 0; i < lines.length; i++) {
        for (let j = 0; j < lines[i].length; j++) {
            if (!isNaN(Number(lines[i][j]))) {
                currentNumber.push(lines[i][j]);
                if (!valid) {
                    valid = (i > 0 && isSymbol(lines[i - 1][j])) || (i < lines.length - 1 && isSymbol(lines[i + 1][j]))
                };
                if (!valid && currentNumber.length === 1) {
                    valid = isSymbol(lines[i][j - 1]) || (i > 0 && isSymbol(lines[i - 1][j - 1])) || (i < lines.length - 1 && isSymbol(lines[i + 1][j - 1]))
                }
            }
            else if (currentNumber.length > 0) {
                if (!valid) {
                    valid = isSymbol(lines[i][j]) || (i > 0 && isSymbol(lines[i - 1][j])) || (i < lines.length - 1 && isSymbol(lines[i + 1][j]))
                };
                if (valid)
                    nums.push(Number(currentNumber.join("")));
                currentNumber = [];
                valid = false;
            }
        }
        if (valid)
            nums.push(Number(currentNumber.join("")));
        currentNumber = [];
        valid = false;
    }
    console.log(nums.reduce((pv, cv) => pv + cv, 0));
}

function isSymbol(char: string) {
    return char !== undefined && (char < "0" || char > "9") && char !== ".";
}