// Gọi dữ liệu của sản phẩm có id (Nằm trên url)
// Từ Local Storage ra
function openNav() {
  document.getElementById("mySidenav").style.width = "250px";
  document.getElementById("main").style.marginLeft = "250px";
}

function closeNav() {
  document.getElementById("mySidenav").style.width = "0";
  document.getElementById("main").style.marginLeft = "";
}

// Và fill thông tin của sản phẩm đó vào trong các trường input

// B1: Lấy ra id nằm trên url
let id = window.location.search.split("=")[1];
let productDetail = document.getElementById("product-detail");

// B2: Lấy ra sản phẩm nằm trong local Storage
let products = JSON.parse(localStorage.products);

let product = products.find(function (e, i) {
  return e.id === id;
});

productDetail.id.value = product.id;
productDetail.brand.value = product.brand;
productDetail.name.value = product.name;
productDetail.price.value = product.price;
productDetail.rating.value = product.rating;
productDetail.sale.value = product.sale;
productDetail.sold.value = product.sold;
productDetail.status.value = product.status;
productDetail.weight.value = product.weights;
productDetail.description.value = product.description;

productDetail.onsubmit = function (e) {
  e.preventDefault();

  // Cập nhật lại thông tin đang có trong ô input vào sản phẩm nằm trong localstorage

  let answer = confirm("Bạn có chắc chắn muốn cập nhật không");
  if (answer) {
    let index = products.indexOf(product); // Chỉ số của sản phẩm nằm trong local Storage

    products[index] = {
      ...products[index],
      brand: productDetail.brand.value,
      name: productDetail.name.value,
      price: productDetail.price.value,
      rating: productDetail.rating.value,
      sale: productDetail.sale.value,
      sold: productDetail.sold.value,
      status: productDetail.status.value,
      weights:
        productDetail.weight.value === ""
          ? []
          : productDetail.weight.value.split(","),
      description: productDetail.description.value,
    };
    localStorage.products = JSON.stringify(products);
    alert("Cập nhật sản phẩm thành công");
  }
};
