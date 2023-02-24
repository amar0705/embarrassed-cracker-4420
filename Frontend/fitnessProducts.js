let productArray = [];
let tempProductArray = [];
let productsElement = document.getElementById("products");
let searchElement = document.getElementById("search-item");
let sortElement = document.getElementById("sort-item");
function handleGetProducts() {
  const data = handleGetRequest(`${API_ENDPOINT}/products/`);
  data
    .then((res) => {
      displayProducts(res);
      productArray = res;
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

handleGetProducts();

const displayProducts = (products) => {
  productsElement.innerHTML = ``;
  if (products?.length > 0) {
    products.map((product) => {
      let outerDiv = document.createElement("div");
      outerDiv.setAttribute("class", "backpack-image-child");
      outerDiv.addEventListener("click", () => {
        localStorage.setItem("currentProduct", JSON.stringify(product));
        window.location.replace("product.html");
      });
      let childDiv = document.createElement("div");
      childDiv.setAttribute("class", "backpack-image-child-picture");
      let image = document.createElement("img");
      image.setAttribute("src", product?.banner);
      childDiv.append(image);
      let childDivText = document.createElement("div");
      childDivText.setAttribute("class", "backpack-image-child-text");
      let para = document.createElement("p");
      para.innerHTML = `<b>${product?.title}</b>`;
      let price = document.createElement("h4");
      price.innerText = `Rs. ${product?.price}`;
      childDivText.append(para, price);
      outerDiv.append(childDiv, childDivText);
      productsElement.append(outerDiv);
    });
  } else {
    productsElement.innerHTML = `<div>No Products found.</div>`;
  }
};

searchElement.addEventListener("input", (e) => {
  searchElement.value = e.target.value;
  tempProductArray = [...productArray];
  tempProductArray = tempProductArray.filter((item) =>
    item.title.toLowerCase().match(e.target.value.toLowerCase())
  );
  if (sortElement?.value === "LTH" || sortElement?.value === "HTL") {
    tempProductArray.sort((a, b) => {
      if (sortElement.value === "LTH") {
        return a.price - b.price;
      }
      if (sortElement.value === "HTL") {
        return b.price - a.price;
      }
    });
  }
  displayProducts(tempProductArray);
});

sortElement.addEventListener("change", (e) => {
  let sortProductsArray = tempProductArray?.length > 0 ? [...tempProductArray] : [...productArray];
  sortProductsArray.sort((a, b) => {
    if (e.target.value === "LTH") {
      return a.price - b.price;
    }
    if (e.target.value === "HTL") {
      return b.price - a.price;
    }
  });
  displayProducts(sortProductsArray);
});
