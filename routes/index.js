const express = require("express");
const router = express.Router();
const fetch = require("node-fetch");

/* GET home page. */
router.get("/", function(req, res) {
  res.render("index", { title: "Express" });
});

router
  .get("/ingredients", (req, res) => {
    res.render("ingredients");
  })
  .post(async (req, res, next) => {
    res.render("ingredients");
  });

router.get("/results", async (req, res) => {
  const data = req.query.name;
  console.log(data);
  const arr2 = new Array();
  const arr = data.split(",");
  for (let i = 0; i < arr.length; i++) {
    if (/([a-zA-Z]+|\d+)+\s+([a-zA-Z]+|\d+)/g.test(arr[i])) {
      arr2.push(arr[i].replace(/\s+/g, "_"));
    } else if (/\s+([a-zA-Z]+|\d+)/g.test(arr[i])) {
      arr2.push(arr[i].replace(/\s/g, ""));
    } else if (
      /([a-zA-Z]+|\d+)+\s+([a-zA-Z]+|\d+)+\s+([a-zA-Z]+|\d+)/g.test(arr[i])
    ) {
      arr2.push(arr[i].replace(/\s+/g, "_"));
    }
  }
  const getData = arr2.join();
  const response = await fetch(
    `https://www.themealdb.com/api/json/v2/8673533/filter.php?i=${getData}`
  );
  const result = await response.json();
  const finalResult = result.meals;
  res.render("mealList", { finalResult });
});

router.get("/meal/:id", async (req, res) => {
  const id = req.params.id;
  const meal = await fetch(
    `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`
  );
  const result = await meal.json();
  const finalResult = result.meals;
  const youTube = finalResult[0].strYoutube;
  const dataYoutube = youTube.replace("watch?v=", "embed/");
  res.render("meal", { finalResult, dataYoutube });
});

router.get("/random", async (req, res) => {
  const meal = await fetch(
    `https://www.themealdb.com/api/json/v1/1/random.php`
  );
  const result = await meal.json();
  const finalResult = result.meals;
  const youTube = finalResult[0].strYoutube;
  const dataYoutube = youTube.replace("watch?v=", "embed/");
  res.render("meal", { finalResult, dataYoutube });
});

router.get("/categories", async (req, res) => {
  const meal = await fetch(
    `https://www.themealdb.com/api/json/v1/1/categories.php`
  );
  const result = await meal.json();
  const categories = result.categories;
  res.render("categories", { categories });
});

router.get("/categories/:id", async (req, res) => {
  const id = req.params.id;
  const meal = await fetch(
    `https://www.themealdb.com/api/json/v1/1/filter.php?c=${id}`
  );
  const result = await meal.json();
  const finalResult = result.meals
  res.render("mealList", { finalResult });
});

router.get('/countries', (req, res) => {
  res.render('countries')
})

router.get("/countries/:id", async (req, res) => {
  const id = req.params.id;
  const meal = await fetch(
    `https://www.themealdb.com/api/json/v1/1/filter.php?a=${id}`
  );
  const result = await meal.json();
  const finalResult = result.meals;
  res.render("mealList", { finalResult });
});

router.get("/contacts", (req, res) => {
  res.render('contact')
})


module.exports = router;
