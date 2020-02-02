const fs = require("fs")

const render = (data) => {
  const content = `
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>The Battle od Polytopia translations</title>
  </head>
  <body>
    <h2>Translations:</h2>
    <ul>${data
      .map(
        ({ language, shortLang, file }) =>
          `<li>${language} ->
            <code>https://polytopia.netlify.com/${shortLang}</code>
            or
            <code>https://polytopia.netlify.com/translations/${file}</code>
            or
            <code>https://raw.githubusercontent.com/caderek/polytopia-languages/master/translations/${file}</code>
          </li>`,
      )
      .join("\n")}</ul>
  </body>
</html>
`

  fs.writeFileSync("index.html", content)
}

module.exports = render
