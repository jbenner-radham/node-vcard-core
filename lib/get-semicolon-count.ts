export default function getSemicolonCount(value: string): number {
    return [...value].reduce((accumulator, character) => {
        return (character === ';')
            ? accumulator + 1
            : accumulator;
    }, 0);
}
