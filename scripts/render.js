const fs = require("fs");
const form = require("./form");
const html = String.raw;

const render = (data) => {
  const ISODate = new Date().toISOString();
  const date = `${ISODate.slice(0, 10)} ${ISODate.slice(11, 16)}`;

  const content = html`
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="stylesheet" href="style.css" />
        <title>The Battle of Polytopia translations</title>
      </head>
      <body>
        <img src="assets/logo.png" alt="log" class="logo" />
        <h2>USER-MADE</h2>
        <h1>TRANSLATIONS</h1>
        <div class="flags">
          ${data
            .map(({ shortLang, language }) => {
              const src =
                shortLang === "eo"
                  ? "/assets/flags/eo.svg"
                  : `https://purecatamphetamine.github.io/country-flag-icons/3x2/${shortLang.toUpperCase()}.svg`;

              return `<a href="#${shortLang}"><img src="${src}" title="${language}"></a>`;
            })
            .join("\n")}
        </div>
        <ul id="translations">
          ${data
            .map(
              ({ language, shortLang, author, editors, file, completed }) =>
                `<li id="${shortLang}"><h3>${shortLang.toUpperCase()} (${language}) <span class="author">by ${
                  author !== undefined ? author : "Anonymous"
                }</span>${
                  editors
                    ? `<span class="author">, edited by ${editors}</span>`
                    : ""
                }</h3>
            <h4>Links (click to copy):</h4>
            <pre class="code">https://polytopia.netlify.app/translations/${file}</pre>
            <pre class="code">https://raw.githubusercontent.com/caderek/polytopia-languages/master/translations/${file}</pre>
            <p class="completed">${completed}% complete</p>
            <a class="preview" href="https://polytopia.netlify.com/${shortLang}">PREVIEW</a>
          </li>`
            )
            .join("\n")}
        </ul>
        <footer>
          <p class="question">
            Want to add a new translation or improve an existing one?
          </p>
          <p>
            Grab the
            <a
              href="https://raw.githubusercontent.com/caderek/polytopia-languages/master/template.json"
              target="_blank"
              >empty template file</a
            >
            or
            <a
              href="https://github.com/caderek/polytopia-languages/tree/master/templates"
              target="_blank"
              >one of the existing templates</a
            >, and make a pull request on
            <a
              href="https://github.com/caderek/polytopia-languages/new/master/templates"
              target="_blank"
              >Github</a
            >
            or ping me on
            <a href="https://www.reddit.com/user/kap89" target="_blank"
              >Reddit</a
            >.
          </p>
          <p>
            Instructions how to use the template:
            <a
              href="https://github.com/caderek/polytopia-languages#structure-of-the-template-file"
              target="_blank"
              >Structure of the template file</a
            >
          </p>
          <p>
            You can also submit your translation via the form below (it will
            appear on the website when verified):
          </p>
          ${form()}
          <p class="copyright">
            Created by Maciej Cąderek | Last update: ${date} UTC
          </p>
        </footer>

        <div id="copied" class="copied hidden">COPIED!</div>
        <script src="script.js"></script>
      </body>
    </html>
  `;

  fs.writeFileSync("index.html", content);
};

module.exports = render;
