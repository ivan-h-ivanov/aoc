import { readLines } from "../utils.ts";

if (import.meta.main) {
    const lines = await readLines("d03/input");
    const gears: number[] = [];
    for (let i = 0; i < lines.length; i++) {
        for (let j = 0; j < lines[i].length; j++) {
            if (lines[i][j] === "*") {
                console.log(gears.length);
                let nums: number[] = [];
                const top = getNumber(lines, j, i - 1);
                if (isNaN(top)) {
                    const leftTop = getNumber(lines, j - 1, i - 1);
                    const rightTop = getNumber(lines, j + 1, i - 1);
                    nums = [...nums, leftTop, rightTop];
                }
                else {
                    nums.push(top);
                }
                const bottom = getNumber(lines, j, i + 1);
                if (isNaN(bottom)) {
                    const leftBottom = getNumber(lines, j - 1, i + 1);
                    const rightBottom = getNumber(lines, j + 1, i + 1);
                    nums = [...nums, leftBottom, rightBottom];
                }
                else {
                    nums.push(bottom);
                }
                const left = getNumber(lines, j - 1, i);
                const right = getNumber(lines, j + 1, i);
                nums = [...nums, left, right];
                nums = nums.filter(n => !isNaN(n));

                if (nums.length == 2) {
                    gears.push(nums[0] * nums[1]);
                }
            }
        }
    }
    console.log(gears.reduce((pv, cv) => pv + cv, 0));
}

function getNumber(arr: string[], x: number, y: number): number {
    if (y < 0 || y >= arr.length || arr[y][x] < "0" || arr[y][x] > "9") return Number.NaN;
    let xl: number = x, xr: number = x;
    for (; ; xl--)
        if (arr[y][xl] < "0" || arr[y][xl] > "9" || xl < 0) {
            xl++;
            break;
        }
    for (; ; xr++)
        if (arr[y][xr] < "0" || arr[y][xr] > "9" || xr >= arr[y].length ) {
            xr--;
            break;
        }
    return Number(arr[y].substring(xl, xr + 1));
}


