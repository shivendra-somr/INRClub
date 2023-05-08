//    click logo to redirect to Home page
let logo = document.getElementById("logo")
logo.addEventListener("click", () => {
    window.location.href = "./index.html"
})

// fetching username from localstorage

const user = JSON.parse(localStorage.getItem('username')) || 'User';
const userBtn = document.getElementById('join');
userBtn.innerText = user;

// reset Input of filter

let hoteldata = JSON.parse(localStorage.getItem("hotel")) || []

// filtering
let priceFrom = document.getElementById("price_from")

let priceTo = document.getElementById("price_to")
let property_type = document.getElementById("property-type")
let increase_guest = document.getElementById("increase-guest")
let total_guest = document.getElementById("total-guest")
let decrease_guest = document.getElementById("decrease-guest")

let resett = document.getElementById("resett");

let mainSection = document.getElementById("product_container")
let noofcards = document.getElementById("noofcards");

let currentPage = 1;
let rowsPerPage = 6;

//calling fetch data function
fetchdata();

let hotelData = [];

// convenience filter

const tv = document.getElementById('left1');
const swim = document.getElementById('rigth1');

const mountain = document.getElementById('left2');
const hotTub = document.getElementById('rigth2');

const view = document.getElementById('left3');
const AC = document.getElementById('rigth3');

const terrace = document.getElementById('left4');
const dogFriendly = document.getElementById('rigth4');

const wifi = document.getElementById('left5');
const outdoor = document.getElementById('rigth5');


// fetchData function
async function fetchdata(page = 1) {
    try {
        let res = await fetch("https://mock-api-hotels.onrender.com/hotels")
        let data = await res.json();
        console.log(data);
        currentPage = page;
        display(data);
        hotelData = data;
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


        tv.addEventListener("click", () => {
            tvfilter(data);
            left1.style.border = "1px solid black"

        })
        swim.addEventListener("click", () => {
            swimdata(data);
            rigth1.style.border = "1px solid black"

        })
        mountain.addEventListener("click", () => {
            mountaindata(data);
            left2.style.border = "1px solid black"
        })
        hotTub.addEventListener("click", () => {
            rigth2data(data);
            rigth2.style.border = "1px solid black"
        })
        view.addEventListener("click", () => {
            left3data(data);
            left3.style.border = "1px solid black"
        })
        AC.addEventListener("click", () => {
            rigth3data(data);
            rigth3.style.border = "1px solid black"
        })
        terrace.addEventListener("click", () => {
            left4data(data);
            left4.style.border = "1px solid black"
        })
        dogFriendly.addEventListener("click", () => {
            rigth4data(data);
            rigth4.style.border = "1px solid black"
        })
        wifi.addEventListener("click", () => {
            left5data(data);
            left5.style.border = "1px solid black"
        })

        outdoor.addEventListener("click", () => {
            rigth5data(data);
            rigth5.style.border = "1px solid black"
        })
    }
    catch (err) {
        console.log(err);
    }
}



