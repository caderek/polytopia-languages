const fs = require("fs");
const render = require("./render");
const stats = require("../stats.json");

const data = fs.readdirSync("translations").map((file) => {
  const [shortLang] = file.split(".");
  const { language, author, editors } = JSON.parse(
    fs.readFileSync(`translations/${file}`).toString()
  );
  const completed = stats[shortLang].completedPercentage;

  return { shortLang, language, author, editors, file, completed };
});

const createRedirects = (data) => {
  const content = data
    .map(({ shortLang, file }) => `/${shortLang} /translations/${file}`)
    .join("\n");

  fs.writeFileSync("_redirects", content);
};

createRedirects(data);
render(data);
