import { readLines } from "../utils.ts";

class PipeType {
    [id: string]: string[]
}

interface crd {
    X: number;
    Y: number;
}

if (import.meta.main) {
    const lines = await readLines("d10/input");
    const map = lines.map(ln => ln.split(""));
    const pT = initPipes();
    const start: crd = {};
    for (let i = 0; i < map.length; i++)
        for (let j = 0; j < map[i].length; j++)
            if (map[i][j] === "S") {
                start.X = j; start.Y = i;
            }
    const res = traverse(pT, map, start, [], []);
    console.log(res.length);
}

function traverse(pt: PipeType, map: string[][], head: crd, visited: string[], traverseStack: crd[]): crd[] {
    visited.push(`${head.Y},${head.X}`)
    const children = getChildren(pt, map, head).filter(ch => visited.indexOf(`${ch.Y},${ch.X}`) === -1);
    for (let i = 0; i < children.length; i++) {
        return traverse(pt, map, children[i], [...visited, `${children[i].Y},${children[i].X}`], [...traverseStack, children[i]]);
    }
    return traverseStack;
}

function getChildren(pt: PipeType, map: string[][], head: crd): crd[] {
    const availableDirs = pt[map[head.Y][head.X]];
    const res: crd[] = [];
    if (availableDirs.indexOf("N") !== -1) {
        const nC: crd = { Y: head.Y - 1, X: head.X };
        if (pt[map[nC.Y][nC.X]].indexOf("S") !== -1) {
            res.push(nC);
        }
    }
    if (availableDirs.indexOf("S") !== -1) {
        const sC: crd = { Y: head.Y + 1, X: head.X };
        if (pt[map[sC.Y][sC.X]].indexOf("N") !== -1) {
            res.push(sC);
        }
    }
    if (availableDirs.indexOf("E") !== -1) {
        const eC: crd = { Y: head.Y, X: head.X + 1 };
        if (pt[map[eC.Y][eC.X]].indexOf("W") !== -1) {
            res.push(eC);
        }
    }
    if (availableDirs.indexOf("W") !== -1) {
        const wC: crd = { Y: head.Y, X: head.X - 1 };
        if (pt[map[wC.Y][wC.X]].indexOf("E") !== -1) {
            res.push(wC);
        }
    }
    return res;
}

function initPipes(): PipeType {
    const pt: PipeType = {};
    pt["|"] = ["N", "S"];
    pt["-"] = ["E", "W"];
    pt["F"] = ["E", "S"];
    pt["J"] = ["N", "W"];
    pt["L"] = ["N", "E"];
    pt["7"] = ["W", "S"];
    pt["S"] = ["E", "N", "W", "S"];
    pt["."] = [];
    return pt;
}