// display function
function display(data) {
    let startIndex = (currentPage - 1) * rowsPerPage;
    let endIndex = startIndex + rowsPerPage;
    let paginatedData = data.slice(startIndex, endIndex);

    mainSection.innerHTML = "";

    // function to increaseor decrease noOfCards. of guests
    let count = 1;
    increase_guest.addEventListener("click", function () {
        count++;
        total_guest.textContent = count;
    })

    decrease_guest.addEventListener("click", function () {
        if (count > 1) {
            count--;
            total_guest.textContent = count;
        }
    })

    noofcards.textContent = `${data.length} Results`;
    let cardlist = document.createElement("div")
    cardlist.className = "card-list";

    paginatedData.forEach((el) => {
        let card = createcard(el);
        cardlist.append(card);
        mainSection.append(cardlist);
    })

    let totalPages = Math.ceil(data.length / rowsPerPage);

    let pagination = document.querySelector(".pagination");
    pagination.innerHTML = "";

    for (let i = 1; i <= totalPages; i++) {
        let link = document.createElement("a");
        link.href = "#";
        link.innerText = i;
        if (i === currentPage) {
            link.classList.add("active");
        }
        link.addEventListener("click", function () {
            currentPage = i;
            fetchdata(i);
        });
        pagination.appendChild(link);
    }
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
    h3.style.minHeight = "50px";
    h3.textContent = el.name;

    let location = document.createElement("p")
    location.textContent = el.location
    location.style.margin = "10px";

    let rating = document.createElement("p");
    rating.textContent = `★ ${el.review}`;

    let h1 = document.createElement("h1")
    h1.textContent = `₹ ${el.price}`;
    h1.style.display = "inline-block";

    let span = document.createElement("span");
    span.textContent = " /Night";
    span.className = "span1";

    let divprice = document.createElement("div")
    divprice.className = "divprice";

    divprice.append(h1, span);

    card.addEventListener('click', () => {
        window.location.href = './individual.html';
        hoteldata.push({ ...el })
        localStorage.setItem("hotel", JSON.stringify(hoteldata))
    });

    carditem.append(h3, location, rating, divprice)
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
    if (priceFrom.value == "") {
        display(data)
    }
    else {
        let filt = data.filter((el) => {
            if (+(el.price) > priceFrom.value && +(el.price) < priceTo.value) {
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

    tv.style.border = "none";
    swim.style.border = "none";
    mountain.style.border = "none";
    hotTub.style.border = "none";
    view.style.border = "none";
    AC.style.border = "none";
    terrace.style.border = "none";
    dogFriendly.style.border = "none";
    wifi.style.border = "none";
    outdoor.style.border = "none";

}

const filterBtn = document.getElementById('filter');

const filterDiv = document.getElementById('filter_div');

filterBtn.addEventListener('click', () => {
    filterDiv.style.display = filterDiv.style.display === 'none' ? 'block' : 'none';
})



// dogFriendly.addEventListener('click', () => {
//     console.log("click");
//     console.log(hotelData);
//     let results = hotelData.filter(el => {
//         return el.conveniences.includes('Pet Friendly')
//     })
//     display(results);
// })

function tvfilter(data) {
    let filtered = data.filter(function (el) {
        if (el.conveniences && el.conveniences.includes("TV")) {
            return true;
        } else {
            return false;
        }
    });
    display(filtered);
}

function swimdata(data) {
    let filtered = data.filter(function (el) {
        if (el.conveniences && el.conveniences.includes("Swimming Pool")) {
            return true;
        } else {
            return false;
        }
    });
    display(filtered);
}

function mountaindata(data) {
    let filtered = data.filter(function (el) {
        if (el.conveniences && el.conveniences.includes("Mountain View")) {
            return true;
        } else {
            return false;
        }
    });
    display(filtered);
}


function rigth2data(data) {
    let filtered = data.filter(function (el) {
        if (el.conveniences && el.conveniences.includes("Bath Tub")) {
            return true;
        } else {
            return false;
        }
    });
    display(filtered);
}

function rigth3data(data) {
    let filtered = data.filter(function (el) {
        if (el.conveniences && el.conveniences.includes("Air conditioning")) {
            return true;
        } else {
            return false;
        }
    });
    display(filtered);
}
function rigth4data(data) {
    let filtered = data.filter(function (el) {
        if (el.conveniences && el.conveniences.includes("Pet Friendly")) {
            return true;
        } else {
            return false;
        }
    });
    display(filtered);
}
function rigth5data(data) {
    let filtered = data.filter(function (el) {
        if (el.conveniences && el.conveniences.includes("Disabled")) {
            return true;
        } else {
            return false;
        }
    });
    display(filtered);
}


function left3data(data) {
    let filtered = data.filter(function (el) {
        if (el.conveniences && el.conveniences.includes("City View")) {
            return true;
        } else {
            return false;
        }
    });
    display(filtered);
}
function left4data(data) {
    let filtered = data.filter(function (el) {
        if (el.conveniences && el.conveniences.includes("Terrace")) {
            return true;
        } else {
            return false;
        }
    });
    display(filtered);
}
function left5data(data) {
    let filtered = data.filter(function (el) {
        if (el.conveniences && el.conveniences.includes("Wi-Fi")) {
            return true;
        } else {
            return false;
        }
    });
    display(filtered);
}