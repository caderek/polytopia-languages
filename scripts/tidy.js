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
  "tribes.nature",
  "gameservice.android",
  "gameservice.ios",
  "gameservice.steam",
  "mplayerstats.elo",
  "endscreen.destroyed.info",
]);

const lang = process.argv[2];
const mode = process.argv[3] ?? "short";

const original = require("../original.json");
const stats = require("../stats.json");

const langs = lang
  ? [lang]
  : fs.readdirSync("templates").map((x) => x.split(".")[0]);

const isEmpty = (translation) =>
  typeof translation !== "string" || translation.trim() === "";

for (const lang of langs) {
  const translation = require(`../templates/${lang}.json`);

  const originalKeys = Object.keys(original)
    .filter((x) => !["language", "author", "editors"].includes(x))
    .sort();

  const sorted = {
    language: translation.language || "",
    author: translation.author || "",
    editors: translation.editors || "",
    text: {},
  };

  const missingKeys = [];

  for (const key of originalKeys) {
    const hasKey = translation.text[key] !== undefined;
    const entry = hasKey ? translation.text[key]["->"] : "";
    const empty = isEmpty(entry);

    if (!hasKey || (empty && !FIXED_KEYS.has(key))) {
      if (!FIXED_KEYS.has(key)) {
        missingKeys.push(key);
      }

      sorted.text[key] = {
        en: original[key],
        "->": empty ? "" : entry,
      };
    } else {
      sorted.text[key] = {
        en: original[key],
        "->": empty ? original[key] : entry,
      };
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
  console.log(`Completed: ${completed}% (${missingKeys.length} missing)`);

  if (mode === "verbose" && missingKeys.length > 0 && langs.length === 1) {
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

  fs.writeFileSync(`templates/${lang}.json`, JSON.stringify(sorted, null, 2));
}

fs.writeFileSync("stats.json", JSON.stringify(stats, null, 2));
