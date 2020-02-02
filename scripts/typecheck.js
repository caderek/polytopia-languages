const fs = require("fs")
const polish = require("../translations/polish.json")

const textOnly = Object.values(polish).join("\n\n")

fs.writeFileSync("polish.txt", textOnly)
