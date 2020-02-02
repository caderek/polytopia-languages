const fs = require("fs")

const render = (data) => {
  const content = `
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <link rel="stylesheet" href="style.css" />
    <title>The Battle od Polytopia translations</title>
  </head>
  <body>
    <img src="assets/logo.png" alt="log" class="logo" />
    <h2>USER-MADE</h2>
    <h1>TRANSLATIONS</h1>
    <ul>${data
      .map(
        ({ language, shortLang, author, file }) =>
          `<li><h3><strong>${shortLang.toUpperCase()} (${language})</strong> by ${
            author !== undefined ? author : "Anonymous"
          }</h3>
            <pre>https://polytopia.netlify.com/${shortLang}</pre>
            <pre>https://polytopia.netlify.com/translations/${file}</pre>
            <pre>https://raw.githubusercontent.com/caderek/polytopia-languages/master/translations/${file}</pre>
            <a class="preview" href="https://raw.githubusercontent.com/caderek/polytopia-languages/master/translations/${file}">PREVIEW</a>
          </li>`,
      )
      .join("\n")}</ul>
  </body>
</html>
`

  fs.writeFileSync("index.html", content)
}

module.exports = render
