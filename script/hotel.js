//    click logo to redirect to Home page
let logo = document.getElementById("logo")
logo.addEventListener("click", () => {
    window.location.href = "./index.html"
})

// reset Input of filter

let hoteldata=JSON.parse(localStorage.getItem("hotel"))||[]

// filtering
let priceFrom = document.getElementById("price_from")

let priceTo = document.getElementById("price_to")
let property_type = document.getElementById("property-type")
let increase_guest = document.getElementById("increase-guest")
let total_guest = document.getElementById("total-guest")
let decrease_guest = document.getElementById("decrease-guest")

let resett = document.getElementById("resett")

let mainSection = document.getElementById("product_container")
let noofcards = document.getElementById("noofcards")
fetchdata();






let TV=document.getElementById("TV")
let swim=document.getElementById("swim")
let mountain=document.getElementById("mountain")
let left1=document.getElementById("left1")
let left2=document.getElementById("left2")
let left3=document.getElementById("left3")
let left4=document.getElementById("left4")
let left5=document.getElementById("left5")
let rigth1=document.getElementById("rigth1")
let rigth2=document.getElementById("rigth2")
let rigth3=document.getElementById("rigth3")
let rigth4=document.getElementById("rigth4")





// fetchData function
async function fetchdata() {
    try {
        let res = await fetch("https://mock-api-hotels.onrender.com/hotels")
        let data = await res.json();
        console.log(data)
        display(data);
        let search = document.getElementById("search")

        // search addEventListener
        search.addEventListener("input", () => {
            searchdata(data);
        })

// property_type addEventListener
        property_type.addEventListener("change", () => {
            propertytype(data);
        })

        // apply_button addEventListener for filter data by price
        let apply_button = document.getElementById("apply-button")
        apply_button.addEventListener("click", () => {

            pricefilter(data);
        })

        // reset input addEventListener
        resett.addEventListener("click", () => {
            resetInputs(data);
        })

        TV.addEventListener("click",()=>{
            tvfilter(data);
            left1.style.border="1px solid black"
           
        })
        swim.addEventListener("click",()=>{
            swimdata(data);
            rigth1.style.border="1px solid black"

        })
        mountain.addEventListener("click",()=>{
            mountaindata(data);
           left2.style.border="1px solid black"
        })
        rigth2.addEventListener("click",()=>{
            rigth2data(data);
            rigth2.style.border="1px solid black"
        })
        left3.addEventListener("click",()=>{
            left3data(data);
            left3.style.border="1px solid black"
        })
        left4.addEventListener("click",()=>{
            left4data(data);
            left4.style.border="1px solid black"
        })
        left5.addEventListener("click",()=>{
            left5data(data);
            left5.style.border="1px solid black"
        })
        rigth3.addEventListener("click",()=>{
            rigth3data(data);
            rigth3.style.border="1px solid black"
        })
        rigth4.addEventListener("click",()=>{
            rigth4data(data);
            rigth4.style.border="1px solid black"
        })



    }
    catch (err) {
        console.log(err);
    }
}



// display function
function display(data) {
    mainSection.innerHTML = "";

  

    // function to increaseor decrease noofcards. of guests
    let count = 1;
    increase_guest.addEventListener("click", function () {
        count++;
        total_guest.textContent = count;})

    decrease_guest.addEventListener("click", function () {
        if (count > 1) {
            count--;
            total_guest.textContent = count;
        }})

    noofcards.textContent = `${data.length} Results`;
    let cardlist = document.createElement("div")
    cardlist.className = "card-list";
    mainSection.append(cardlist)
    data.forEach((el) => {
        let card = createcard(el);
        cardlist.append(card);
    })
}

