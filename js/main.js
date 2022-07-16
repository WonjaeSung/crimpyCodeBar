//The user will enter a cocktail. Get a cocktail name, photo, and instructions and place them in the DOM

//document.querySelector(".getCocktailBtn").addEventListener("click",getDrink) 
//document.querySelector("input").addEventListener("keyup",function(event){
    //if (event.key =="enter"){getDrink()}
//}) 
 

function getDrink(drink) {

    //let drink = document.querySelector('input').value

    let randomNumber = 1

    if (drink == "tequila"){
        randomNumber = Math.floor(Math.random()*5)
        console.log(randomNumber)
    }

    else if (drink =="vodka"){   
        randomNumber = Math.floor(Math.random()*9)
        console.log(randomNumber)  
    }

    else if (drink =="rum"){
        randomNumber = Math.floor(Math.random()*11)
        console.log(randomNumber) 
    }
    
    else if (drink =="gin"){
        randomNumber = Math.floor(Math.random()*20)
        console.log(randomNumber)
    }

    else if (drink =="mezcal"){
        randomNumber = Math.floor(Math.random()*1)
        console.log(randomNumber)
    }

    else if (drink =="whiskey"){
        randomNumber = Math.floor(Math.random()*1)
        console.log(randomNumber)   
    } 

    fetch("https://www.thecocktaildb.com/api/json/v1/1/search.php?s="+drink)
    .then(res => res.json())
    .then(data => {
        const drinks = data.drinks[randomNumber];
        const arr = Object.entries(drinks)
        let arrIngredients = arr.filter(([key,value]) => 
        (key.includes("strIngredient") || 
            key.includes("strMeasure")) && (
            typeof value === 'string' &&
            value !== ''))
        console.log(arrIngredients)
        
        displayIngredients = []

        // if there are odd index number of arrays in arrIngredients..
        if(arrIngredients.length % 2 == 1){
            for(let i=0; i< Math.ceil(arrIngredients.length/2); i++){
                if (i === Math.floor(arrIngredients.length/2)) {
                    displayIngredients.push(`and ${arrIngredients[i][1]}`)}

                else displayIngredients.push(`${arrIngredients[Math.ceil(arrIngredients.length/2)+i][1]} of ${arrIngredients[i][1]}`);
            }
        }
        
        else
            for(let i=0; i< arrIngredients.length/2; i++){
                //if it's a last ingredient, add "and" to the beginning.
                if (i===(arrIngredients.length/2-1)) {
                    displayIngredients.push(`and ${arrIngredients[arrIngredients.length/2+i][1]} of ${arrIngredients[i][1]}`)
                }
                else displayIngredients.push(`${arrIngredients[arrIngredients.length/2+i][1]} of ${arrIngredients[i][1]}`);
            }
        document.querySelector('.name').innerHTML = `${drinks.strDrink}`;
        document.querySelector('.ingredients').innerHTML = `<b>Ingredients: </b>${displayIngredients.join (', ')}`;
        document.querySelector('.instructions').innerHTML = `<b>Instructions: </b>${drinks.strInstructions}`;
        document.querySelector('img').src = drinks.strDrinkThumb;

    })
    

.catch(err => {
    console.log(`error ${err}`)
})
}


