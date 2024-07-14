import { row } from "./index.js";
import { Detalis } from "./detalis.js";
export let ingredients = document.getElementById("ingredients");

export class ingredient {
  constructor() {
    // this.showData()
  }
  async showData() {
    const api = await fetch(
      `https://www.themealdb.com/api/json/v1/1/list.php?i=list`
    );
    let res = await api.json();
    let response = res.meals;
    console.log(response);
    let cartona = "";
    for (let i = 0; i < 20; i++) {
      let maxDesc = response[i].strDescription
        .split(" ")
        .slice(0, 20)
        .join(" ");
      cartona += `
             <div class="col-md-3 my-2">
            <div class="ingredItem text-white text-center">
              <i class="fa-solid fa-drumstick-bite fa-3x"></i>
              <h2 class="fw-semibold py-2 NameOfIngred">${response[i].strIngredient}</h2>
              <p>${maxDesc}</p>
            </div>
          </div>
            
            `;
    }
    row.innerHTML = cartona;
    document.querySelectorAll(".ingredItem").forEach((ingredItem) => {
      ingredItem.addEventListener("click", () => {
        const NameOfIngred =
          ingredItem.querySelector(".NameOfIngred").textContent;
        new IngreDetalis(NameOfIngred);
      });
    });
  }
}
class IngreDetalis {
  constructor(index) {
    this.ingreDetalis(index);
  }
  async ingreDetalis(index) {
    const api = await fetch(
      `https://www.themealdb.com/api/json/v1/1/filter.php?i=${index}`
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
