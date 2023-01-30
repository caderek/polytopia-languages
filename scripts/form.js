const { readFileSync } = require("fs");

const html = String.raw;

const prepareCountries = () => {
  const content = readFileSync("assets/countries.txt")
    .toString()
    .split("\n")
    .filter((line) => line.trim() !== "");

  let isOdd = false;
  const countries = [];

  for (const line of content) {
    if (!isOdd) {
      countries.push({ short: line, full: null });
    } else {
      // @ts-ignore
      countries[countries.length - 1].full = line;
    }

    isOdd = !isOdd;
  }

  return countries;
};

const form = () => {
  const countries = prepareCountries();

  return html`
    <form
      id="add-translation"
      class="add-form"
      name="add-translation"
      method="POST"
      data-netlify-recaptcha="true"
      netlify
    >
      <select id="country" name="country">
        <option disabled selected>Select country (language flag)</option>
        ${countries
          .map(
            ({ short, full }) =>
              `<option value="${short}">${short} - ${full}</option>`
          )
          .join("\n")}
      </select>
      <input type="text" placeholder="Author" required name="author" />
      <textarea
        name="translation"
        required
        rows="10"
        name="translation"
        placeholder="Paste your translation here..."
      ></textarea>
      <textarea
        rows="3"
        name="details"
        placeholder="Additional details (optional)"
      ></textarea>
      <div class="captcha" data-netlify-recaptcha="true"></div>
      <button type="submit">ADD TRANSLATION</button>
    </form>
  `;
};

module.exports = form;
