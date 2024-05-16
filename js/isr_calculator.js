const generator_options_container =
  document.querySelector(".generator-options");
const generator_input = document.querySelector("#generator-input");

const OPTIONS_KEYS = {
  SALARIED_TYPE: "salaried_type",
  REGIME: "regime",
  PERIODICITY: "periodicity",
};

const SALARIED_TYPES = {
  BRUTO: "Sueldo bruto",
  NETO: "Sueldo neto",
};

const REGIMES = {
  SYS: "Sueldos y Salarios",
  HONORARIOS: "Honorarios",
};

const PERIODICITIES = {
  MENSUAL: "Mensual",
  QUINCENAL: "Quincenal",
  SEMANAL: "Semanal",
  DIA: "Día",
};

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

const handleOptionAction = (option, element) => {
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

      console.log(salaried_type);
      break;
    default:
      break;
  }
};

document.addEventListener("DOMContentLoaded", () => {
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
});
