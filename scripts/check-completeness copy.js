const fs = require("fs");
const lang = process.argv[2];

const original = require("../original.json");
const translation = require(`../translations/${lang}.json`);

const originalKeys = Object.keys(original);
const translationKeys = new Set(Object.keys(translation));

const missingKeys = [];

for (const key of originalKeys) {
  if (translationKeys.has(key)) {
    continue;
  }

  missingKeys.push(key);
}

if (missingKeys.length === 0) {
  console.log(`Language ${lang.toUpperCase()} complete!`);
  process.exit();
}

console.log(
  `Language ${lang.toUpperCase()} incomplete, see: ./missing.temp.txt`
);

let missing = "";

for (const key of missingKeys) {
  missing += `"${key}": "${original[key]}",\n`;
}

fs.writeFileSync("missing.temp.txt", missing);
