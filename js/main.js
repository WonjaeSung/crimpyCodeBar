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

        // if there are odd index numbers in array arrIngredients..
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
               console.log(data)
               this.displayDrink(data)
            })
    },
    displayDrink: function(data){
        const drinks = data.drinks[0];
        const arr = Object.entries(drinks)
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
        document.querySelector('.name').innerHTML = `${drinks.strDrink}`;
        document.querySelector('.ingredients').innerHTML = `<b>Ingredients: </b>${displayIngredients.join (', ')}`;
        document.querySelector('.instructions').innerHTML = `<b>Instructions: </b>${drinks.strInstructions}`;
        document.querySelector('img').src = drinks.strDrinkThumb;
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



