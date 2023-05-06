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
let priceFrom = document.getElementById("price_from")

let priceTo = document.getElementById("price_to")
let property_type = document.getElementById("property-type")
let increase_guest = document.getElementById("increase-guest")
let total_guest = document.getElementById("total-guest")
let decrease_guest = document.getElementById("decrease-guest")



let mainSection=document.getElementById("product_container")
let noofcards=document.getElementById("noofcards")
fetchdata();
// console.log({ "price": priceFrom, "priceTo": priceTo, "property": property_type })
async function fetchdata(){
    try{
        let res=await fetch("https://mock-api-hotels.onrender.com/hotels")
        let data=await res.json();
        // arr=data;
        console.log(data)
        
        display(data);
        let search=document.getElementById("search")
search.addEventListener("input",()=>{
    searchdata(data);
})

property_type.addEventListener("change",()=>{
    propertytype(data);
})
let apply_button = document.getElementById("apply-button")
apply_button.addEventListener("click",()=>{
   
    pricefilter(data);
})
        
        }
        catch(err){
                console.log(err);
            }
            }
   
    // function fetchdata() {
    //     fetch("https://mock-api-hotels.onrender.com/hotels")
    //       .then(res => res.json())
    //       .then(data => {
            
    //         console.log("Data successfully fetched:", arr);
    //         display(data);
    //         console.log(data);
           
    //       })
    //       .catch(error => {
    //         console.error("Error fetching data:", error);
    //       });
    //   }


function display(data){
mainSection.innerHTML="";
noofcards.textContent=`${data.length} Results`;
let cardlist=document.createElement("div")
cardlist.className="card-list";
mainSection.append(cardlist)
data.forEach((el)=>{
    let card=createcard(el);
    cardlist.append(card);
})
}

function createcard(el){
    let card=document.createElement("div");
    card.className="card";
    let img=document.createElement("img")
    img.src=el.image;
    img.className="hotelImg";
    let carditem=document.createElement("div")
    carditem.className="card-item";
    let h3=document.createElement("h2")
    h3.style.marginBottom ="10px";
    h3.textContent=el.name;
    let location=document.createElement("p")
    location.textContent=el.location
    
    let h1=document.createElement("h1")
    h1.textContent=`₹${el.price}`
    let span=document.createElement("span")
    span.textContent=" /Night"
    span.className="span1"
    let divprice=document.createElement("div")
    divprice.className="divprice"
    divprice.append(h1,span)
    let detail=document.createElement("button")
    detail.className="detail"
    detail.textContent="View Details"
    let book=document.createElement("button")
    book.className="book"
    book.textContent="Book Now"
    
    carditem.append(h3,location,divprice,detail,book)
    card.append(img,carditem)
    return card;


}
// console.log(arr)

// search functionaq
function searchdata(data){
     let filtered=data.filter(function(el){
            if(el.name.toUpperCase().includes(search.value.toUpperCase())==true||el.location.toUpperCase().includes(search.value.toUpperCase())==true){
                return true;
            }
            else{
                return false
            }
                })  
   
    

    display(filtered);
}

function pricefilter(data){
    console.log(data)
    let filt=data.filter((el)=>{
        // if(priceFrom.value==""){
        //     return true
        // }
 if(+(el.price)>priceFrom.value&&+(el.price)<priceTo.value){
    return true;
}
else{
    return false
}
    });
    display(filt);
    
}
function propertytype(data){
    // console.log(data)
    let filt=data.filter((el)=>{
if(el.type==property_type.value){
    return true;
}
else{
    return false
}
    });
    display(filt);
    
}
let count=1;
increase_guest.addEventListener("click",function(){
   count++;
    total_guest.textContent=count;
   
})

decrease_guest.addEventListener("click",function(){
   if(count>1){
count--;
       total_guest.textContent=count;
   }
   
})



