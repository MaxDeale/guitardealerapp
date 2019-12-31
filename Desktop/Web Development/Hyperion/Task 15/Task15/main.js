// SHOPPING CART
let cartItems = [];
let total = 0;
let cartCount = 0;

// session storage load check

function myLoad() {
  if (sessionStorage.getItem("hasCodeRunBefore") === null) {
    // if page hasnt been loaded , set the array of cart items to session storage
    sessionStorage.setItem("cart", JSON.stringify(cartItems));
    sessionStorage.setItem("totals", total);
    sessionStorage.setItem("hasCodeRunBefore", true);
  } else {
    // otherwise set the array to whatever is in the session storage
    cartItems = JSON.parse(sessionStorage.getItem("cart"));
  }
}

// Create constructor function to make fruit items for cart

function fruit(name, price, deliveryMethod, hasCoupon) {
  this.fruitName = name;
  this.fruitPrice = price;
  this.fruitDelivery = deliveryMethod;
  this.fruitCoupon = hasCoupon;
}

// INCREMENT COUNT

function incrementCart() {
  cartCount++;
}

// DECREMENT COUNT
function decrementCart() {
  if ((cartCount = 0)) {
    cartCount = cartCount;
  } else {
    cartCount--;
  }
}
// RESET INFO

function resetInfo() {
  fruitinfo = [];
  firstinfos = [];
}

// ADD TO CART
let newInfo;
let fruitinfo = [];
let itemName;
let itemPrice;
let firstinfos = [];
let buttonCLicked;

function addItem() {
  incrementCart();
  updateTotal();
  // GET INFO FUNCTION
  // Code to add event listeners to all of the "add to cart" buttons to get the correct information about the specific fruit clicked on

  this.getinfo = function () {
    let buttons = [document.querySelectorAll(".btn-primary")];

    buttons.forEach(function () {
      this.addEventListener("click", function (event) {
        buttonCLicked = event.target;
        itemName =
          buttonCLicked.parentElement.firstChild.nextElementSibling.innerHTML;
        itemPrice =
          buttonCLicked.parentElement.firstChild.nextElementSibling
          .nextElementSibling.firstChild.nextElementSibling.innerHTML;

        this.firstInform = function () {
          firstinfos.push(itemName);
          firstinfos.push(itemPrice);
          return firstinfos;
        };
        firstInform();
        // console.log(firstinfos);
      });
    });

    let useCoupon = "";
    let delivery = "";
    // display prompts to add coupon and delivery info
    let couponOption = prompt("Would you like to use a -R10 coupon? (yes/no)");
    if (couponOption === "yes" || couponOption === "Yes") {
      // If the user uses a coupon , minus 10 from the total and use yes as the coupon info
      total = total - 10;
      useCoupon = "Yes";
    } else {
      useCoupon = "No";
    }
    let deliveryOption = prompt(
      "Enter 1 for overnight delivery(+R100), or 2 for Express Delivery(+R50)"
    );
    if ((deliveryOption = 1)) {
      total = total + 100;
      delivery = "Overnight";
    } else if ((deliveryOption = 2)) {
      total = total + 50;
      delivery = "Express";
    } else {
      delivery = "no delivery";
    }
    // console.log(fruitinfo);

    newInfo = new fruit(firstinfos[0], firstinfos[1], delivery, useCoupon);

    fruitinfo.push(newInfo.fruitName);
    fruitinfo.push(newInfo.fruitPrice);
    fruitinfo.push(newInfo.fruitDelivery);
    fruitinfo.push(newInfo.fruitCoupon);

    // when add to cart is clicked, an alert should display the current total
    alert(
      "Your current total is R" +
      total +
      ". Please click on 'View Cart' to see your current cart items."
    );

    // add the item into session storage
    cartItems.push(newInfo);
    sessionStorage.setItem("cart", JSON.stringify(cartItems));

    return fruitinfo;
  };

  // when a user clicks on "add to cart", the info from the html page must be sent as info to create an object using the constructor function

  getinfo();

  // add the item price to the total amount
  // total = total + fruitinfo[1];

  sessionStorage.setItem("totals", total);

  // display a new row on bootstrap table for new shopping item

  var table = document.getElementById("tableInsert");
  table.innerHTML +=
    "<tr><th scope= " +
    "'row'>" +
    cartCount +
    "</th>" +
    "<td>" +
    fruitinfo[0] +
    "</td>  " +
    " <td>" +
    fruitinfo[1] +
    "</td>" +
    " <td>" +
    fruitinfo[2] +
    "</td>" +
    "  <td>" +
    fruitinfo[3] +
    "</td>" +
    " <td><i onclick = 'removeItem()' class = 'fas fa-times'> </i></td > " +
    "</tr>";

  resetInfo();
}

