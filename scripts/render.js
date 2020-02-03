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
    <ul id="translations">${data
      .map(
        ({ language, shortLang, author, file }) =>
          `<li><h3>${shortLang.toUpperCase()} (${language}) <span class="author">by ${
            author !== undefined ? author : "Anonymous"
          }</span></h3>
            <h4>Links (click to copy):</h4>
            <pre class="code">https://polytopia.netlify.com/translations/${file}</pre>
            <pre class="code">https://raw.githubusercontent.com/caderek/polytopia-languages/master/translations/${file}</pre>
            <a class="preview" href="https://polytopia.netlify.com/${shortLang}">PREVIEW</a>
          </li>`,
      )
      .join("\n")}</ul>
      <footer>
        <p class="question">Want to add a new translation or improve an existing one?</p>
        <p>Grab an <a href="http://midjiwan.com/lang/en_US.json">original translation</a> and make a pull request on <a href="https://github.com/caderek/polytopia-languages">Github</a> or ping me on <a href="https://www.reddit.com/user/kap89">Reddit</a></p>
      </footer>
    <div id="copied" class="copied hidden">COPIED!</div>
    <script src="script.js"></script>
  </body>
</html>
`

  fs.writeFileSync("index.html", content)
}

module.exports = render
