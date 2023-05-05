//     // Add Hotel
//     let hotel_name= document.getElementById("hotel-name")



// function fetchData(){
//     fetch("https://mock-api-hotels.onrender.com/hotels")
//     .then(res=>res.json())
//     .then((data)=>{console.log(data)})
//     .catch((err)=>{console.log(err)})
// }
// fetchData()

// console.log("hai")

    // ADD Hotels
    let hotelTitleInput = document.getElementById("hotel-name");
    let hotelImageInput = document.getElementById("hotel-image");
    let hotelLocationInput = document.getElementById("hotel-location");
    let hotelDescriptionInput = document.getElementById("hotel-desc");
    let hotelPriceInput = document.getElementById("hotel-price");
    let hotelCreateBtn = document.getElementById("add-hotel");
    // Update Hotels

    let updateHotelIdInput = document.getElementById("update-hotel-id");
    let updateHotelTitleInput = document.getElementById("update-hotel-name");
    let updateHotelImageInput = document.getElementById("update-hotel-image");
    let updateHotelLocationInput = document.getElementById(
      "update-hotel-location"
    );
    let updateHotelDescriptionInput =
      document.getElementById("update-hotel-desc");
    let updateHotelPriceInput = document.getElementById("update-hotel-price");
    let updateHotelBtn = document.getElementById("update-hotel");
    

    // sorting
    let sortAtoZBtn = document.getElementById("sort-price-low-to-high");
    let sortZtoABtn = document.getElementById("sort-price-high-to-low");

    let sortRatingAtoZBtn = document.getElementById("sort-rating-low-to-high");
    let sortRatingztoABtn = document.getElementById("sort-rating-high-to-low");

    //Update price
    let updatePriceHotelId = document.getElementById("update-score-hotel-id");
    let updatePriceHotelPrice = document.getElementById(
      "update-score-hotel-price"
    );
    let updatePriceHotelPriceButton =
      document.getElementById("update-score-hotel");

    let mainSection = document.getElementById("product_container");

    let count = document.getElementById("count");
    let hotelData = [];
    fetchdata();
    function fetchdata() {
      fetch("https://mock-api-hotels.onrender.com/hotels")
        .then(function (res) {
          return res.json();
        })
        .then(function (data) {
          console.log(data);
          appendData(data);
        })
        .catch(function (error) {
          console.log(error);
        });
    }

    // appending the data
    function appendData(data) {
      mainSection.innerHTML = "";
      count.textContent = `${data.length} Results`;
      let cardlist = document.createElement("div");
      cardlist.className = "card-list";
      //   cardlist.style.display = "grid";
      //   cardlist.style.gridTemplateColumns = "repeat(3,fr)";
      mainSection.append(cardlist);

      data.forEach(function (item) {
        cardlist.append(cretecard(item));
      });
    }

    // creating card;
    /* 
div card = id=>card;
card=> img,title(name),location,discription,price,edit,delete

*/

    function cretecard(item) {
      let card = document.createElement("div");
      card.className = "card";
      card.setAttribute("data-id", item.id);

      let cardimg = document.createElement("div");
      cardimg.className = "card-img";

      let img = document.createElement("img");
      img.src = item.image;
      img.setAttribute("alt", "book");
      cardimg.append(img);

      let cardbody = document.createElement("div");
      cardbody.className = "card-body";

      let h4 = document.createElement("h2");
      h4.className = "card-title";
      h4.textContent = item.name;

      let loc = document.createElement("h3");
      loc.className = "location";
      loc.textContent = item.location;

      let p = document.createElement("p");
      p.className = "card-desc";
      p.textContent = item.description;

      let p3 = document.createElement("h3");
      p3.className = "card-price";
      p3.textContent = `$${item.price}`;

      let a = document.createElement("button");
      a.className = "card-link";
      a.setAttribute("data-id", item.id);
      a.href = "#";
      a.textContent = "Edit";
      a.addEventListener("click", function () {
        edit(item.id);
      });

      let btn = document.createElement("button");
      btn.className = "card-button";
      btn.setAttribute("data-id", item.id);
      btn.textContent = "Delete";
      btn.addEventListener("click", function () {
        let bookId = item.id;
        fetch(`https://mock-api-hotels.onrender.com/hotels/${item.id}`, {
          method: "DELETE",
        })
          .then(function (res) {
            return res.json();
          })
          .then(function (data) {
            location.reload();
            console.log(data);
            appendData(data);
          })
          .catch(function (error) {
            console.log(error);
          });
      });

      cardbody.append(h4, loc, p, p3, a, btn);

      card.append(cardimg, cardbody);
      return card;
    }

    // Edit function here

    function edit(id) {
     
    }
    updateHotelBtn.addEventListener("click",function(id){
        fetch(`https://mock-api-hotels.onrender.com/hotels/${id}`, {
        method: "PUT",
        body: JSON.stringify({
          name: updateHotelTitleInput.value,
          location: updateHotelLocationInput.value,
          description: updateHotelDescriptionInput.value,
          image: updateHotelImageInput.value,
          price: updateHotelPriceInput.value,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then(function (res) {
          return res.json();
        })
        .then(function (data) {
          location.reload();

          console.log(data);
          appendData(data);
        })
        .catch(function (error) {
          console.log(error);
        });
      })

    // Adding the hotel

    hotelCreateBtn.addEventListener("click", AddHotel);
    function AddHotel() {
      fetch(`https://mock-api-hotels.onrender.com/hotels`, {
        method: "POST",
        body: JSON.stringify({
          name: hotelTitleInput.value,
          location: hotelLocationInput.value,
          description: hotelDescriptionInput.value,
          image: hotelImageInput.value,
          price: hotelPriceInput.value,
        }),
        headers: {
          "Content-type": "application/json",
        },
      })
        .then(function (res) {
          return res.json();
        })
        .then(function (data) {
          location.reload();

          console.log(data);
          appendData(data);
        })
        .catch(function (error) {
          console.log(error);
        });
    }

    // sorting Part

    sortAtoZBtn.addEventListener("click", sort1);
    function sort1() {
      fetch(
        `https://mock-api-hotels.onrender.com/hotels?_sort=price&_order=asc`
      )
        .then(function (res) {
          return res.json();
        })
        .then(function (data) {
          console.log(data);
          appendData(data);
        })
        .catch(function (error) {
          console.log(error);
        });
    }

    sortZtoABtn.addEventListener("click", sort2);
    function sort2() {
      fetch(
        `https://mock-api-hotels.onrender.com/hotels?_sort=price&_order=desc`
      )
        .then(function (res) {
          return res.json();
        })
        .then(function (data) {
          console.log(data);
          appendData(data);
        })
        .catch(function (error) {
          console.log(error);
        });
    }

    // Search function
    //     let country = document.querySelector("#country")
    // country.addEventListener("input", function () {
    //     let searchValue = country.value.trim().toLowerCase();
    //     let results = document.querySelector(".results")
    //     if (searchValue == "") {
    //         display(travelodata);
    //         results.style.display = "none"
    //     } else {
    //         let temp = travelodata.filter(function (el) {
    //             return el.country.trim().toLowerCase().includes(searchValue);
    //         });
    //         results.style.display = "block"
    //         let h1 = document.querySelector("#resH1");
    //         h1.innerText = ${temp.length} Destinations Found
    //         display(temp);
    //     }
    // })