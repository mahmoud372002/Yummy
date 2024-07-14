import { row } from "./index.js";
import { Detalis } from "./detalis.js";
export let categories = document.getElementById("categories");

export class Categore {
  constructor() {
    this.readData();
  }
  async readData() {
    const api = await fetch(
      `https://www.themealdb.com/api/json/v1/1/categories.php`
    );
    let res = await api.json();
    let response = res.categories;
    console.log(response);
    let cartona = "";
    for (let i = 0; i < response.length; i++) {
      let maxDescript = response[i].strCategoryDescription
        .split(" ")
        .slice(0, 20)
        .join(" ");
      cartona += `
         <div class=" col-md-3">
                <div class="categorieItem position-relative overflow-hidden" id=${response[i].idCategory}> 
                    <img src="${response[i].strCategoryThumb}" class="w-100" alt="" />
                    <div
                      class="categorieLer position-absolute top-100 start-0 end-0 bottom-0  w-100 h-100 text-center px-2"
                    >
                      <h3 class="py-3 category-title">${response[i].strCategory}</h3>
                      <p>${maxDescript} </p>
                    </div>
                </div>
              </div>
        `;
    }
    row.innerHTML = cartona;
    document.querySelectorAll(".categorieItem").forEach((categorieItem) => {
      categorieItem.addEventListener("click", () => {
        const categoryTitle =
          categorieItem.querySelector(".category-title").textContent;
        new DataWithName(categoryTitle);
      });
    });
  }
}
class DataWithName {
  constructor(index) {
    this.showData(index);
  }
  async showData(index) {
    const api = await fetch(
      `https://www.themealdb.com/api/json/v1/1/search.php?s=${index}`
    );
    let res = await api.json();
    let response = res.meals;
    console.log(response);
    let cartona = "";
    for (let i = 0; i < response.length; i++) {
      cartona += `
                 <div class="col-md-3">
            <div class="item position-relative overflow-hidden" data-id=${response[i].idMeal}>
              <img src="${response[i].strMealThumb}" class="w-100" alt="images meals" />
              <div
                class="ler position-absolute top-100 start-0 end-0 bottom-0 d-flex justify-content-start align-items-center"
              >
                <span class="h3 lerContent ps-3 text-black fw-semibold">${response[i].strMeal}</span>
              </div>
            </div>
          </div>`;
    }
    row.innerHTML = cartona;
    document.querySelectorAll(".item").forEach((item) => {
      item.addEventListener("click", () => {
        new Detalis(item.dataset.id);
      });
    });
  }
}
