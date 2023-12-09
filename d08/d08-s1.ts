import { readLines } from "../utils.ts";

interface NodeDirections {
    L: string;
    R: string;
}

class Node {
    [id: string]: NodeDirections
}

const mR : RegExp = /(.+) = (\((.+), (.+)\)).*/;

if (import.meta.main) {
    const lines = await readLines("d08/input"); 
    const directions = lines[0].split("");
    const map: Node = new Node();
    const matches = lines
        .splice(2)
        .map(l => mR.exec(l) as RegExpExecArray)
        .forEach(m => map[m[1]] = ({ L: m[3], R: m[4] }) as NodeDirections);
    console.log(mapI(directions, map));
}

function mapI(dir: string[], map: Node): number {
    let steps = 0;
    let key = "AAA";
    while (true) {
        for (let i = 0; i < dir.length; i++) {
            key = map[key][dir[i]];
            if (key == "ZZZ")
                return steps * dir.length + i + 1;
        }
        steps++;
    }
}