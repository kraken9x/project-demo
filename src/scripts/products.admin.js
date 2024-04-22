function openNav() {
  document.getElementById("mySidenav").style.width = "250px";
  document.getElementById("main").style.marginLeft = "250px";
}

function closeNav() {
  document.getElementById("mySidenav").style.width = "0";
  document.getElementById("main").style.marginLeft = "";
}

function truncate(str, n, useWordBoundary) {
  if (str.length <= n) {
    return str;
  }
  const subString = str.slice(0, n - 1); // the original check
  return (
    (useWordBoundary
      ? subString.slice(0, subString.lastIndexOf(" "))
      : subString) + "&hellip;"
  );
}

const products = JSON.parse(localStorage.products);
const tbody = document.getElementById("tbody");

function render() {
  tbody.innerHTML = "";
  for (let index in products) {
    console.log(products[index].weights);
    // []

    let buttonGroup = products[index].weights.reduce((pre, cur) => {
      return (pre += `<button class="btn btn-outline-dark btn-small">${cur}</button>`);
    }, "");

    // `<button> 50 gram </button> <button> 100 gram </button>`

    let row = `<tr>
                      <th scope="row">${+index + 1}</th>
                      <td>${products[index].id}</td>
                      <td>${products[index].brand}</td>
                      <td>${products[index].name}</td>
                      <td>${products[index].price}</td>
                      <td>${products[index].rating}</td>
                      <td>${products[index].sale}</td>
                      <td>${products[index].sold}</td>
                      <td>${products[index].status}</td>
                      <td>${buttonGroup}</td>
                      <td>${truncate(
                        products[index].description,
                        30,
                        "..."
                      )}</td>
                      <td>
                          <button class="btn btn-danger delete-${
                            products[index].id
                          }">
                              Delete
                          </button>
                          <a href="/admin/products-detail.html?id=${
                            products[index].id
                          }" class="btn btn-secondary">
                              View
                          </a>
                      </td>
                  </tr>`;
    tbody.innerHTML = tbody.innerHTML + row;
  }
}

render();
// Delete sản phẩm

// B1: Tìm ra id của sản phẩm vừa được ấn delete
// Tiến hành xoá sản phẩm đó khỏi localstorage
tbody.onclick = function (e) {
  if (e.target.classList.contains("btn-danger")) {
    let id = e.target.classList[2].split("-")[1];
    // Để có thể lấy ra được id -> Di chuyển giữa các phần tử HTML
    // rất nhiều
    // .parentElement , .children ...

    let findIndex = products.findIndex(function (e) {
      return e.id === id;
    });

    products.splice(findIndex, 1);
    localStorage.products = JSON.stringify(products);

    render();
  }
};

// B2: Tiến hành In lại (Re-render) các phần tử sản phẩm có trong Local Storage
