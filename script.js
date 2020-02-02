const copy = (text) => {
  const input = document.createElement("input")
  input.setAttribute("value", text)
  document.body.appendChild(input)
  input.select()
  const result = document.execCommand("copy")
  document.body.removeChild(input)

  return result
}

document
  .getElementById("translations")
  .addEventListener("click", ({ target }) => {
    if (target.classList.contains("code")) {
      copy(target.innerText)
    }
    console.dir(target.innerText)
  })
