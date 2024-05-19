const generator_options_container =
  document.querySelector(".generator-options");
const generator_input = document.querySelector("#generator-input");

let salaried_type =
  localStorage.getItem("salaried_type") || SALARIED_TYPES.BRUTO;
let regime = localStorage.getItem("regime") || REGIMES.SYS;
let periodicity = localStorage.getItem("periodicity") || PERIODICITIES.MENSUAL;

const generator_options_list = [
  {
    label: regime,
    value: "regime",
    type: "selector",
  },
  {
    label: periodicity,
    value: "periodicity",
    type: "selector",
  },
  {
    label: "Sueldo BRUTO",
    value: "salaried_type",
    type: "toggle",
  },
];

const createDropdown = (element, option_type) => {
  const dropdown = document.createElement("div");
  dropdown.classList.add("dropdown");
  dropdown.style.top = `${element.offsetTop + element.offsetHeight}px`;
  dropdown.style.left = `${element.offsetLeft}px`;

  const dropdown_list = document.createElement("ul");
  dropdown_list.classList.add("dropdown-list");

  const options =
    option_type.value === OPTIONS_KEYS.PERIODICITY
      ? periodicities_options
      : regimes_options;

  options.forEach((option) => {
    const dropdown_item = document.createElement("li");
    dropdown_item.classList.add("dropdown-item");
    dropdown_item.innerText = option.label;
    dropdown_item.value = option.value;

    dropdown_item.addEventListener("click", function () {
      const newContent = document.createTextNode(option.label);
      element.replaceChild(newContent, element.firstChild);

      dropdown.remove();
    });

    dropdown_list.appendChild(dropdown_item);
  });

  dropdown.appendChild(dropdown_list);
  document.body.appendChild(dropdown);

  document.addEventListener("click", function (event) {
    if (!dropdown.contains(event.target) && !element.contains(event.target)) {
      dropdown.remove();
    }
  });
};

const handleOptionAction = (option, element) => {
  document
    .querySelectorAll(".dropdown")
    .forEach((dropdown) => dropdown.remove());
  createDropdown(element, option);

  switch (option.value) {
    case OPTIONS_KEYS.PERIODICITY:
      break;
    case OPTIONS_KEYS.REGIME:
      break;
    case OPTIONS_KEYS.SALARIED_TYPE:
      salaried_type = localStorage.getItem(OPTIONS_KEYS.SALARIED_TYPE);

      localStorage.setItem(
        OPTIONS_KEYS.SALARIED_TYPE,
        salaried_type === SALARIED_TYPES.BRUTO
          ? SALARIED_TYPES.NETO
          : SALARIED_TYPES.BRUTO
      );
      element.querySelector("img").src =
        salaried_type === SALARIED_TYPES.BRUTO
          ? `./assets/checked.svg`
          : `./assets/unchecked.svg`;

      generator_input.placeholder = `Escribe el sueldo ${
        salaried_type === SALARIED_TYPES.BRUTO ? "BRUTO" : "NETO"
      } del empleado`;

      break;
    default:
      break;
  }
};

document.addEventListener("DOMContentLoaded", () => {
  const generatorContainer = document.querySelector(".generator-container");
  const generatorResult = document.querySelector(".generator-result");

  generator_input.placeholder = `Escribe el sueldo ${
    salaried_type === SALARIED_TYPES.BRUTO ? "NETO" : "BRUTO"
  } del empleado`;

  generator_options_list.forEach((option) => {
    const option_button = document.createElement("button");
    option_button.classList.add("generator-option");
    option_button.innerText = option.label;
    option_button.value = option.value;

    const option_button_icon = document.createElement("img");

    if (option.type === "selector") {
      option_button_icon.src = `./assets/caret-down.svg`;
      option_button_icon.alt = "Caret down";
    } else {
      option_button_icon.src =
        salaried_type === SALARIED_TYPES.BRUTO
          ? `./assets/unchecked.svg`
          : `./assets/checked.svg`;

      option_button_icon.alt = "checked";
    }

    option_button.addEventListener("click", function () {
      handleOptionAction(option, option_button);
    });

    option_button.appendChild(option_button_icon);
    generator_options_container.appendChild(option_button);
  });

  // ========= CALCULATE ISR =========== //
  const salaryForm = document.querySelector("#salary-form");

  salaryForm.addEventListener("submit", function (event) {
    event.preventDefault();

    generatorContainer.classList.add("hidden");
    generatorResult.classList.remove("hidden");
  });

  // ========= DOWNLOAD RESULT =========== //
  const downloadButton = document.querySelector("#download-png");

  downloadButton.addEventListener("click", () => {
    console.log("download");

    htmlToImage.toPng(generatorResult).then(function (dataUrl) {
      download(dataUrl, "isr_result.png");
    });
  });

  // ========= RESET =========== //
  const resetButton = document.querySelector("#reset");

  resetButton.addEventListener("click", () => {
    generatorContainer.classList.remove("hidden");
    generatorResult.classList.add("hidden");
  });
});
