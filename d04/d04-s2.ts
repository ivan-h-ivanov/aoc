import { readLines } from "../utils.ts";

if (import.meta.main) {
    const lines = await readLines("d04/input");
    const sums: number[][] = [];
    const res: number[] = [];
    for (let i = 0; i < lines.length; i++) {
        const gm = lines[i].split(/:\s+/g)[1];
        const pair = gm.split(" | ");
        const left = new Set<number>(pair[0].split(/\s+/g).map(d => parseInt(d)));
        const right = pair[1].split(/\s+/g).map(d => parseInt(d));
        let s = 0;
        right.forEach(el => {
            if (left.has(el))
                s++;
        });
        sums[i] = Array.from(Array(s).keys(), k => k + i + 1);
    }
    for (let i = sums.length - 1; i >= 0; i--) {
        res[i] = getSum(sums, res, i);
    }
    console.log(res.reduce((pv, cv) => pv + cv, 0));
}

function getSum(arr: number[][], lookup: number[], i: number): number {
    if (arr[i].length === 0) return 1;
    return 1 + arr[i].map(s => lookup[s] ?? getSum(arr, lookup, s)).reduce((pv, cv) => pv + cv, 0);
}