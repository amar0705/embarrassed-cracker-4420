let productsElement = document.getElementById("products");
let footerElement = document.getElementById("footer-cart");
let body = document.getElementById("show-body");

let cartProducts = [];
if (token) {
  getCartItems2();
} else {
  body.style.display = "none";
  window.location.replace("login.html");
  window.alert("can't access this!! Please Login First");
}

function getCartItems2() {
  const data = handleGetRequest(`${API_ENDPOINT}/cart/?user_id=${localStorage.getItem("userId")}`);
  data
    .then((res) => {
      displayCart(res);
      cartProducts = res;
    })
    .catch((err) => {
      window.alert("Some Error Occurred!");
      throw err;
    });
}

const displayCart = (products) => {
  if (products?.length > 0) {
    let totalPrice = products.reduce(function (accumulator, item) {
      return accumulator + item.price;
    }, 0);
    products.map((product) => {
      let outerDiv = document.createElement("div");
      outerDiv.setAttribute("class", "backpack-image-child");
      //   outerDiv.addEventListener("click", () => {
      //     localStorage.setItem("currentProduct", JSON.stringify(product));
      //     window.location.replace("product.html");
      //   });
      let childDiv = document.createElement("div");
      childDiv.setAttribute("class", "backpack-image-child-picture");
      let image = document.createElement("img");
      image.setAttribute("src", product?.banner);
      childDiv.append(image);
      let childDivText = document.createElement("div");
      childDivText.setAttribute("class", "backpack-image-child-text");
      let para = document.createElement("p");
      para.innerHTML = `<b>${product?.title}</b>`;
      let bottomDiv = document.createElement("div");
      bottomDiv.setAttribute("class", "bottom-quantity-cart");
      let price = document.createElement("h4");
      price.innerText = `Rs. ${product?.price}`;
      let quantity = document.createElement("h4");
      quantity.innerText = `Quantity: ${product?.quantity}`;
      bottomDiv.append(price, quantity);
      childDivText.append(para, bottomDiv);
      outerDiv.append(childDiv, childDivText);
      productsElement.append(outerDiv);
    });
    footerElement.innerHTML = `<div>Final Amount: Rs. ${totalPrice}</div>
    <div><b><button onclick="handleCheckout()">Checkout</button></b></div>`;
  } else {
    productsElement.innerHTML = `<h2>No Items in the cart</h2>`;
  }
};

const handleCheckout = () => {
  if (cartProducts?.length > 0) {
    let totalPrice = cartProducts.reduce(function (accumulator, item) {
      return accumulator + item.price;
    }, 0);
    localStorage.setItem("totalPrice", totalPrice);
    window.location.replace("checkout.html");
  }
};
