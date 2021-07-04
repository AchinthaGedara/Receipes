// JS file start here



// Event Handler for search button
// Save data to local storage
divTask.addEventListener("click", (event) => {
    if (event.target.classList.contains("fa-save"))
    {
        console.log("jjj");
    }
});

document.querySelector(".search-form-textbox").addEventListener("keydown", (event) => {

    if (event.code === 'Enter') {
        console.log(event.key);
        event.preventDefault();
        validation();
    }
});

document.querySelector(".search-button").addEventListener("click", () => {
    validation();

});

const validation = () => {
    let keyWord = document.querySelector(".search-form-textbox").value;
    if (keyWord === "" || !(keyWord.match(/^[A-Za-z ]+$/))) {
        window.alert("Enter a Valid Ingredient");
    }
    else {
        getReceipes(keyWord);
    }
}

const getReceipes = async (keyWord) => {
    let ingredient = keyWord;
    let htmlArray = [];    
    let URL = `https://api.edamam.com/api/recipes/v2?type=public&q=${ingredient}&app_id=a267c238&app_key=b1f0e8d21ea4382b259a18dcb53006ff`;
    let result = await fetch(URL);
    jsonResult = await result.json();
    console.log(jsonResult.hits);
    console.log(jsonResult.hits[0]);
    //generate html
    let jsonResultHits = jsonResult.hits;
    for (let i = 0; i < jsonResultHits.length; i++) {
        let list = "";
        list = generateList(jsonResultHits[i].recipe.ingredients);
        let html = generateHtml(jsonResultHits[i], list);
        htmlArray.push(html);

    }
    display(htmlArray);
}


const generateHtml = (results, list) => {

    let html = "";
    html +=
        `<div class="row pt-3">
                <div class="col-12 d-flex justify-content-end">
                    <div class="card  rounded-3 px-2 py-2 me-5 card-outer" style="max-width: 640px">
                        <div class="card rounded-3 bg-white shadow-lg  ps-0 card-inner"
                            style="max-width: 640px; max-height:400px;">
                            <div class="row h-100">
                                <div class="col-sm-4 col-4 d-flex justify-content-start h-100">
                                    <span class="close-button"><i class="fas fa-window-close fa-lg"></i>
                                    </span>                                    
                                        <img src="${results.recipe.image}"
                                        class="img-fluid rounded-0 card-image" style="object-fit:cover">                                    
                                </div>
                                <div class="col-sm-8 col-8  pl-0 py-2">
                                    <div class="card-block">                                                                        
                                            <h4 >                                          
                                                ${results.recipe.label}                                            
                                            </h4>                                                                            
                                         <hr>     
                                            <div class="row ingredient-list ps-2">                                                                    
                                            <ol class="ingredient-list" >     
                                                ${list}
                                            </ol>
                                        </div>
                                        <hr>
                                        <div class="view-recipe mb-0 pb-0">                                                                                
                                            <a href="${results.recipe.url}" target="_blank" class="text-muted pe-4"> View Receipe >> </a>
                                            <i class="fas fa-save fa-lg"></i>                                         
                                        </div>
                                        
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>`;
    
    return html;

}

const display = (htmlArray) => {
    let html = htmlArray.join("\n");
    
    document.querySelector(".recipes").innerHTML = html;
}

const generateList = (result => {
    let html = "";
    result.map((para1) => {
        html += `<li>${para1.text}</li>`;
    });
    return html;
});