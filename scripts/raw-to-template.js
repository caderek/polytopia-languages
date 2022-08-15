const fs = require("fs");
const original = require("../original.json");

const source = process.argv[2];
const destination = process.argv[3];

if (source === undefined) {
  console.log("Provide raw translation file as a first argument.");
}

if (destination === undefined) {
  console.log(
    "Provide destination path for template file as a second argument."
  );
}

if (source === undefined || destination === undefined) {
  process.exit(1);
}

const data =
  source && fs.existsSync(source)
    ? JSON.parse(fs.readFileSync(source, { encoding: "utf8" }))
    : {};

const isEmpty = (translation) =>
  typeof translation !== "string" || translation.trim() === "";

const text = Object.fromEntries(
  Object.entries(original)
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([key, val]) => {
      const translation =
        !isEmpty(data[key]) && data[key] !== val ? data[key] : "";
      return [key, { en: val, "->": translation }];
    })
);

const all = {
  language: data.language ?? "",
  author: data.author ?? "",
  editors: data.editors ?? "",
  text,
};

fs.writeFileSync(destination, JSON.stringify(all, null, 2));
