import { readLines } from "../utils.ts";

if (import.meta.main) {
    const lines = await readLines("d05/input");
    const maps: number[][][] = [];
    const seeds: number[] = lines[0].split(": ")[1].split(/\s+/).map(s => Number(s));

    let map: number[][] = [];
    for (let i = 1; i < lines.length; i++) {
        if (lines[i] === "") {
            i++;
            if (map.length > 0) {
                map.sort((a1, a2) => a1[1] - a2[1]);
                maps.push(map);
                map = [];
            }
            continue;
        }
        map.push(lines[i].split(/\s+/).map(s => Number(s)));
    }
    map.sort((a1, a2) => a1[1] - a2[1]);
    maps.push(map);
    const res = Math.min(...seeds.map(seed => searchMaps(maps, 0, seed)));
    console.log(res);
}

function searchMaps(maps: number[][][], index: number, value: number): number {
    if (maps.length == index)
        return value;
    const res = searchMap(maps[index], value, 0, maps[index].length - 1);
    return searchMaps(maps, ++index, res);
}

function searchMap(map: number[][], x: number, l: number, r: number) {    
    if (l > r)
        return x;
    const mid = l + Math.floor((r - l) / 2);
    if (map[mid][1] <= x && x <= map[mid][1] + map[mid][2])
        return x + map[mid][0] - map[mid][1];
    if (map[mid][1] > x)
        return searchMap(map, x, l, mid - 1);
    else
        return searchMap(map, x, mid + 1, r);
}