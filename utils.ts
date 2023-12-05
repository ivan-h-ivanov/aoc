export async function readLines(path: string): Promise<string[]> {
    return (await Deno.readTextFile(path).then(text => text.split("\r\n")));
}
