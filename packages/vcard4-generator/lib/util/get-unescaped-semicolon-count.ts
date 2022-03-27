export default function getUnescapedSemicolonCount(value: string): number {
    const characters = [...value];

    return characters.reduce((accumulator, character, index) => {
        const previousCharacter = (index !== 0) ? characters[index - 1] : null;

        return (previousCharacter !== '\\' && character === ';') ? accumulator + 1 : accumulator;
    }, 0);
}
