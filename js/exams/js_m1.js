

// this script is used to create the exam of module 1 using HTML and JS

    //this is the database of the restaunts and meals of each restaurant + extras 
const database = {
    // 1. burger king
    "burgerking" : {
        name: "Burger King",
        typeOfFood: [ "Burgers", "Chicken" ],
        meals: [
            {
                meal_id: 'burger1',
                name: "Whopper",
                description: "A large burger with beef patty, lettuce, tomato, and mayo.",
                price: 5.99,
                image: "/media/exam_m1/whopper.jpeg",
                rating: 4.5,
                time: 15,
                ingredients: [ "beef", "lettuce", "tomato", "mayo" ],
            },
            {
                meal_id: 'burger2',
                name: "Chicken Sandwich",
                description: "A crispy chicken sandwich with lettuce and mayo.",
                price: 6.49,
                image: "/media/exam_m1/BK_Web_LONGCHICKEN.png",
                rating: 4.2,
                time: 10,
                ingredients: [ "chicken", "lettuce", "mayo" ],
            },
        ],
    },
    // 2. Pizza Hut
    "pizzahut" : {
        name: "Pizza Hut",
        typeOfFood: [ "Pizza" ],
        meals: [
            {
                meal_id: 'pizza1',
                name: "Pepperoni Pizza",
                description: "A classic pepperoni pizza with mozzarella cheese.",
                price: 8.99,
                image: "/media/exam_m1/ph_pepperoni.jpg",
                rating: 4.3,
                time: 20,
                ingredients: [ "mozzarella", "pepperoni", "tomato sauce" ],
            },
            {
                meal_id: 'pizza2',
                name: "Veggie Pizza",
                description: "A pizza loaded with fresh vegetables and mozzarella cheese.",
                price: 7.49,
                image: "/media/exam_m1/ph_veggie.jpg",
                rating: 4.0,
                time: 25,
                ingredients: [ "mozzarella", "bell peppers", "onions", "mushrooms" ],
            },
        ],
    },
    // 3. Sushi Express
    "sushiexpress" : {
        name: "Sushi Express",
        typeOfFood: [ "Asian" ],
        meals: [
            {
                meal_id: 'sushi1',
                name: "California Roll",
                description: "A sushi roll with crab, avocado, and cucumber.",
                price: 9.99,
                image: "/media/exam_m1/California-rolls.jpg",
                rating: 4.6,
                time: 15,
                ingredients: [ "crab", "avocado", "cucumber" ],
            },
            {
                meal_id: 'sushi2',
                name: "Salmon Sashimi",
                description: "Fresh salmon sashimi served with soy sauce.",
                price: 12.49,
                image: "/media/exam_m1/Salmon-Sashimi.jpg",
                rating: 4.8,
                time: 10,
                ingredients: [ "salmon", "soy sauce" ],
            },
        ],
    },
};

// list of steps


let system = {
    cart: [],
    total: 10,
};

function resetSystem() {
    system.cart = [];
    system.total = 0;
}

