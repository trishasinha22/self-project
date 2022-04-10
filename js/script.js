
let loginForm = document.querySelector('.login-form');

document.querySelector('#login-btn').onclick = () => {
    loginForm.classList.toggle('active');
    navbar.classList.remove('active');
}

let navbar = document.querySelector('.navbar');

document.querySelector('#menu-btn').onclick = () => {
    navbar.classList.toggle('active');
    loginForm.classList.remove('active');
}

window.onscroll = () => {
    loginForm.classList.remove('active');
    navbar.classList.remove('active');
}

let slides = document.querySelectorAll('.home .slides-container .slide');
let index = 0;

function next() {
    slides[index].classList.remove('active');
    index = (index + 1) % slides.length;
    slides[index].classList.add('active');
}

function prev() {
    slides[index].classList.remove('active');
    index = (index - 1 + slides.length) % slides.length;
    slides[index].classList.add('active');
}

let carts = document.querySelectorAll('.shopping-cart');
let products = [
    {
        name: 'Mutton',
        tag: 'mutton',
        price: 220,
        incart: 0
    },
    {
        name: 'Fish',
        tag: 'fish',
        price: 260,
        incart: 0
    },
    {
        name: 'Shrimps',
        tag: 'shrimps',
        price: 300,
        incart: 0
    },
    {
        name: 'Banana',
        tag: 'banana',
        price: 60,
        incart: 0
    },
    {
        name: 'Mangoes',
        tag: 'mango',
        price: 80,
        incart: 0
    },
    {
        name: 'Pomegranate',
        tag: 'pom',
        price: 110,
        incart: 0
    },
    {
        name: 'Apple',
        tag: 'apple',
        price: 40,
        incart: 0
    },
    {
        name: 'Pumpkin',
        tag: 'pumpkin',
        price: 80,
        incart: 0
    },
    {
        name: 'Spinach',
        tag: 'spinach',
        price: 30,
        incart: 0
    },
    {
        name: 'Beetroot',
        tag: 'beetroot',
        price: 60,
        incart: 0
    },
    {
        name: 'Carrots',
        tag: 'carrot',
        price: 40,
        incart: 0
    },
    {
        name: 'Cow Milk',
        tag: 'milk',
        price: 40,
        incart: 0
    },
    {
        name: 'Rice',
        tag: 'rice',
        price: 70,
        incart: 0
    },
    {
        name: 'Organic Wheat',
        tag: 'wheat',
        price: 50,
        incart: 0
    },
    {
        name: 'Ragi Flour',
        tag: 'ragi',
        price: 100,
        incart: 0
    },
    {
        name: 'Cloves',
        tag: 'cl',
        price: 50,
        incart: 0
    },
    {
        name: 'Turmeric',
        tag: 'Tur',
        price: 55,
        incart: 0
    },
];

for (let i = 0; i < carts.length; i++) {
    carts[i].addEventListener('click', () => {
        //console.log("added");
        cartNumbers(products[i]);
        totalcost(products[i]);
    })
}
function onloadcartno() {
    let productNumbers = localStorage.getItem('cartNumbers');
    if (productNumbers) {
        document.querySelector('.cart span').textContent = productNumbers;
    }
}
function cartNumbers(products) {
    //console.log("product clicked ", products );
    let productNumbers = localStorage.getItem('cartNumbers');
    productNumbers = parseInt(productNumbers);
    //console.log(typeof productNumbers);
    if (productNumbers) {
        localStorage.setItem('cartNumbers', productNumbers + 1);
        document.querySelector('.cart span').textContent = productNumbers + 1;
    }
    else {
        localStorage.setItem('cartNumbers', 1);
        document.querySelector('.cart span').textContent = 1;
    }

    setitems(products);
}
function setitems(products) {
    let cartItems = localStorage.getItem('productsInCart');
    cartItems = JSON.parse(cartItems);
    //console.log("cart", cartItems);
    if (cartItems != null) {

        if (cartItems[products.tag] == undefined) {
            cartItems = {
                ...cartItems,
                [products.tag]: products
            }
        }
        cartItems[products.tag].incart += 1;
    }
    else {
        products.incart = 1;
        cartItems = {
            [products.tag]: products
        }
    }

    localStorage.setItem("productsInCart", JSON.stringify(cartItems));
}

function totalcost(products) {
    //console.log("pp", products.price);
    let cartcost = localStorage.getItem('totalcost');
    console.log("total cost", cartcost);
    if (cartcost != null) {
        cartcost = parseInt(cartcost);
        localStorage.setItem("totalcost", cartcost + products.price);
    }
    else {
        localStorage.setItem("totalcost", products.price);
    }
}

function displaycart() {
    let cartItems = localStorage.getItem("productsInCart");
    cartItems = JSON.parse(cartItems);
    let productContainer = document.querySelector(".products1");
    let cartcost = localStorage.getItem('totalcost');
    if (cartItems && productContainer) {
        //console.log("running");
        productContainer.innerHTML = '';
        Object.values(cartItems).map(item => {
            productContainer.innerHTML += `
            <div class="product">
                <img src="./image/${item.tag}.jpg"></img>
                <span>${item.name}</span>
            </div>
            <div class="price">Rs.${item.price}</div>  
            <div class="quantity">
            <span>${item.incart}</span>
            </div>
            <div class="total">Rs.${item.incart * item.price}</div>
            `;
        });
        productContainer.innerHTML += `
          <center>
          <div class="baskettotal">
          <h4 class="baskettitle">Basket Total</h4> 
          <h4 class="baskettprice">Rs.${cartcost}</h4
          </div>
          </center>
          `
    }
}

displaycart();
onloadcartno();