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
    <ul>${data.map(
      ({ language, shortLang }) =>
        `<li>${language} -> <code>https://polytopia.netlify.com/${shortLang}</code></li>`,
    )}</ul>
  </body>
</html>
`

  fs.writeFileSync("index.html", content)
}

module.exports = render
