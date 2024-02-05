const products = [
    {
        id: 1,
        name: "Tunic ",
        category: "dress",
        price: " 50,000",
        img: "https://www.houseofcharizma.com/cdn/shop/products/8_1995dea0-6834-477d-9049-c3cbe3985857_1024x1024.jpg?v=1676703448",
    },
    {
        id: 2,
        name: "Oxford Shirts",
        category: "Shirt",
        price: "700",
        img: "https://d2z0lqci37nukm.cloudfront.net/media/catalog/product/cache/59d1d247a0855e7654a8594881fa0c03/g/r/grey20oxford20shirt20slim20fit2_fxbwwvifrfrj3xfx.jpg",
    },
    {
        id: 3,
        name: "Short-Sleeve Shirt",
        category: "Shirt",
        price: "499",
        img: "https://www.oshi.pk/images/variation/pink-t-shirt-for-girls-new-and-stylish-design-smile-print-summer-wear-round-neck-half-sleeves-shirt-23568-014.jpg",
    },
    {
        id: 4,
        name: "Sunglasses",
        category: "Glasses",
        price: "199.9",
        img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSYxf_JsdDs3T_ck20ZW5GCQL-hH5AXl07XTZ8afPDOYfmxUUXCs5Huh4wedmB47xi0Zm4&usqp=CAU",
    },
    {
        id: 5,
        name: "Microsoft Surface Laptop 5 Core i7 ",
        category: "Laptop",
        price: "474,999 ",
        img: "https://www.mega.pk/items_images/Microsoft+Surface+Laptop+5+Core+i7+12th+Generation+16GB+RAM+512GB+SSD+13+5+inch+Windows+11+Price+in+Pakistan%2C+Specifications%2C+Features_-_23885.webp",
    },
    {
        id: 6,
        name: "HP Notebook 15",
        category: "Laptop",
        price: " 45,999.00 ",
        img: "https://www.hshop.pk/wp-content/uploads/2019/12/HP-Notebook-15-RA008nia-Price-in-Pakistan-hshop.pk_.png",
    },
];

let productSection = document.querySelector(".product-section");

function searchItem(products, itemToSearch) {
    let item = itemToSearch.toLowerCase();
    let result = products.filter((e) => {
        let productName = e.category.toLowerCase();

        return productName.includes(item);
    });
    return result;
}


// let result = searchItem(products, "Laptop");
//   console.log(result);


function generateProductCard(product) {
    return `
    <div class="product-card">
      <img class="product-image" src="${product.img}" alt="${product.name}">
      <div class="product-info"  pid='${product.id}'  pname='${product.name}' pprice='${product.price}'  pimg='${product.img}'>
        <div class="product-title">${product.name}</div>
        <div class="product-price" >${product.price} PKR</div>
        <button class="btn" onclick="addToCart(this)">Add to cart</button>

      </div>
    </div>
  `;
}

let productCardsHTML;

productCardsHTML = products.map(generateProductCard).join("");
productSection.innerHTML = productCardsHTML;

function handleSearch(searchTerm) {
    let searchResult = searchItem(products, searchTerm);
    if (searchResult.length > 0) {
        productCardsHTML = searchResult.map(generateProductCard).join("");
        productSection.innerHTML = productCardsHTML;
    } else {
        productSection.innerHTML = `<div class='no-match'>no match Found ...</div>`;

    }
}



/////////////////////////////// add to cart /////////////////////////////
let cartItems = [];

const addToCart = (e) => {

    // console.log(e.parentNode.parentNode);
    const itemName = e.parentNode.getAttribute('pname');
    const itemPrice = e.parentNode.getAttribute('pprice');
    const itemImg = e.parentNode.getAttribute('pimg');
    const itemId = e.parentNode.getAttribute('pid');

    const existingItem = cartItems.find(product => product.pid == itemId);

    if (existingItem) {
        existingItem.quantity += 1;
        createCart(cartItems);
    } else {
        cartItems.push({ name: itemName, price: itemPrice, img: itemImg, pid: itemId, quantity: 1 });
        document.getElementById('cartLength').innerHTML = cartItems.length;
        createCart(cartItems);
    }

    // console.log(cartItems);
}


