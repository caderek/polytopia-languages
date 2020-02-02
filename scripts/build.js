const fs = require("fs")
const render = require("./render")

const data = fs.readdirSync("translations").map((file) => {
  const [shortLang] = file.split(".")
  const language = JSON.parse(
    fs.readFileSync(`translations/${file}`).toString(),
  ).language

  return { shortLang, language, file }
})

const createRedirects = (data) => {
  const content = data
    .map(({ shortLang, file }) => `/${shortLang} /translations/${file}`)
    .join("\n")

  fs.writeFileSync("_redirects", content)
}

createRedirects(data)
render(data)
