
// see more & see less
let seeMore=document.getElementById("see-more");
let seeLess=document.getElementById("see-less");
seeMore.addEventListener("click",showMore);
let hiddenText=document.getElementById("hiddenText")
function showMore(){
    hiddenText.style.display="block";
    seeMore.style.display="none";
    seeLess.style.display="block";
    
}
seeLess.addEventListener("click",function(){
    hiddenText.style.display="none";
    seeLess.style.display="none";
    seeMore.style.display="block";
})

// check-in check-out date with price

    let checkin=document.getElementById("check-in")
    checkin.valueAsDate=new Date();
    let checkout=document.getElementById("check-out")
    checkout.valueAsDate=new Date();
    
    let amount=document.getElementById("amount");
    let guest=document.getElementById("guest");
    
    checkin.addEventListener("change", updatePrice);
    checkout.addEventListener("change", updatePrice);
    guest.addEventListener("change", updatePrice);
    
    function updatePrice() {
        const checkinDate = new Date(checkin.value);
        const checkoutDate = new Date(checkout.value);
    
        if (checkinDate && checkoutDate && checkoutDate > checkinDate) {
            const diffTime = Math.abs(checkoutDate - checkinDate);
            const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
     let guestss=Number(guest.value)

            const price = (diffDays * 100)+((guestss*100)-100);
    amount.textContent = `$${price}`;
    // console.log(diffDays);
    
    let night=document.getElementById("night");
night.textContent=`/${diffDays} nights`
        }
        else {
            amount.textContent ="$100";
          }
        }






    