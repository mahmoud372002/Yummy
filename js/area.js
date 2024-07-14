import { row } from "./index.js";
import { Detalis } from "./detalis.js";
export let area = document.getElementById("area");

export class Area {
  constructor() {
    this.dataOfArea();
  }
  async dataOfArea() {
    const api = await fetch(
      `https://www.themealdb.com/api/json/v1/1/list.php?a=list`
    );
    let res = await api.json();
    let response = res.meals;
    console.log(response);
    let cartona = "";
    for (let i = 0; i < response.length; i++) {
      cartona += `
            <div class="col-md-3">
                <div class="areaItem text-white text-center">
                    <i class="fa-solid fa-house-laptop fa-3x "></i>
                    <h2 class="fw-semibold NameOfArea">${response[i].strArea}</h2>
                </div>
            </div>
            `;
    }
    row.innerHTML = cartona;
    document.querySelectorAll(".areaItem").forEach((areaItem) => {
      areaItem.addEventListener("click", () => {
        const NameOfArea = areaItem.querySelector(`.NameOfArea`).textContent;
        this.showData(NameOfArea);
      });
    });
  }

  async showData(index) {
    const api = await fetch(
      `https://www.themealdb.com/api/json/v1/1/filter.php?a=${index}`
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
          </div>
            `;
    }
    row.innerHTML = cartona;
    document.querySelectorAll(".item").forEach((item) => {
      item.addEventListener("click", () => {
        new Detalis(item.dataset.id);
      });
    });
  }
}
