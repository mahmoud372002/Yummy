export let row = document.getElementById("row");

export class Detalis {
  constructor(index) {
    this.readDetalis(index);
  }
  async readDetalis(index) {
    const api = await fetch(
      `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${index}`
    );
    let res = await api.json();
    let result = res.meals;
    let cartona = "";
    console.log(result);
    for (let i = 0; i < result.length; i++) {
      cartona += `
               <div class="col-md-4">
            <div class="detalisImage p-3">
              <img src="${result[i].strMealThumb}" class="w-100" alt="" />
              <h2 class="h3 text-white fw-semibold fs-2 ps-2 pt-2">${result[i].strMeal}</h2>
            </div>
          </div>
          <div class="col-md-8">
            <div class="detalisArea text-white p-3">
              <h2>Instructions</h2>
              <p>${result[i].strInstructions}</p>
              <p class="fs-3 fw-bolder m-0">Area : <span id="area">${result[i].strArea}</span></p>
              <p class="fs-3 fw-bolder">Category : <span id="category">${result[i].strCategory}</span></p>
              <p class="fs-3 fw-bolder">Recipes :
                <div class="d-flex justify-content-start align-items-start flex-wrap gap-4">
            `;
            for(let j =1;j<=20;j++){
                let measure = result[i][`strMeasure${j}`]
                let ingredient = result[i][`strIngredient${j}`]
                if(measure && ingredient){
                    cartona +=`
                  <div class="measureAndIngre rounded-3 p-1"><h3 class="h5 fs-6 p-1" id="recipes">${measure} ${ingredient}</h3></div>
                    
                    `
                }
            }
      cartona += `
                        </div>
              </p>
              <p class="fs-3 fw-bolder">Tags : 
                <div class="d-flex justify-content-start align-items-center gap-2">
                  <a href="${result[i].strSource}" class="btn btn-success px-4">Souce</a>
                  <a href="${result[i].strYoutube}" class="btn btn-danger px-4">Youtube</a>
                </div>
              </p>
            </div>
          </div>
            `;
    }
    row.innerHTML = cartona;
  }
}

