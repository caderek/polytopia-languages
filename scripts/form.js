const { readFileSync } = require("fs")

const prepareCountries = () => {
  const content = readFileSync("assets/countries.txt")
    .toString()
    .split("\n")
    .filter((line) => line.trim() !== "")

  let isOdd = false
  const countries = []

  for (const line of content) {
    if (!isOdd) {
      countries.push({ short: line, full: null })
    } else {
      countries[countries.length - 1].full = line
    }

    isOdd = !isOdd
  }

  return countries
}

const form = () => {
  const countries = prepareCountries()

  return `
  <form id="add-translation" class="add-form" name="add-translation" netlify>
    <select id="country" name="aa-translation">
    <option value="" disabled selected>Select country (language flag)</option>
      ${countries
        .map(
          ({ short, full }) =>
            `<option value="${short}">${short} - ${full}</option>`,
        )
        .join("\n")}
    </select>
    <input type="text" placeholder="Author" name="author" />
    <textarea rows="10"name="translation" placeholder="Paste your translation here..."></textarea>
    <button type="submit">ADD TRANSLATION</button>
  </form>
  `
}

module.exports = form
