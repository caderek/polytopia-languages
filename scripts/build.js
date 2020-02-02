const fs = require("fs")
const render = require("./render")

const data = fs.readdirSync("translations").map((file) => {
  const [shortLang] = file.split(".")
  const { language, author } = JSON.parse(
    fs.readFileSync(`translations/${file}`).toString(),
  )

  return { shortLang, language, author, file }
})

const createRedirects = (data) => {
  const content = data
    .map(({ shortLang, file }) => `/${shortLang} /translations/${file}`)
    .join("\n")

  fs.writeFileSync("_redirects", content)
}

createRedirects(data)
render(data)
