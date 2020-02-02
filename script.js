const copy = (text) => {
  const input = document.createElement("input")
  input.setAttribute("value", text)
  document.body.appendChild(input)
  input.select()
  const result = document.execCommand("copy")
  document.body.removeChild(input)

  return result
}

const copied = document.getElementById("copied")

document
  .getElementById("translations")
  .addEventListener("click", ({ target }) => {
    if (target.classList.contains("code")) {
      copy(target.innerText)
    }
    copied.classList.remove("hidden")
    setTimeout(() => copied.classList.add("hidden"), 1000)
  })
