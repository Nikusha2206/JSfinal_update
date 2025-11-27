const burger = document.querySelector(".burger");
const closeBtn = document.querySelector(".close");
const overlay = document.getElementById("overlay");
const navbar = document.querySelector(".navbar");

burger.addEventListener("click", () => {
  overlay.classList.add("active");
});

closeBtn.addEventListener("click", () => {
  overlay.classList.remove("active");
});

overlay.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    overlay.classList.remove("active");
  });
});

const form = document.querySelector("form");
form.addEventListener("submit", (e) => {
  e.preventDefault();
  alert("Thank you for your message! We will get back to you soon.");
  form.reset();
});
