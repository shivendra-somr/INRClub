//    click logo to redirect to Home page
let logo = document.getElementById("logo")
logo.addEventListener("click", () => {
    window.location.href = "./index.html"
})

// reset Input of filter
function resetInputs() {
    let inputs = document.getElementsByClassName("reset-input")

}


// filtering
let priceFrom = document.getElementById("price_from").value
let priceTo = document.getElementById("price_to").value
let property_type = document.getElementById("property-type").value
let increase_guest = document.getElementById("increase-guest")
let total_guest = document.getElementById("total-guest")
let decrease_guest = document.getElementById("decrease-guest")
let apply_button = document.getElementById("apply-button")




console.log({ "price": priceFrom, "priceTo": priceTo, "property": property_type })
