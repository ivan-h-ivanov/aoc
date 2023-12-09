import { readLines } from "../utils.ts";

interface NodeDirections {
    L: string;
    R: string;
}

class Node {
    [id: string]: NodeDirections
}

const mR: RegExp = /(.+) = (\((.+), (.+)\)).*/;

if (import.meta.main) {
    const lines = await readLines("d08/input");
    const directions = lines[0].split("");
    const map: Node = new Node();
    const matches = lines
        .splice(2)
        .map(l => mR.exec(l) as RegExpExecArray)
        .forEach(m => map[m[1]] = ({ L: m[3], R: m[4] }) as NodeDirections);
    console.log(mapI(directions, map).reduce((pv, cv) => lcm(pv, cv), 1));
}

function lcm(n1: number, n2: number): number {
    return (n1 / gcf(n1, n2)) * n2;
}

function gcf(n1: number, n2: number): number {
    while (n2 != 0) {
        let temp = n2;
        n2 = n1 % n2;
        n1 = temp;
    }
    return n1;
}

function mapI(dir: string[], map: Node): number[] {
    let steps = 0;
    let aKeys = Object.keys(map).filter(k => k.endsWith("A"));
    let vals: number[] = [];
    while (true) {
        for (let i = 0; i < dir.length; i++) {
            if (vals.filter(v => v !== null).length == aKeys.length) {
                return vals;
            }
            for (let j = 0; j < aKeys.length; j++) {
                if (vals[j] > 0) {
                    continue;
                }
                aKeys[j] = map[aKeys[j]][dir[i]];
                if (aKeys[j].endsWith("Z")) {
                    vals[j] = steps * dir.length + i + 1;
                }
            }
        }
        steps++;
    }
}