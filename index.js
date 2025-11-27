window.onload = async () => {
  const response = await fetch(
    "https://www.google-analytics.com/mp/collect?measurement_id=G-03XW3FWG7L&api_secret=Px06eCtvQLS0hVSB2MPj_g",
    { method: "POST" }
  );
};




window.addEventListener("scroll", function () {
  const header = document.querySelector("header");
  if (window.scrollY > 100) {
    header.classList.add("scrolled");
  } else {
    header.classList.remove("scrolled");
  }
});

const scrollToTopBtn = document.getElementById("scrollToTop");

window.addEventListener("scroll", function () {
  if (window.scrollY > 300) {
    scrollToTopBtn.style.display = "flex";
  } else {
    scrollToTopBtn.style.display = "none";
  }
});

scrollToTopBtn.addEventListener("click", function () {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
});

const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px",
};

const observer = new IntersectionObserver(function (entries) {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
    }
  });
}, observerOptions);

document.querySelectorAll(".section-animate").forEach((section) => {
  observer.observe(section);
});

const multiselectInput = document.querySelector(".multiselect-input");
const multiselectDropdown = document.getElementById("multiselectDropdown");
const selectedItemsContainer = document.getElementById("selectedItems");
let selectedItems = [];

multiselectInput.addEventListener("click", function () {
  multiselectDropdown.classList.toggle("show");
});

document.addEventListener("click", function (e) {
  if (!e.target.closest(".multiselect")) {
    multiselectDropdown.classList.remove("show");
  }
});

document.querySelectorAll(".multiselect-option").forEach((option) => {
  option.addEventListener("click", function () {
    const value = this.getAttribute("data-value");
    const text = this.textContent;

    if (this.classList.contains("selected")) {
      this.classList.remove("selected");
      selectedItems = selectedItems.filter((item) => item.value !== value);
    } else {
      this.classList.add("selected");
      selectedItems.push({ value, text });
    }

    updateSelectedItems();
    updateInputPlaceholder();
  });
});

function updateSelectedItems() {
  selectedItemsContainer.innerHTML = "";
  selectedItems.forEach((item) => {
    const selectedItemEl = document.createElement("div");
    selectedItemEl.className = "selected-item";
    selectedItemEl.innerHTML = `
            ${item.text}
            <button type="button" onclick="removeSelectedItem('${item.value}')">&times;</button>
          `;
    selectedItemsContainer.appendChild(selectedItemEl);
  });
}

function updateInputPlaceholder() {
  if (selectedItems.length === 0) {
    multiselectInput.placeholder = "Select your interests...";
  } else {
    multiselectInput.placeholder = `${selectedItems.length} item(s) selected`;
  }
}

window.removeSelectedItem = function (value) {
  selectedItems = selectedItems.filter((item) => item.value !== value);
  document
    .querySelector(`.multiselect-option[data-value="${value}"]`)
    .classList.remove("selected");
  updateSelectedItems();
  updateInputPlaceholder();
};

const todoInput = document.getElementById("todoInput");
const addTodoBtn = document.getElementById("addTodoBtn");
const todoList = document.getElementById("todoList");
let todos = JSON.parse(localStorage.getItem("todos")) || [];

function renderTodos() {
  todoList.innerHTML = "";
  todos.forEach((todo, index) => {
    const todoItem = document.createElement("li");
    todoItem.className = `todo-item ${todo.completed ? "completed" : ""}`;
    todoItem.innerHTML = `
            <input type="checkbox" ${
              todo.completed ? "checked" : ""
            } onchange="toggleTodo(${index})">
            <span class="todo-text">${todo.text}</span>
            <div class="todo-actions">
              <button class="complete-btn" onclick="toggleTodo(${index})">
                <i class="fas ${todo.completed ? "fa-undo" : "fa-check"}"></i>
              </button>
              <button class="delete-btn" onclick="deleteTodo(${index})">
                <i class="fas fa-trash"></i>
              </button>
            </div>
          `;
    todoList.appendChild(todoItem);
  });
}

function addTodo() {
  const text = todoInput.value.trim();
  if (text) {
    todos.push({ text, completed: false });
    todoInput.value = "";
    saveTodos();
    renderTodos();
  }
}

window.toggleTodo = function (index) {
  todos[index].completed = !todos[index].completed;
  saveTodos();
  renderTodos();
};

window.deleteTodo = function (index) {
  todos.splice(index, 1);
  saveTodos();
  renderTodos();
};

