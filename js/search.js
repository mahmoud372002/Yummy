import { row } from "./index.js";
import { Detalis } from "./detalis.js";

export let search = document.getElementById("search");

search.addEventListener("click", () => {
    row.innerHTML = `
     <div class="col-md-6 w-100 mb-5">
        <div class="searchByNameAndChar pt-2 w-100 d-flex justify-content-center align-items-center gap-3 mt-5">
            <input type="text" name="nameOfFood" class="w-50 p-2 bg-black searchByName" placeholder="Search by name..." id="searchWithName">
            <input type="text" name="firstLetter" class="w-50 p-2 bg-black searchByLetter" placeholder="Search by first letter..." id="searchWithLetter">
        </div>
    </div>
    <div id="searchResults" class="w-100 d-flex flex-wrap gap-3 justify-content-center align-items-center"></div> 
    `;


    let searchWithLetter = document.getElementById("searchWithLetter");
    let searchWithName = document.getElementById("searchWithName");

    searchWithLetter.addEventListener("input", () => {
        const value = searchWithLetter.value;
        
        if (value.length > 1 || !/^[a-zA-Z]$/.test(value)) {
            searchWithLetter.value = value.charAt(0);
           
        }
        new SearchLetter(value)
       
    });
    searchWithName.addEventListener("keyup", () => {
        console.log(searchWithName.value);
        new SearchValue(searchWithName.value);
    });
});

export class SearchValue {
    constructor(index) {
        this.searchData(index);
    }
    async searchData(index) { 
        const api = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${index}`);
        let res = await api.json();
        let response = res.meals;
        let cartona = "";
        for (let i = 0; i < response.length; i++) {
            cartona += `
            <div class="col-md-3">
                <div class="item position-relative overflow-hidden" data-id=${response[i].idMeal}>
                    <img src="${response[i].strMealThumb}" class="w-100" alt="images meals" />
                    <div class="ler position-absolute top-100 start-0 end-0 bottom-0 d-flex justify-content-start align-items-center">
                        <span class="h3 lerContent ps-3 text-black fw-semibold">${response[i].strMeal}</span>
                    </div>
                </div>
            </div>`;
        }
     
        document.getElementById("searchResults").innerHTML = cartona;
        document.querySelectorAll(".item").forEach((item)=>{
            item.addEventListener("click",()=>{
                new Detalis(item.dataset.id)
            })
        })
    }
}

export class SearchLetter {
    constructor(index){
        this.dataLetter(index)
    }
    async dataLetter(index){
        const api = await fetch (`https://www.themealdb.com/api/json/v1/1/search.php?f=${index}`)
        let res = await api.json()
        let response = res.meals;
        let cartona = ""
        for(let i =0 ;i<response.length;i++){
            cartona+=`
            <div class="col-md-3">
                <div class="item position-relative overflow-hidden" data-id=${response[i].idMeal}>
                    <img src="${response[i].strMealThumb}" class="w-100" alt="images meals" />
                    <div class="ler position-absolute top-100 start-0 end-0 bottom-0 d-flex justify-content-start align-items-center">
                        <span class="h3 lerContent ps-3 text-black fw-semibold">${response[i].strMeal}</span>
                    </div>
                </div>
            </div>
            `
        }
        document.getElementById("searchResults").innerHTML = cartona;
        document.querySelectorAll(".item").forEach((item)=>{
            item.addEventListener("click",()=>{
                new Detalis(item.dataset.id)
            })
        })
    }
}


