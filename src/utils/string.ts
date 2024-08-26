export const titleCase = (word: string) => {
    return word.replace("_", " ").toLowerCase().replace(/\b\w/g, char => char.toUpperCase());
}