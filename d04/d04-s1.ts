import { readLines } from "../utils.ts";

if (import.meta.main) {
    const lines = await readLines("d04/input");
    const res = lines.map(ln => ln.split(/:\s+/g)[1]).map(gm => {
        const pair = gm.split(" | ");
        const left = new Set<number>(pair[0].split(/\s+/g).map(d => parseInt(d)));
        const right = pair[1].split(/\s+/g).map(d => parseInt(d));
        let i = 0;
        right.forEach(el => {
            if (left.has(el))
                i++;
        });
        return i > 0 ? Math.pow(2, i - 1) : 0;
    }).reduce((pv, cv) => pv + cv, 0);
    console.log(res);
}