function removeCartItem(itemId) {
    const itemIndex = cartItems.findIndex(item => item.pid == itemId);

    if (itemIndex !== -1) {
        const removedItem = cartItems.splice(itemIndex, 1)[0];
        createCart(cartItems);

        document.getElementById('cartLength').innerHTML = cartItems.length;
        const total = calculateCartTotal(cartItems);
        document.getElementById('cartTotal').innerHTML = total.toFixed(2);

        // console.log(`Removed item: ${removedItem.name}`);
    }
}

function increaseQuantity(itemId) {
    const cartItem = cartItems.find(item => item.pid == itemId);
    if (cartItem) {
        cartItem.quantity += 1;
        createCart(cartItems);
    }
}

function decreaseQuantity(itemId) {
    const cartItem = cartItems.find(item => item.pid == itemId);
    if (cartItem && cartItem.quantity > 1) {
        cartItem.quantity -= 1;
        createCart(cartItems);
    }
}

function calculateCartTotal(items) {
    let total = 0;
    items.forEach((item) => {
        total += parseFloat(item.price.replace(',', '')) * item.quantity;
    });
    return total;
}

function createCart(items) {
    document.getElementById('cart-body').innerHTML = items.map((e, i) => {
        // console.log(e);

        return `

        <div class="cartItem">
          <img
            src= '${e.img}'
            alt="${e.name}"
          />
  
          <div class="cartItemDetail">
            <h3>${e.name}</h3>
            <h3>${e.price} PKR</h3>
            <b> 
            <button class="smBtn increaseBtn" onclick="increaseQuantity('${e.pid}')">+</button>
             qty: ${e.quantity}
             <button class="smBtn decreaseBtn" onclick="decreaseQuantity('${e.pid}')">-</button>
             </b>
             <button class=" removeBtn" onclick="removeCartItem('${e.pid}')">X</button>

          </div>
          </div>
  `
    })
    const total = calculateCartTotal(items);
    document.getElementById('cartTotal').innerHTML = total.toFixed(2);

}



// ------------ show and hide -----------//
function clearCart() {
   cartItems.length = 0;
   createCart(cartItems);
}
function toggleCart() {
    document.getElementById('cart').style.display = 'block'
}
function closeBtn() {
    document.getElementById('cart').style.display = 'none'
}


//------------------------- navbar --------------------------//
const mobile = document.querySelector(".mobile");
const navMenu = document.querySelector(".nav-menu");

mobile.addEventListener("click", mobileMenu);

function mobileMenu() {
    mobile.classList.toggle("active");
    navMenu.classList.toggle("active");
}

const navLink = document.querySelectorAll(".nav-link");

navLink.forEach(n => n.addEventListener("click", closeMenu));

function closeMenu() {
    hamburger.classList.remove("active");
    navMenu.classList.remove("active");
}


// //////////////////// form start  // ///////////////////
function Signup() {
  document.getElementById("myForm").style.display = "block";
}

function closeForm() {
  document.getElementById("myForm").style.display = "none";
}


// -----------------------slider -------------------//
let currentSlide = 0;
const intervalTime = 1000; // 5 seconds

function showSlide(index) {
    const slides = document.querySelector('.slides');
    const totalSlides = document.querySelectorAll('.slide').length;

    if (index >= totalSlides) {
        currentSlide = 0;
    } else if (index < 0) {
        currentSlide = totalSlides - 1;
    } else {
        currentSlide = index;
    }

    const offset = -currentSlide * 100;
    slides.style.transform = `translateX(${offset}%)`;
}

function prevSlide() {
    showSlide(currentSlide - 1);
}

function nextSlide() {
    showSlide(currentSlide + 1);
}

function autoSlide() {
    nextSlide();
}

// Set interval for auto slide
setInterval(autoSlide, intervalTime);
