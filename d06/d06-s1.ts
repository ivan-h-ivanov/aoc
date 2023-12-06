import { readLines } from "../utils.ts";
import { solve } from "./d06.ts";

if (import.meta.main) {
    const lines = await readLines("d06/input");
    const res = lines.map(ln => ln.split(/:\s+/)[1].split(/\s+/).flatMap(l => Number(l)));
    let acc = 1;
    for (let i = 0; i < res[0].length; i ++){
        acc *= solve(res[0][i], res[1][i]);
    }
    console.log(acc);
}
