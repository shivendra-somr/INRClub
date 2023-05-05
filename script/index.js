let aboutus = document.querySelector("#about")
let perks = document.querySelector("#container1")
let FAQs = document.querySelector("#faqs")

let aboutusSection = document.querySelector(".heading")
let perksSection = document.querySelector('#container1')
let faqSection = document.querySelector('.faq')

function scrollToSection(section) {
    section.scrollIntoView({ behavior: "smooth" });
}

// Attach event listeners to the buttons
aboutus.addEventListener('click', function () {
    scrollToSection(aboutusSection);
});

perks.addEventListener('click', function () {
    scrollToSection(perksSection);
});
FAQs.addEventListener('click', function () {
    scrollToSection(faqSection);
});


// join member click event

let join_Member = document.getElementById("join");
let joinSection = document.getElementById('joinSection');

join_Member.addEventListener("click", () => {
    scrollToSection(joinSection);
})

let logo = document.getElementById("logo");

logo.addEventListener("click", () => {
    window.location.href = "./index.html"
})

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

// Join Section

const join = document.getElementById('joinM');

join.addEventListener('click', ()=>{
    console.log('join')
    window.location.href = "./login.html"
})
