const generator_options_container =
  document.querySelector(".generator-options");

document.addEventListener("DOMContentLoaded", () => {
  const generator_options_list = [
    {
      label: "SyS",
      value: "regime",
    },
    {
      label: "Sueldo bruto",
      value: "type",
    },
    {
      label: "Mes",
      value: "period",
    },
  ];
  generator_options_list.forEach((option) => {
    const option_button = document.createElement("button");
    option_button.classList.add("generator-option");
    option_button.innerText = option.label;
    option_button.value = option.value;

    const option_button_icon = document.createElement("img");
    option_button_icon.src = `./assets/caret-down.svg`;
    option_button_icon.alt = "Caret down";
    option_button_icon.classList.add("generator-option-icon");

    option_button.addEventListener("click", function () {
      console.log(option.value);
    });

    option_button.appendChild(option_button_icon);
    generator_options_container.appendChild(option_button);
  });
});
