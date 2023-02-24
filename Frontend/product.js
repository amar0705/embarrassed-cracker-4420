let cartContainer = document.getElementById("cart-section");
let product = JSON.parse(localStorage.getItem("currentProduct"));

const createCartDisplay = () => {
  cartContainer.innerHTML = `<div class="images-cart">
        <div class="swiper">
          <div class="swiper-wrapper">
            <div class="swiper-slide">
              <img
                class="image-cart"
                src=${product?.banner}
                alt=""
              />
            </div>
          </div>
          <div class="swiper-button-next"></div>
          <div class="swiper-button-prev"></div>
          <div class="swiper-pagination"></div>
        </div>
      </div>
      <div class="info-cart">
        <h1>${product?.title}</h1>
        <h2 class="price">Rs. ${product?.price}.</h2>
        <p class="pick">Colors</p>
        <div class="colors">
          <input name="colorPicker" class="color" id="blue" value="black" type="radio" />
          <input name="colorPicker" class="color" id="ivory" value="black" type="radio" />
        </div>
        <p class="pick">Size</p>
        <ul class="sizes">
          <li class="size">xs</li>
          <li class="size">s</li>
          <li class="size">m</li>
          <li class="size">l</li>
        </ul>
        <button class="cart" onclick="addToCart()"><b>Add To Cart</b></button>
        <p class="description">
          ${product?.description}
        </p>
      </div>`;
};

if (product?._id) {
  createCartDisplay();
}

function addToCart() {
  if (token) {
    handleCart();
  } else {
    window.location.replace("login.html");
  }
}

function handleCart() {
  const bodyData = {
    productId: product?._id,
    userId: localStorage.getItem("userId"),
    title: product?.title,
    description: product?.description,
    banner: product?.banner,
    link: "",
    price: product?.price,
    quantity: 1,
  };
  const data = handlePostRequest(`${API_ENDPOINT}/cart/create`, bodyData);
  data
    .then((res) => {
      window.alert(`${res?.message}`);
      setTimeout(() => {
        getCartItems();
      }, 2000);
      window.location.replace("cart.html");
    })
    .catch((err) => {
      window.alert("Something went wrong");
      throw err;
    });
}

async function handlePostRequest(url, body) {
  const config = {
    method: "POST",
    headers: { "Content-Type": "application/json", Authorization: token },
    body: JSON.stringify(body),
  };
  const response = await fetch(url, config);
  const dataRes = await response.json();
  if (!response.ok) {
    throw new Error(`HTTP error! state: ${response.status}`);
  }
  return dataRes;
}