// createcard function 
function createcard(el) {
    let card = document.createElement("div");
    card.className = "card";
    let img = document.createElement("img")
    img.src = el.image;
    img.className = "hotelImg";
    let carditem = document.createElement("div")
    carditem.className = "card-item";
    let h3 = document.createElement("h3")
    h3.style.marginBottom = "10px";
    h3.style.fontSize="22px";
    h3.style.fontWeight="700"
    h3.textContent = el.name;
    let location = document.createElement("p")
    location.textContent = el.location

     let rating=document.createElement("p")

    

     rating.textContent=`★ ${el.review}`;
    
     

    let h1 = document.createElement("h1")
    h1.textContent = `₹${el.price}`
    let span = document.createElement("span")
    span.textContent = " /Night"
    span.className = "span1"
    let divprice = document.createElement("div")
    divprice.className = "divprice"
    divprice.append(h1, span)
    let detail = document.createElement("button")
    detail.className = "detail"
    detail.textContent = "View Details"

    // detail.addEventListener("click", () => {
    //     window.location.href = "./individual.html"
    //     hoteldata.push({...el})
    //     localStorage.setItem("hotel",JSON.stringify(hoteldata))
    // })
    // let book = document.createElement("button")
    // book.className = "book"
    // book.textContent = "Book Now"
    // book.addEventListener("click", () => {
    //     window.location.href = "./payment.html"
    // })

    card.addEventListener("click", () => {
        window.location.href = "./individual.html"
        hoteldata.push({...el})
        localStorage.setItem("hotel",JSON.stringify(hoteldata))
    })
    carditem.append(h3, location, rating,divprice)
    card.append(img, carditem)
    return card;


}


// search function
function searchdata(data) {
    let filtered = data.filter(function (el) {
        if (el.name.toUpperCase().includes(search.value.toUpperCase()) == true || el.location.toUpperCase().includes(search.value.toUpperCase()) == true) {
            return true;
        }
        else {
            return false
        }
    })



    display(filtered);
}

// pricefilter function 
function pricefilter(data) {
    // console.log(data)
    if(priceFrom.value==""){
        display(data)
    }
    else{
        let filt = data.filter((el) => {
            if ((el.price) > +(priceFrom.value) && (el.price) < +(priceTo.value)) {
                return true;
            }
            else {
                return false
            }
        });
        display(filt);
    }
   

}

// property_type filter function 
function propertytype(data) {
    let filt = data.filter((el) => {
        if (el.type == property_type.value) {
            return true;
        }
        else {
            return false
        }
    });
    display(filt);

}


// reset input function
function resetInputs(data) {
   priceFrom.value = ""
    priceTo.value = ""
    property_type.value = ""
    total_guest.textContent = 1;
    display(data);
    
        left1.style.border="none"
        rigth1.style.border="none"
        left2.style.border="none"
        rigth2.style.border="none"
        rigth3.style.border="none"
        rigth4.style.border="none"
        left3.style.border="none"
        left4.style.border="none"
        left5.style.border="none"

   

}


function tvfilter(data){
    let filtered = data.filter(function (el) {
        if (el.conveniences && el.conveniences.includes("TV")) {
            return true;
        } else {
            return false;
        }
    });
    display(filtered);
}

function swimdata(data){
    let filtered = data.filter(function (el) {
        if (el.conveniences && el.conveniences.includes("Swimming Pool")) {
            return true;
        } else {
            return false;
        }
    });
    display(filtered);
}

function mountaindata(data){
    let filtered = data.filter(function (el) {
        if (el.conveniences && el.conveniences.includes("Mountain View")) {
            return true;
        } else {
            return false;
        }
    });
    display(filtered);
}


function rigth2data(data){
    let filtered = data.filter(function (el) {
        if (el.conveniences && el.conveniences.includes("Bath Tub")) {
            return true;
        } else {
            return false;
        }
    });
    display(filtered);
}

function rigth3data(data){
    let filtered = data.filter(function (el) {
        if (el.conveniences && el.conveniences.includes("Air conditioning")) {
            return true;
        } else {
            return false;
        }
    });
    display(filtered);
}
function rigth4data(data){
    let filtered = data.filter(function (el) {
        if (el.conveniences && el.conveniences.includes("Pet Friendly")) {
            return true;
        } else {
            return false;
        }
    });
    display(filtered);
}


function left3data(data){
    let filtered = data.filter(function (el) {
        if (el.conveniences && el.conveniences.includes("City View")) {
            return true;
        } else {
            return false;
        }
    });
    display(filtered);
}
function left4data(data){
    let filtered = data.filter(function (el) {
        if (el.conveniences && el.conveniences.includes("Terrace")) {
            return true;
        } else {
            return false;
        }
    });
    display(filtered);
}
function left5data(data){
    let filtered = data.filter(function (el) {
        if (el.conveniences && el.conveniences.includes("Wi-Fi")) {
            return true;
        } else {
            return false;
        }
    });
    display(filtered);
}

