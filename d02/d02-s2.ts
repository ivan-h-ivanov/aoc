import { readLines } from "../utils.ts";

interface Game {
    red: number;
    blue: number;
    green: number;
}

function getGame(input: string): number {
    const game: Game = { red: 0, green: 0, blue: 0 };
    const draws = input.split(/,\s|;\s|:\s/gm);
    for (let i = 0; i < draws.length; i++) {
        const pair = draws[i].split(" ");
        switch (pair[1]) {
            case "red":
                game.red = Math.max(game.red, Number(pair[0]));
                break;
            case "green":
                game.green = Math.max(game.green, Number(pair[0]));
                break;
            case "blue":
                game.blue = Math.max(game.blue, Number(pair[0]));
                break;
        }
    }
    return game.red * game.blue * game.green;
};

if (import.meta.main) {
    const lines = await readLines("d02/input");
    const res = lines.map(ln => getGame(ln)).reduce((pv, cv) => pv + cv, 0);
    console.log(res);
}

