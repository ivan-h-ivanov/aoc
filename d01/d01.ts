async function readLines(): Promise<string[]> {
    const path = "input"; // Deno.args[0];
    return (await Deno.readTextFile(path).then(text => text.split("\n"))).filter(s => s !== "");
}

if (import.meta.main) {
    const lines = await readLines();
    const result = lines.map(ln => times(ln, 0, -1, -1)).reduce((pv, cv) => pv + cv, 0);
    console.log(result);
}

function times(arr: string, i: number, left: number, right: number): number {
    if (i >= arr.length) {
        if (left < 0 || right < 0) {
            const val = Math.max(left, right);
            return Number(`${val}${val}`);
        }
    }
    if (left > -1 && right > -1) {
        return Number(`${left}${right}`);
    }
    else {
        if (left < 0) {
            const newLeft = Number(arr[i]);
            left = isNaN(newLeft) ? left : newLeft;
        }
        if (right < 0) {
            const newRight = Number(arr[arr.length - 1 - i]);
            right = isNaN(newRight) ? right : newRight;
        }
        return times(arr, ++i, left, right)
    }
}