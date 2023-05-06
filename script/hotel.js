//    click logo to redirect to Home page
let logo = document.getElementById("logo");

logo.addEventListener("click", () => {
    window.location.href = "./index.html"
})

// reset Input of filter
function resetInputs() {
    let inputs = document.getElementsByClassName("reset-input")

}

let joinBtn = document.getElementById('join');



// filtering
let priceFrom = document.getElementById("price_from").value
let priceTo = document.getElementById("price_to").value
let property_type = document.getElementById("property-type").value
let increase_guest = document.getElementById("increase-guest")
let total_guest = document.getElementById("total-guest")
let decrease_guest = document.getElementById("decrease-guest")
let apply_button = document.getElementById("apply-button")

let mainSection = document.getElementById("product_container");


let hotelData = []

// console.log({ "price": priceFrom, "priceTo": priceTo, "property": property_type })
async function fetchdata() {
    try {
        let res = await fetch("https://mock-api-hotels.onrender.com/hotels")
        let data = await res.json()
        console.log(data)
        display(data);
        hotelData = data;
    }
    catch (err) {
        console.log(err);
    }
}
fetchdata();

function display(data) {
    mainSection.innerHTML = "";

    let cardlist = document.createElement("div")
    cardlist.className = "card-list";
    mainSection.append(cardlist)
    data.forEach((el) => {
        let card = createcard(el);
        cardlist.append(card);
    })
}

function createcard(el) {
    let card = document.createElement("div");
    card.className = "card";
    let img = document.createElement("img")
    img.src = el.image;
    img.className = "hotelImg";
    let carditem = document.createElement("div")
    carditem.className = "card-item";
    let h3 = document.createElement("h3")
    h3.textContent = el.name;
    let location = document.createElement("p")
    location.textContent = el.location
    let h1 = document.createElement("h1")
    h1.textContent = `$${el.price}`
    let detail = document.createElement("button")
    detail.className = "detail"
    detail.textContent = "View Details"
    let book = document.createElement("button")
    book.className = "book"
    book.textContent = "Book Now"

    carditem.append(h3, location, h1, detail, book)
    card.append(img, carditem)
    return card;
}