// UPDATE TOTAL CART AMOUNT

function updateTotal() {
  // reset the amount shown in the total
  let totalShow = document.querySelector(".totalDisplay");

  totalShow.innerHTML = total;
}

// REMOVE ITEM
function removeItem() {
  this.removeTotal = function () {
    // take the price of the deleted item and detract from total
    let removeButtons = document.querySelectorAll(".fa-times");
    removeButtons.forEach(function () {
      this.addEventListener("click", function (e) {
        let del = e.target;
        console.log(del);
        let delPrice = del.previousElementSibling.previousElementSibling;
        console.log(delPrice);
        total = total - delprice;
      });
    });
  };

  // remove the row from the bootstrap table
  let cartRowAdd = document.getElementById("tableInsert");
  cartRowAdd.removeChild(cartRowAdd.lastChild);

  decrementCart();
  removeTotal();
  updateTotal();
}

// CHECKOUT

function checkout() {
  sessionStorage.setItem("totals", total);
  alert(
    "Thank you, your order has been processed. Your Total is R" +
    total +
    ". Invoice Number:" +
    ID()
  );
}

// GENERATE RANDOM ID FOR CHECKOUT

let idString;

function ID() {
  idString =
    "INV" +
    Math.random()
    .toString(36)
    .substr(2, 9);
  return idString;
}

// JQUERY

$(document).ready(function () {
  $("body").on("load", function () {
    $("#main-nav").animate({
      height: "200px"
    }, "slow");

    $(".popupButton").on("click", function () {

      (".popuptext").fadeToggle("slow");
      (".popup").fadeToggle("slow");
    });

    $(".card").animate({
        opacity: 0.5
      },
      "slow"
    );
  });
});

// When the user clicks on <div>, open the popup
function popUp() {
  var popup = document.getElementById("myPopup");
  popup.classList.toggle("show");
}

function popUp2() {
  var popup = document.getElementById("myPopup2");
  popup.classList.toggle("show");
}

function popUp3() {
  var popup = document.getElementById("myPopup3");
  popup.classList.toggle("show");
}

function popUp4() {
  var popup = document.getElementById("myPopup4");
  popup.classList.toggle("show");
}

function popUp5() {
  var popup = document.getElementById("myPopup5");
  popup.classList.toggle("show");
}

function popUp6() {
  var popup = document.getElementById("myPopup6");
  popup.classList.toggle("show");
}

function popUp7() {
  var popup = document.getElementById("myPopup7");
  popup.classList.toggle("show");
}

function popUp8() {
  var popup = document.getElementById("myPopup8");
  popup.classList.toggle("show");
}

function popUp9() {
  var popup = document.getElementById("myPopup9");
  popup.classList.toggle("show");
}

function popUp10() {
  var popup = document.getElementById("myPopup10");
  popup.classList.toggle("show");
}

function popUp11() {
  var popup = document.getElementById("myPopup11");
  popup.classList.toggle("show");
}

function popUp12() {
  var popup = document.getElementById("myPopup12");
  popup.classList.toggle("show");
}