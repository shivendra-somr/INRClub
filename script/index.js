//   FAQs Section

var acc = document.getElementsByClassName("accordion");
var i;

for (i = 0; i < acc.length; i++) {
    acc[i].addEventListener("click", function () {

        this.classList.toggle("active");

        var panel = this.nextElementSibling;
        if (panel.style.display === "block") {
            panel.style.display = "none";
        } else {
            panel.style.display = "block";
        }
    });
}


// join member click event

let join_Member = document.getElementById("join");

join_Member.addEventListener("click", () => {
    window.location.href = "./hotel.html"
})
let logo = document.getElementById("logo")
logo.addEventListener("click", () => {
    window.location.href = "./index.html"
})