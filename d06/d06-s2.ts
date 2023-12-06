import { readLines } from "../utils.ts";
import { solve } from "./d06.ts";

if (import.meta.main) {
    const lines = await readLines("d06/input");
    const res = lines.map(ln => Number( ln.split(/:\s+/)[1].split(/\s+/).join("")));
    console.log(solve(res[0], res[1]));
}
