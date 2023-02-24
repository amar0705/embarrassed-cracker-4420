const token = localStorage.getItem("access_token");
const API_ENDPOINT = "http://localhost:9090";

let user = document.getElementById("logged-user");
let logout = document.getElementById("logout");
let cart = document.getElementById("cart-badge");
let dashboard = document.getElementById("show-hide-dashboard");

if (!token) {
  dashboard.style.display = "none";
}

function getCartItems() {
  const data = handleGetRequest(`${API_ENDPOINT}/cart/?user_id=${localStorage.getItem("userId")}`);
  data
    .then((res) => {
      console.log(res);
      showCart(res);
    })
    .catch((err) => {
      window.alert("Some Error Occurred!");
      throw err;
    });
}

async function handleGetRequest(url) {
  const config = {
    headers: { "Content-Type": "application/json", Authorization: token },
  };
  const response = await fetch(url, config);
  const dataRes = await response.json();
  if (!response.ok) {
    throw new Error(`HTTP error! state: ${response.status}`);
  }
  return dataRes;
}

const showCart = (cartItems) => {
  if (cartItems && cartItems?.length > 0) {
    let totalQuantity = cartItems.reduce(function (accumulator, item) {
      return accumulator + item.quantity;
    }, 0);
    cart.innerHTML = ` <a href="cart.html"><i class="fa" style="font-size: 24px">&#xf07a;</i></a>
          <span class="badge badge-warning" id="lblCartCount"> ${totalQuantity} </span>`;
  } else {
    cart.innerHTML = `<a href="cart.html"><i class="fa" style="font-size: 24px">&#xf07a;</i></a>
          <span class="badge badge-warning" id="lblCartCount"> 0 </span>`;
  }
};

if (token) {
  getCartItems();
  user.innerHTML = `<h5> Hi! ${localStorage.getItem("name")}</h5>`;
} else {
  logout.style.display = "none";
  cart.innerHTML = `<a href="cart.html"><i class="fa" style="font-size: 24px">&#xf07a;</i></a>`;
}

logout.addEventListener("click", () => {
  localStorage.clear();
  window.location.replace("index.html");
});
