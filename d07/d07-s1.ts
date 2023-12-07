import { readLines } from "../utils.ts";

const cards: string[] = ["2", "3", "4", "5", "6", "7", "8", "9", "T", "J", "Q", "K", "A"];
const patterns: string[] = ["11111", "2111", "221", "311", "32", "41", "5"];
const handMultiplier = getHandMultiplier(5);

if (import.meta.main) {
    const lines = await readLines("d07/input");
    const sorted = lines.sort((a, b) => getHandPower(a.split(/\s+/)[0]) - getHandPower(b.split(/\s+/)[0]));
    console.log(sorted.map((ln, i) => Number(ln.split(/\s+/)[1]) * (i + 1)).reduce((pv, cv) => pv + cv, 0));
}

function getHandMultiplier(handSize: number): number {
    let sum = 0;
    for (let i = 1; i <= handSize; i++) {
        sum += Math.pow(cards.length, i)
    }
    return sum;
}

function getHandPower(hand: string): number {
    const occurrences: number[] = Array.from(Array(13), _ => 0);
    let cardSum = 0;
    for (let i = 0; i < hand.length; i++) {
        const cardStr = cards.indexOf(hand[i]);
        occurrences[cardStr]++;
        cardSum += Math.pow(cards.length, hand.length - 1 - i) * cardStr;
    }
    return patterns.indexOf(occurrences.filter(v => v != 0).sort((a, b) => b - a).join("")) * handMultiplier + cardSum;
}