const ingredients = document.getElementById("ingredients");

ingredients.addEventListener("submit", async event => {
  event.preventDefault();
  const data = document.getElementById("input-ingredients").value;
  window.location = `results/?name=${data}`
});

