/// <reference types="../@types/jquery" />
import { Detalis } from "./detalis.js";
import { categories,Categore } from "./category.js";
import {area,Area} from "./area.js"
import {ingredients,ingredient} from "./ingredients.js"
import { search , SearchValue,SearchLetter} from "./search.js";
import { contactUs,Validation,regex } from "./contact.js";


export let row = document.getElementById("row");

// let search = document.getElementById("search");
// let searchName = document.getElementById("searchName");
// let searchLetter = document.getElementById("searchLetter");
$("#bars").on("click", function () {
  $("#xmark").removeClass("d-none");
  $("#bars").addClass("d-none");
  $(".sideLogo").animate({ left: "15%" }, 1000);
  $(".sideBar").animate({ left: 0 }, 1000);
  $(".fa-xmark").on("click", () => {
    $(".sideLogo").animate({ left: 0 }, 1000);
    $(".sideBar").animate({ left: "-15%" }, 1000);
    $("#xmark").addClass("d-none");
    $("#bars").removeClass("d-none");
  });
});
class MainData {
  constructor() {
    this.getData();
  }
  async getData() {
    const api = await fetch(
      `https://www.themealdb.com/api/json/v1/1/search.php?s=`
    );
    let response = await api.json();
    let result = response.meals;
    console.log(result);
    let cartona = "";
    for (let i = 0; i < result.length; i++) {
      cartona += `
                    <div class="col-md-3">
            <div class="item position-relative overflow-hidden" data-id=${result[i].idMeal}>
              <img src="${result[i].strMealThumb}" class="w-100" alt="images meals" />
              <div
                class="ler position-absolute top-100 start-0 end-0 bottom-0 d-flex justify-content-start align-items-center"
              >
                <span class="h3 lerContent ps-3 text-black fw-semibold">${result[i].strMeal}</span>
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
document.addEventListener("DOMContentLoaded", () => {
  startApp();
});
function startApp() {
  new MainData();
  categories.addEventListener("click",()=>{
    new Categore()
  })
  area.addEventListener("click",()=>{
    new Area().dataOfArea()
  })
  ingredients.addEventListener("click",()=>{
    new ingredient().showData()
  })

}