function saveTodos() {
  localStorage.setItem("todos", JSON.stringify(todos));
}

addTodoBtn.addEventListener("click", addTodo);
todoInput.addEventListener("keypress", function (e) {
  if (e.key === "Enter") {
    addTodo();
  }
});

renderTodos();

class Slider {
  constructor() {
    this.slider = document.querySelector(".slider");
    this.slides = document.querySelectorAll(".slide");
    this.dots = document.querySelectorAll(".dot");
    this.prevBtn = document.querySelector(".prev-btn");
    this.nextBtn = document.querySelector(".next-btn");
    this.currentSlide = 0;
    this.slideInterval = null;
    this.autoSlideDelay = 5000;

    this.init();
  }

  init() {
    this.prevBtn.addEventListener("click", () => this.prevSlide());
    this.nextBtn.addEventListener("click", () => this.nextSlide());

    this.dots.forEach((dot) => {
      dot.addEventListener("click", (e) => {
        const slideIndex = parseInt(e.target.getAttribute("data-slide"));
        this.goToSlide(slideIndex);
      });
    });

    document.addEventListener("keydown", (e) => {
      if (e.key === "ArrowLeft") this.prevSlide();
      if (e.key === "ArrowRight") this.nextSlide();
    });

    this.startAutoSlide();

    const sliderContainer = document.querySelector(".slider-container");
    sliderContainer.addEventListener("mouseenter", () => this.stopAutoSlide());
    sliderContainer.addEventListener("mouseleave", () => this.startAutoSlide());

    this.setupTouchEvents();

    this.updateSliderPosition();
  }

  updateSliderPosition() {
    this.slider.style.transform = `translateX(-${this.currentSlide * 100}%)`;
  }

  showSlide(index) {
    this.slides.forEach((slide) => slide.classList.remove("active"));
    this.dots.forEach((dot) => dot.classList.remove("active"));

    this.slides[index].classList.add("active");
    this.dots[index].classList.add("active");

    this.currentSlide = index;
    this.updateSliderPosition();
  }

  nextSlide() {
    let nextIndex = this.currentSlide + 1;
    if (nextIndex >= this.slides.length) {
      nextIndex = 0;
    }
    this.showSlide(nextIndex);
    this.restartAutoSlide();
  }

  prevSlide() {
    let prevIndex = this.currentSlide - 1;
    if (prevIndex < 0) {
      prevIndex = this.slides.length - 1;
    }
    this.showSlide(prevIndex);
    this.restartAutoSlide();
  }

  goToSlide(index) {
    if (index >= 0 && index < this.slides.length) {
      this.showSlide(index);
      this.restartAutoSlide();
    }
  }

  startAutoSlide() {
    this.stopAutoSlide();
    this.slideInterval = setInterval(() => {
      this.nextSlide();
    }, this.autoSlideDelay);
  }

  stopAutoSlide() {
    if (this.slideInterval) {
      clearInterval(this.slideInterval);
      this.slideInterval = null;
    }
  }

  restartAutoSlide() {
    this.stopAutoSlide();
    this.startAutoSlide();
  }

  setupTouchEvents() {
    let startX = 0;
    let endX = 0;

    this.slider.addEventListener("touchstart", (e) => {
      startX = e.touches[0].clientX;
    });

    this.slider.addEventListener("touchmove", (e) => {
      endX = e.touches[0].clientX;
    });

    this.slider.addEventListener("touchend", () => {
      const diffX = startX - endX;
      const minSwipeDistance = 50;

      if (Math.abs(diffX) > minSwipeDistance) {
        if (diffX > 0) {
          this.nextSlide();
        } else {
          this.prevSlide();
        }
      }
    });
  }
}

document.addEventListener("DOMContentLoaded", () => {
  new Slider();
});

document.addEventListener("DOMContentLoaded", () => {
  const slides = document.querySelectorAll(".slide");

  slides.forEach((slide, index) => {
    slide.addEventListener("mousemove", (e) => {
      const { left, top, width, height } = slide.getBoundingClientRect();
      const x = (e.clientX - left) / width - 0.5;
      const y = (e.clientY - top) / height - 0.5;

      const img = slide.querySelector("img");
      img.style.transform = `translate(${x * 20}px, ${y * 20}px) scale(1.1)`;
    });

    slide.addEventListener("mouseleave", () => {
      const img = slide.querySelector("img");
      img.style.transform = "translate(0, 0) scale(1)";
    });
  });
});


