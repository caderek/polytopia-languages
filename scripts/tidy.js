const fs = require("fs");

const FIXED_KEYS = new Set([
  "tribes.aimo",
  "tribes.aquarion",
  "tribes.bardur",
  "tribes.cymanti",
  "tribes.elyrion",
  "tribes.hoodrick",
  "tribes.imperius",
  "tribes.kickoo",
  "tribes.luxidoor",
  "tribes.oumaji",
  "tribes.polaris",
  "tribes.quetzali",
  "tribes.vengir",
  "tribes.xinxi",
  "tribes.yadakk",
  "tribes.zebasi",
  "unit.names.icemaker",
  "unit.names.polytaur",
  "unit.names.seamonster",
  "unit.names.wendy",
  "endscreen.destroyed.info",
]);

const lang = process.argv[2];

const original = require("../original.json");
const stats = require("../stats.json");

const langs = lang
  ? [lang]
  : fs.readdirSync("translations").map((x) => x.split(".")[0]);

for (const lang of langs) {
  const translation = require(`../translations/${lang}.json`);

  const originalKeys = Object.keys(original)
    .filter((x) => !["language", "author", "editors"].includes(x))
    .sort();

  const sorted = {
    language: translation.language || "",
    author: translation.author || "",
    editors: translation.editors || "",
  };

  const missingKeys = [];

  for (const key of originalKeys) {
    if (
      translation[key] === undefined ||
      typeof translation[key] !== "string" ||
      translation[key].trim() === "" ||
      translation[key] === original[key]
    ) {
      if (!FIXED_KEYS.has(key)) {
        missingKeys.push(key);
      }

      sorted[key] = original[key];
    } else {
      sorted[key] = translation[key];
    }
  }

  const completed =
    missingKeys.length === 0
      ? 100
      : Math.min(
          Math.round(
            ((originalKeys.length - missingKeys.length) / originalKeys.length) *
              100
          ),
          99
        );

  console.log(`\nLanguage: ${lang.toUpperCase()} (${sorted.language})`);
  console.log(`Completed: ${completed}%`);

  if (missingKeys.length > 0 && langs.length === 1) {
    console.log("\nKeys to translate:\n");
    console.log(missingKeys.join("\n"));
  }

  stats[lang] = {
    language: sorted.language,
    completedPercentage: completed,
    completedSize: `${originalKeys.length - missingKeys.length}/${
      originalKeys.length
    }`,
    missingTranslations: missingKeys,
  };

  fs.writeFileSync(
    `translations/${lang}.json`,
    JSON.stringify(sorted, null, 2)
  );
}

fs.writeFileSync("stats.json", JSON.stringify(stats, null, 2));
