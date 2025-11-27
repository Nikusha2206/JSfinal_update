document.addEventListener("DOMContentLoaded", () => {

  const burgers = Array.from(document.querySelectorAll(".burger"));
  const closes = Array.from(document.querySelectorAll(".close, #close"));
  const overlay = document.getElementById("overlay") || document.querySelector(".overlay");
  const navbar = document.querySelector(".navbar"); // 

 
  if (!overlay) return;

  
  if (burgers.length) {
    burgers.forEach((btn) =>
      btn.addEventListener("click", (e) => {
        e.preventDefault();
        overlay.classList.add("active");
        document.body.style.overflow = "hidden";
      })
    );
  }

 
  if (closes.length) {
    closes.forEach((btn) =>
      btn.addEventListener("click", (e) => {
        e.preventDefault();
        overlay.classList.remove("active");
        document.body.style.overflow = ""; 
      })
    );
  }

  
  Array.from(overlay.querySelectorAll("a")).forEach((link) =>
    link.addEventListener("click", () => {
      overlay.classList.remove("active");
      document.body.style.overflow = "";
    })
  );


  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      overlay.classList.remove("active");
      document.body.style.overflow = "";
    }
  });


  overlay.addEventListener("click", (e) => {
  
    if (e.target === overlay) {
      overlay.classList.remove("active");
      document.body.style.overflow = "";
    }
  });
});