// template to card and load all meal information
// funtion to create a card for each meal
function createCardsMeal(meals) {
    // validations of elements needed
    if (meals === undefined) {
        console.warning("Meal not found");
        return;
    }
    if (meals['name'] === undefined) {
        console.warning("Meal name not found");
        return;
    }
    if (meals['image'] === undefined) {
        console.warning("Meal image not found");
        return;
    }
    if (meals['rating'] === undefined) {
        console.warning("Meal rating not found");
        return;
    }
    if (meals['time'] === undefined) {
        console.warning("Meal time not found");
        return;
    }
    if (meals['price'] === undefined) {
        console.warning("Meal price not found");
        return;
    }

    
    const card = `
    <div class="card card_meal">
        <img src="${meals['image']}" class="card-img-top" >
        <div class="card-body">
            <h5 class="card-title">${meals['name']}</h5>
            <p class="card-text text-muted">American • Burgers • Fast Food</p>
            <div class="d-flex justify-content-between align-items-center">
                <span class="badge bg-success">${meals['rating']} ★</span>
                <span class="text-muted">${meals['time']} min</span>
            </div>
            <div class="d-flex w-100 justify-content-center">
                <div class="d-flex justify-content-center">
                    <span class="fs-3 fs-bold">Price: €${meals['price']}</span>
                </div>
            </div>
            <!--button add to cart-->
            <button class="btn btn-primary mt-2" type="button" onclick="addToCart('${meals['meal_id']}')">
                <i class="fas fa-plus"></i> Add to Cart 
            </button>                                                  
        </div>
    </div>
    `
    return card;
}
// function to update total cart
function updateTotalCart() {
    if (system.cart === undefined) {
        console.warning("Cart not found");
        return;
    }
    let total = 0;
    // loop through the cart and get the total price
    system.cart.forEach((meal_id) => {
        // loop through the database and get the meal price
        for (const restaunt in database) {
            const meals = database[restaunt].meals;
            meals.forEach((meal) => {
                if (meal.meal_id === meal_id) {
                    total += meal.price;
                }
            });
        }
    });

    total = total.toFixed(2);
    // store total in the system
    system.total = total;

    const totalCart = document.getElementById("cart_total");
    totalCart.innerHTML = `${system.total}`;
    // show sub total
    const subTotal = document.getElementById("subtotal");
    subTotal.innerHTML = `${system.total}`;
    // show the cart content
    const cartContent = document.getElementById("cart_content");
    cartContent.innerHTML = "";
    system.cart.forEach((meal_id) => {
        // loop through the database and get the meal price
        for (const restaunt in database) {
            const meals = database[restaunt].meals;
            meals.forEach((meal) => {
                if (meal.meal_id === meal_id) {
                    cartContent.innerHTML += `
                    <div class="d-flex justify-content-between align-items-center m-3">
                        <span>${meal.name}</span>
                        <div class="d-flex justify-content-center align-items-center gap-2">
                            <span>€${meal.price}</span>
                            <button class="btn btn-danger" type="button" onclick="removeFromCart('${meal.meal_id}')">
                                <i class="fas fa-times"></i>
                            </button>
                        </div>
                    </div>
                    `;
                }
            });
        }
    });
}
function calculateTotal() {
    // get the tip percerntage
    const tip = document.getElementById("tip_percent").value;

    // get the quantity of people to split the bill
    const people = document.getElementById("people").value;
    // get the total price
    const total = system.total;
    // show total tip
    const totalTip = document.getElementById("tip");
    const tipAmount = (total * tip / 100).toFixed(2);
    totalTip.innerHTML = `${tipAmount}`;
    // show total
    const totalPrice = document.getElementById("total");
    const totalPriceAmount = (parseFloat(total) + parseFloat(tipAmount)).toFixed(2);
    totalPrice.innerHTML = `${totalPriceAmount}`;
    // show total per person
    const totalPerPerson = document.getElementById("total_per_person");
    const totalPerPersonAmount = (parseFloat(totalPriceAmount) / parseInt(people)).toFixed(2);
    totalPerPerson.innerHTML = `${totalPerPersonAmount}`;

    if (total>0 && people>0) {
        const enable_checkout = document.getElementById("btn_checkout");
        enable_checkout.disabled = false;
    }
    // generate order number and show
    const orderNumber = Math.floor(Math.random() * 10000);
    const orderNumberElement = document.getElementById("order_number");
    orderNumberElement.innerHTML = `${orderNumber}`;
}
// function to remove from cart
function removeFromCart(meal_id) {
    // validations of elements needed
    if (meal_id === undefined) {
        console.warning("Meal id not found");
        return;
    }
    // remove the meal from the cart
    const index = system.cart.indexOf(meal_id);
    if (index > -1) {
        system.cart.splice(index, 1);
    }
    updateTotalCart();
}
// function to add to cart
function addToCart(meal_id) {
    // validations of elements needed
    if (meal_id === undefined) {
        console.warning("Meal id not found");
        return;
    }
    system.cart.push(meal_id);
    updateTotalCart();
    if (system.cart.length > 0) {
        const enable_calc = document.getElementById("btn_cart");
        enable_calc.disabled = false;
    }
}

function loadMeals(restaunt) {
    restaunt = restaunt.trim().toLowerCase();
    // validate step
    // validate restaurant
    if (restaunt === undefined) {
        console.warning("Restaurant not found");
        return;
    }
    // validate restaurant name
    if (database[restaunt] === undefined) {
        console.warning("Restaurant name not found");
        return;
    }

    const mealList = document.getElementById("meal_list");
    mealList.innerHTML = "";
    // get index of the restaurant

    const meals = database[restaunt].meals;
    // create a card for each meal
    meals.forEach((meal, index) => {
        mealList.innerHTML += createCardsMeal(meal);
        // add event listener to each card
    });
    
}

function filterByCategory(category) {
    let restaurant_filter = []
    if (category === undefined) {
        for (const restaunt in database) {
            restaurant_filter.push(restaunt);
        }
    }else {
        category = category.trim().toLowerCase();
    }
    
    const div_restaurants = document.getElementById("div_restaurants");
    
    //find the category in the database
    for (const restaunt in database) {
        // check match with type of food
        const foodType = database[restaunt].typeOfFood;
        // convert to lower case all array
        const foodType_lower = foodType.map(type => type.toLowerCase());
        if (foodType_lower.includes(category)) {
            restaurant_filter.push(restaunt);
        }
    }
    // itearete all div and decide if hidde
    console.log(restaurant_filter)
    // get all restaurants cards
    const restaurantsCards = div_restaurants.querySelectorAll("[restaurant_card]");
    // itearete all div and decide if hidde
    restaurantsCards.forEach(restaurantCard => {
        if (restaurant_filter.includes(`${restaurantCard.attributes['restaurant_card'].value}`)) {
            restaurantCard.style.display = "block";
        } else {
            restaurantCard.style.display = "none";
        }
    });

    
}
// load the meals of the first restaurant
//loadMeals('BurgerKing');

const myCarousel = document.getElementById('carousel')

const slidesContent = [
    {percent_title: 'Select meals'},
    {percent_title: 'Checkout'},
    {percent_title: 'Order information'},
]

function loadProgressBarInfo(index) {
    const progressBar = document.getElementById('progress_bar')
    progressBar.style.width = `${(index + 1) * (100 / slidesContent.length)}%`
    progressBar.innerHTML = `${slidesContent[index].percent_title}`
}

myCarousel.addEventListener('slide.bs.carousel', event => {
  // do something...
    console.log(event)

    loadProgressBarInfo(event.to)
})


function initialize() {
    loadProgressBarInfo(0)
    
}

initialize()






