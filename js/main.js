const main = document.querySelector("main");
const sidemenu = document.querySelector(".sidemenu");

const sidemenu_nav = document.querySelector(".sidemenu-nav__options");
const sidemenu_toggle = document.querySelectorAll(".sidemenu-toggle");

const options_nav = [
  {
    label: "Calculadora ISR",
    link: "./index.html",
  },
  {
    label: "Calculadora de aguinaldo",
    link: "./index.html",
  },
];

document.addEventListener("DOMContentLoaded", () => {
  options_nav.forEach((option) => {
    const option_nav = document.createElement("li");
    option_nav.innerHTML = `
        <a href="${option.link}">
            ${option.label}
            <img src="./assets/caret-right.svg" alt="arrow" />
        </a>
        `;
    sidemenu_nav.appendChild(option_nav);
  });

  const current_url = window.location.pathname;
  const current_url_array = current_url.split("/");
  const current_url_page = current_url_array[current_url_array.length - 1];

  const current_nav = document.querySelector(`a[href="./${current_url_page}"]`);

  if (current_nav) {
    current_nav.classList.add("active");
  }
});

sidemenu_toggle.forEach((toggle) => {
  toggle.addEventListener("click", () => {
    sidemenu.classList.toggle("active");
    main.classList.toggle("full");
    sidemenu_toggle.forEach((toggle) => {
      toggle.classList.toggle("active");
    });
  });
});
