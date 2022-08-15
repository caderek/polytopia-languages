const fs = require("fs");
const path = require("path");

const OUT_DIR = path.join("dist", "translations");

if (!fs.existsSync(OUT_DIR)) {
  fs.mkdirSync(OUT_DIR, { recursive: true });
}

const lang = process.argv[2];

const langs = lang
  ? [lang]
  : fs.readdirSync("translations").map((x) => x.split(".")[0]);

const isEmpty = (translation) =>
  typeof translation !== "string" || translation.trim() === "";

for (const lang of langs) {
  const translation = require(`../translations/${lang}.json`);

  const entries = Object.entries(translation.text).map(([key, data]) => {
    const val = isEmpty(data["->"]) ? data.en : data["->"];

    return [key, val];
  });

  const raw = {
    language: translation.language ?? "",
    author: translation.author ?? "",
    editors: translation.editors ?? "",
    ...Object.fromEntries(entries),
  };

  fs.writeFileSync(
    path.join(OUT_DIR, `${lang}.json`),
    JSON.stringify(raw, null, 2)
  );
}
