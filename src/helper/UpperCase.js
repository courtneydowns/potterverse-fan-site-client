const wordsToExclude = ["of", "the", "to"];

const upperCaseWord = (word) =>
  word ? word[0].toUpperCase() + word.slice(1) : word;

const upperCase = (str) =>
  !str
    ? str
    : str
        .trim()
        .toLowerCase()
        .split(" ")
        .map((word) => {
          if (word.includes("-"))
            word = word
              .split("-")
              .map((word) => upperCaseWord(word))
              .join("-");
          if (wordsToExclude.includes(word)) return word;
          return upperCaseWord(word);
        })
        .join(" ");

export default upperCase;
