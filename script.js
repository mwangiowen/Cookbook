function searchMeal() {
  const searchTerm = document.getElementById("searchInput").value;
  const apiUrl = `https://www.themealdb.com/api/json/v1/1/search.php?s=${searchTerm}`;

  fetch(apiUrl)
    .then((response) => response.json())
    .then((data) => {
      displayMeals(data.meals);
    })
    .catch((error) => {
      console.error("Error fetching data:", error);
    });
}
function displayMeals(meals) {
  const mealList = document.getElementById("mealList");
  mealList.innerHTML = ""; // Clear previous results

  if (meals) {
    meals.forEach((meal) => {
      const mealItem = document.createElement("li");
      mealItem.classList.add("cards_item");

      const card = document.createElement("div");
      card.classList.add("card");

      const cardImage = document.createElement("div");
      cardImage.classList.add("card_image");
      const image = document.createElement("img");
      image.src = meal.strMealThumb;
      image.alt = meal.strMeal;
      cardImage.appendChild(image);

      const cardContent = document.createElement("div");
      cardContent.classList.add("card_content");

      const title = document.createElement("h2");
      title.classList.add("card_title");
      title.textContent = meal.strMeal;

      const cardText = document.createElement("div");
      cardText.classList.add("card_text");

      // Displaying category, area, and tags
      const category = document.createElement("p");
      category.textContent = `Category: ${meal.strCategory}`;
      cardText.appendChild(category);

      const area = document.createElement("p");
      area.textContent = `Area: ${meal.strArea}`;
      cardText.appendChild(area);

      const tags = document.createElement("p");
      tags.textContent = `Tags: ${meal.strTags}`;
      cardText.appendChild(tags);

      // Displaying instructions
      const instructions = document.createElement("p");
      instructions.textContent = meal.strInstructions;
      cardText.appendChild(instructions);

      // Displaying ingredients
      const ingredientsList = document.createElement("ul");
      for (let i = 1; i <= 20; i++) {
        const ingredient = meal[`strIngredient${i}`];
        const measure = meal[`strMeasure${i}`];
        if (ingredient && measure) {
          const ingredientItem = document.createElement("li");
          ingredientItem.textContent = `${measure.trim()} ${ingredient.trim()}`;
          ingredientsList.appendChild(ingredientItem);
        }
      }
      cardText.appendChild(ingredientsList);

      // Displaying YouTube video link
      const youtubeLink = document.createElement("a");
      youtubeLink.href = meal.strYoutube;
      youtubeLink.innerHTML =
        '<span style="color: red;"><i class="bi bi-play-circle-fill"></i></span> Watch on YouTube';
      youtubeLink.target = "_blank";
      cardText.appendChild(youtubeLink);

      cardContent.appendChild(title);
      cardContent.appendChild(cardText);

      card.appendChild(cardImage);
      card.appendChild(cardContent);

      mealItem.appendChild(card);
      mealList.appendChild(mealItem);
    });
  } else {
    const errorMessage = document.createElement("li");
    errorMessage.textContent = "No meals found!";
    mealList.appendChild(errorMessage);
  }
}
$(".searchInput").focus(function (e) {
  $(".bar")
    .css({ bottom: "19px", right: "12px", width: "14px" })
    .addClass("close");
});

$(".searchInput").blur(function (e) {
  $(".bar")
    .css({ bottom: "0", right: "0", width: "11px" })
    .removeClass("close");
});
// script.js

// Simulate loading time
setTimeout(function () {
  document.querySelector(".splash-screen").style.display = "none";
  document.querySelector("#app").style.display = "block";
}, 3000);
