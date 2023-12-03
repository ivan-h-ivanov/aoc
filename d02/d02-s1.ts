import { readLines } from "../utils.ts";

function getGame(input: string): number {
    const draws = input.split(/,\s|;\s|:\s/gm);
    for (let i = 0; i < draws.length; i++) {
        const pair = draws[i].split(" ");
        switch (pair[1]) {
            case "red": if (Number(pair[0]) > 12)
                return 0;
                break;
            case "green": if (Number(pair[0]) > 13)
                return 0;
                break;
            case "blue": if (Number(pair[0]) > 14)
                return 0;
        }
    }
    return Number(draws[0].split(" ")[1]);
};

if (import.meta.main) {
    const lines = await readLines("d02/input");
    const res = lines.map(ln => getGame(ln)).reduce((pv, cv) => pv + cv, 0);
    console.log(res);
}