let search = {
    fetchDrink: function(drink){
        fetch(
            "https://www.thecocktaildb.com/api/json/v1/1/search.php?s=" + drink
        )
        .then((response) => response.json())
            .then((data) => {
               //console.log(data)
               this.displayDrink(data)
            })
    },

    clearingoutDOM: function(){
        document.querySelector('.name').innerHTML = ``;
        document.querySelector('.ingredients').innerHTML = ``;
        document.querySelector('.instructions').innerHTML = ``;
        document.querySelector('img').src = ``;
    },

    hideSearchOption: function(){
        document.getElementById("optionMessage").style.display = "none";
        document.getElementById("optionSearch").style.display = "none";
        document.getElementById("arr").style.display = "none";
    },

    dropdownOption : function(drinks){
        //clear all the options in an HTML select element In this method, you provide the id of the select dropdown box
        document.getElementById("arr").options.length = 0;
        
        drinks.map((x)=> console.log(x))
        //creating dropdown for all the options available
            for (var i = 0; i < drinks.length; i++) {
                document.getElementById("optionMessage").style.display = "inline"
                document.getElementById("optionSearch").style.display = "inline"
                document.getElementById("arr").style.display = "inline"
                var select = document.getElementById("arr");
                var optn = drinks[i].strDrink;
                var el = document.createElement("option");
                el.textContent = optn;
                el.value = optn;
                select.appendChild(el);
                //console.log(el);
                //console.log(select.length);
            }   
            document.querySelector('#optionSearch').addEventListener("click",function(){
                selectElement = document.querySelector('#arr');
                output = selectElement.value;
                console.log(output) 
                //document.querySelector('.output').textContent = output;
                search.fetchDrink(output)
                //console.log(result)
                //have to reduce this function ** repeated!!!



            })
    },

    displayDrink: function(data){
        //const drinks = data.drinks[0];

        this.clearingoutDOM()

        
        const drinks = data.drinks;

        console.log(drinks[0])

        console.log(drinks.length);
        // if drink search has only one option...
        if(drinks.length === 1){
        
            const arr = Object.entries(drinks[0])
            let arrIngredients = arr.filter(([key,value]) => 
            (key.includes("strIngredient") || 
                key.includes("strMeasure")) && (
                typeof value === 'string'))
            console.log(arrIngredients)
            
            displayIngredients = []
            
            if(arrIngredients.length % 2 == 1){
                for(let i=0; i< Math.ceil(arrIngredients.length/2); i++){
                    if (i === Math.floor(arrIngredients.length/2)) {
                        displayIngredients.push(`and ${arrIngredients[i][1]}`)}

                    else displayIngredients.push(`${arrIngredients[Math.ceil(arrIngredients.length/2)+i][1]} of ${arrIngredients[i][1]}`);
                }
            }
            
            else
                for(let i=0; i< arrIngredients.length/2; i++){
                    //if it's a last ingredient, add "and" to the beginning.
                    if (i===(arrIngredients.length/2-1)) {
                        displayIngredients.push(`and ${arrIngredients[arrIngredients.length/2+i][1]} of ${arrIngredients[i][1]}`)
                    }
                    else displayIngredients.push(`${arrIngredients[arrIngredients.length/2+i][1]} of ${arrIngredients[i][1]}`);
                }
            document.querySelector('.name').innerHTML = `${drinks[0].strDrink}`;
            document.querySelector('.ingredients').innerHTML = `<b>Ingredients: </b>${displayIngredients.join (', ')}`;
            document.querySelector('.instructions').innerHTML = `<b>Instructions: </b>${drinks[0].strInstructions}`;
            document.querySelector('img').src = drinks[0].strDrinkThumb;

            search.hideSearchOption();
        }

        else this.dropdownOption(drinks)

    },

    drinkName: function (){
        this.fetchDrink(document.querySelector('.drinkName').value)
    }
}



//search drinks by name.
document.querySelector('.search').addEventListener("click",function(){
    search.drinkName()
})
//Would like to be able to give recommendations based on type of liquor.

document.querySelector('.tequila').addEventListener("click",function(){getDrink("tequila")})

document.querySelector('.vodka').addEventListener("click",function(){getDrink("vodka")})

document.querySelector('.rum').addEventListener("click",function(){getDrink("rum")})

document.querySelector('.gin').addEventListener("click",function(){getDrink("gin")})

document.querySelector('.mezcal').addEventListener("click",function(){getDrink("mezcal")})

document.querySelector('.whiskey').addEventListener("click",function(){getDrink("whiskey")})



