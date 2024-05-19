const main = document.querySelector("main");
const mainHeader = document.querySelector(".main-header");
const sidemenu = document.querySelector(".sidemenu");

const sidemenu_nav = document.querySelector(".sidemenu-nav__options");
const sidemenu_toggle = document.querySelectorAll(".sidemenu-toggle");

const isMobile = window.matchMedia(
  "only screen and (max-width: 760px)"
).matches;

const options_nav = [
  {
    label: "Calculadora de ISR",
    link: "./index.html",
  },
  {
    label: "Example page 2",
    link: "./index.html",
  },
  {
    label: "Example page 3",
    link: "./index.html",
  },
];

document.addEventListener("DOMContentLoaded", () => {
  // =========== ADD NAVIGATION OPTIONS LIST =========== //
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

  // =========== ADD ACTIVE CLASS TO CURRENT PAGE =========== //
  if (current_url === "/") {
    sidemenu_nav.querySelector("a").classList.add("active");
  }

  if (current_nav) {
    current_nav.classList.add("active");
  }

  // =========== ADD A RANDOM USER =========== //
  const getRandomUser = async () => {
    const response = await fetch("https://randomuser.me/api/");
    const data = await response.json();
    return data.results[0];
  };

  getRandomUser().then((user) => {
    const userPictureUrl = user?.picture?.medium

    const userImg = document.createElement("img");
    userImg.src = userPictureUrl;
    userImg.alt = "User picture";
    userImg.classList.add("user-picture");

    mainHeader.appendChild(userImg);
  });
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

// =========== CLOSE SIDEMENU ON CLICK OUTSIDE =========== //
document.addEventListener("click", (e) => {
  if (
    sidemenu_toggle[0].contains(e.target) ||
    sidemenu_toggle[1].contains(e.target)
  )
    return;

  if (
    !sidemenu.contains(e.target) &&
    !sidemenu_toggle[0].contains(e.target) &&
    isMobile
  ) {
    sidemenu_toggle[0].classList.remove("active");
    sidemenu_toggle[1].classList.add("active");
    main.classList.add("full");
    sidemenu.classList.remove("active");
  }
});
