import { readLines } from "../utils.ts";

if (import.meta.main) {
    const lines = await readLines("d01/input");
    const result = lines.map(ln => getNumbers(ln, 0, -1, -1)).reduce((pv, cv) => pv + cv, 0);
    console.log(result);
}

function matchRight(line: string, pos: number): number {
    const digit = Number(line[pos]);
    if (!isNaN(digit))
        return digit;

    switch (line[pos]) {
        case "x": return line.substring(pos - 2, pos + 1) === "six" ? 6 : Number.NaN;
        case "o": return line.substring(pos - 2, pos + 1) === "two" ? 2 : Number.NaN;
        case "r": return line.substring(pos - 3, pos + 1) === "four" ? 4 : Number.NaN;
        case "n": return line.substring(pos - 4, pos + 1) === "seven" ? 7 : Number.NaN;
        case "t": return line.substring(pos - 4, pos + 1) === "eight" ? 8 : Number.NaN;
        case "e": {
            if (line.substring(pos - 2, pos + 1) === "one") return 1;
            else if (line.substring(pos - 4, pos + 1) === "three") return 3;
            else if (line.substring(pos - 3, pos + 1) === "five") return 5;
            else if (line.substring(pos - 3, pos + 1) === "nine") return 9;
            else return Number.NaN;
        }
        default: return Number.NaN;
    }
}

function matchLeft(line: string, pos: number): number {
    const digit = Number(line[pos]);
    if (!isNaN(digit))
        return digit;

    switch (line[pos]) {
        case "o": return line.substring(pos, pos + 3) === "one" ? 1 : Number.NaN;
        case "e": return line.substring(pos, pos + 5) === "eight" ? 8 : Number.NaN;
        case "n": return line.substring(pos, pos + 4) === "nine" ? 9 : Number.NaN;
        case "t": {
            if (line.substring(pos, pos + 3) === "two") return 2;
            else if (line.substring(pos, pos + 5) == "three") return 3;
            else return Number.NaN;
        }
        case "f": {
            if (line.substring(pos, pos + 4) === "four") return 4;
            else if (line.substring(pos, pos + 4) === "five") return 5;
            else return Number.NaN;
        }
        case "s": {
            if (line.substring(pos, pos + 3) === "six") return 6;
            else if (line.substring(pos, pos + 5) === "seven") return 7;
            else return Number.NaN;
        }
        default: return Number.NaN;
    }
}

function getNumbers(line: string, i: number, left: number, right: number): number {
    if (i >= line.length) {
        if (left < 0 || right < 0) {
            const val = Math.max(left, right);
            return Number(`${val}${val}`);
        }
    }
    if (left > -1 && right > -1) {
        return Number(`${left}${right}`);
    }
    else {
        if (left < 0) {
            const newLeft = matchLeft(line, i);
            left = isNaN(newLeft) ? left : newLeft;
        }
        if (right < 0) {
            const newRight = matchRight(line, line.length - 1 - i);
            right = isNaN(newRight) ? right : newRight;
        }
        return getNumbers(line, ++i, left, right)
    }
}