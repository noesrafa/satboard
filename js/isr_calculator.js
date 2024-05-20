const generator_options_container =
  document.querySelector(".generator-options");
const generator_input = document.querySelector("#generator-input");

let salaried_type = SALARIED_TYPES.BRUTO;
let regime = REGIMES.SYS;
let periodicity = PERIODICITIES.MENSUAL;

const generator_options_list = [
  {
    label: regime,
    value: "regime",
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
      const newContent = document.createTextNode(option.value);
      element.replaceChild(newContent, element.firstChild);

      if (option_type.value === OPTIONS_KEYS.PERIODICITY) {
        periodicity = option.value;
      }
      if (option_type.value === OPTIONS_KEYS.REGIME) {
        regime = option.value;
      }

      dropdown.remove();
      element.classList.remove("active");
    });

    dropdown_list.appendChild(dropdown_item);
  });

  dropdown.appendChild(dropdown_list);
  element.appendChild(dropdown);
  element.classList.add("active");

  document.addEventListener("click", function (event) {
    if (!dropdown.contains(event.target) && !element.contains(event.target)) {
      dropdown.remove();
      element.classList.remove("active");
    }
  });
};

const handleOptionAction = (option, element) => {
  document
    .querySelectorAll(".dropdown")
    .forEach((dropdown) => dropdown.remove());

  switch (option.value) {
    case OPTIONS_KEYS.REGIME:
      createDropdown(element, option);
      break;
    case OPTIONS_KEYS.SALARIED_TYPE:
      salaried_type =
        salaried_type === SALARIED_TYPES.BRUTO
          ? SALARIED_TYPES.NETO
          : SALARIED_TYPES.BRUTO;

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
    salaried_type === SALARIED_TYPES.NETO ? "NETO" : "BRUTO"
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
        salaried_type === SALARIED_TYPES.NETO
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

  // ========= ON SUBMIT =========== //
  const salaryForm = document.querySelector("#salary-form");

  salaryForm.addEventListener("submit", function (event) {
    event.preventDefault();

    if (
      !generator_input.value ||
      generator_input.value === "0" ||
      isNaN(generator_input.value)
    ) {
      const error = document.createElement("p");
      error.classList.add("error");
      error.innerText = "Ingresa un sueldo válido";
      salaryForm.appendChild(error);
      salaryForm.classList.add("error");

      setTimeout(() => {
        error.remove();
        salaryForm.classList.remove("error");
      }, 3000);
      return;
    }

    calculateISR();

    generatorContainer.classList.add("hidden");
    generatorResult.classList.remove("hidden");
  });

  // ========= DOWNLOAD RESULT =========== //
  const downloadButton = document.querySelector("#download-png");
  const resultToDownload = document.querySelector(".generator-result__data");

  downloadButton.addEventListener("click", () => {
    htmlToImage.toPng(resultToDownload).then(function (dataUrl) {
      download(dataUrl, "isr_result.png");
    });
  });

  // ========= RESET =========== //
  const resetButton = document.querySelector("#reset");

  resetButton.addEventListener("click", () => {
    generatorContainer.classList.remove("hidden");
    generatorResult.classList.add("hidden");
  });

  // ========= CALCULATE ISR =========== //
  const calculateISR = () => {
    const salary_type = salaried_type;
    const salary_number = generator_input.value;

    let base, marginal_tax, total_isr, grossLimit, subsidy;

    function calculateSubsidy(grossSalary) {
      if (grossSalary <= SUBSIDY_INFO.limit && regime === REGIMES.SYS) {
        return SUBSIDY_INFO.total_subsidy;
      }

      return 0;
    }

    function calculateNetSalary(grossSalary) {
      ISR_LIMITS.forEach((limit) => {
        if (
          grossSalary >= limit.inferior_limit &&
          grossSalary <= limit.superior_limit
        ) {
          base = grossSalary - limit.inferior_limit;
          marginal_tax = base * (limit.percentage / 100);
          total_isr = marginal_tax + limit.fixed_fee;
        }
      });

      grossLimit = ISR_LIMITS.find(
        (limit) =>
          grossSalary >= limit.inferior_limit &&
          grossSalary <= limit.superior_limit
      );
      return grossSalary - total_isr;
    }

    if (salaried_type === SALARIED_TYPES.NETO || !salary_type) {
      function calculateGrossSalary(netSalary) {
        let low = 0;
        let high = 9999999999;
        let mid;
        let iterations = 0;
        let precision = 0.01;

        while (high - low > precision && iterations < 1000) {
          mid = (low + high) / 2;
          let calculatedNet = calculateNetSalary(mid);

          if (calculatedNet < netSalary) {
            low = mid;
          } else {
            high = mid;
          }

          iterations++;
        }

        return mid;
      }

      let grossSalary = calculateGrossSalary(salary_number);
      subsidy = calculateSubsidy(grossSalary);

      assignValuesResult(
        grossSalary.toFixed(2),
        total_isr,
        marginal_tax,
        grossLimit,
        base,
        subsidy
      );
    } else {
      ISR_LIMITS.forEach((limit) => {
        if (
          salary_number >= limit.inferior_limit &&
          salary_number <= limit.superior_limit
        ) {
          base = salary_number - limit.inferior_limit;
          marginal_tax = base * (limit.percentage / 100);
          total_isr = marginal_tax + limit.fixed_fee;
          subsidy = calculateSubsidy(salary_number);

          assignValuesResult(
            salary_number,
            total_isr,
            marginal_tax,
            limit,
            base,
            subsidy
          );
        }
      });
    }
  };

  const assignValuesResult = (
    salary_number,
    total_isr,
    marginal_tax,
    limit,
    base,
    subsidy
  ) => {
    const result_subsidy = document.querySelector("#result_subsidy");
    const element_salary = document.querySelector("#result_salary");
    const result_total_isr = document.querySelector("#result_total_isr");
    const result_taxes_container = document.querySelector(
      "#result_taxes_container"
    );
    const element_result_marginal_tax = document.querySelector(
      "#result_marginal_tax"
    );
    const element_fixed_fee = document.querySelector("#result_fixed_fee");
    const element_result_total_container = document.querySelector(
      "#result_total_container"
    );
    const element_result_total = document.querySelector("#result_total");

    element_salary.innerText = `${formatCurrency(salary_number)}`;
    result_total_isr.innerText = `- ${formatCurrency(total_isr)}`;
    element_result_marginal_tax.innerText = `${formatCurrency(marginal_tax)}`;
    element_fixed_fee.innerText = `${formatCurrency(limit.fixed_fee)}`;
    element_result_total.innerText = `${formatCurrency(
      salary_number - total_isr + (subsidy ? subsidy : 0)
    )}`;

    const marginal_tax_detail = document.createTextNode(
      `(${formatCurrency(base)} x ${limit.percentage}%)`
    );

    result_taxes_container.replaceChild(
      marginal_tax_detail,
      result_taxes_container.childNodes[2]
    );

    if (subsidy) {
      result_subsidy.innerHTML = `Subsidio: <span> + ${formatCurrency(
        subsidy
      )}</span>`;
    } else {
      result_subsidy.innerHTML = "";
    }
  };
});

const formatCurrency = (value) => {
  return `$ ${new Intl.NumberFormat().format(value)}${
    Number.isInteger(value) ? ".00" : ""
  }`;
};
