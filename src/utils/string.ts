export const titleCase = (word: string) => {
  return word.replace("_", " ").toUpperCase().replace(/\b\w/g, char => char.toUpperCase());
};