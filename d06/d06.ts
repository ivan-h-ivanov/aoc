export function solve(time: number, distance: number): number {
    const determinant = Math.sqrt(Math.pow(time, 2) - (4 * distance));
    const right = (time + determinant) / 2;
    const left = (time - determinant) / 2;
    return Math.floor(right) - Math.ceil(left) + 1;
}