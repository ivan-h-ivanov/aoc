import { readLines } from "../utils.ts";
import { getPath, crd } from "./d10-s1.ts";

if (import.meta.main) {
    const lines = await readLines("d10/input");
    const path: crd[] = getPath(lines, true);
    const pathPoints = new Set(path);
}

